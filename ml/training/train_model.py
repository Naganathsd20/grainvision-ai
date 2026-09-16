"""
GrainVision AI — Model Training Module (Quick CPU Version)
Phase 5: Model Training

Executes Phase 5 training using a balanced representative subset of the real dataset
(600 train, 100 val images across 5 classes) for rapid, reproducible CPU execution (5-8 min).

Strict Rules:
- Uses REAL preprocessed images from ml/dataset/processed/
- Does NOT rewrite Phase 1-4 code
- Does NOT perform Stage 2 fine-tuning
- Does NOT run Phase 6 test-set evaluation
"""

import os
import sys
import time
import json
import random
from pathlib import Path

# Disable verbose TensorFlow C++ logging
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import numpy as np
import matplotlib
matplotlib.use("Agg")  # Non-interactive backend
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau

from ml.preprocessing.preprocessing_config import (
    PROJECT_ROOT,
    RESULTS_DIR,
    PROCESSED_DATA_DIR,
    BATCH_SIZE,
    IMAGE_SIZE,
    INPUT_SHAPE,
    NUM_CLASSES,
    CLASS_NAMES,
    CLASS_TO_INDEX,
)
from ml.preprocessing.data_pipeline import get_augmentation_layer, get_normalization_layer
from ml.model.build_model import build_rice_classifier
from ml.training.training_config import (
    BEST_MODEL_PATH,
    MODELS_DIR,
    TRAINING_HISTORY_PATH,
    TRAINING_ACCURACY_PLOT_PATH,
    TRAINING_LOSS_PLOT_PATH,
    TRAINING_SUMMARY_PATH,
    TRAIN_SAMPLES_PER_CLASS,
    VAL_SAMPLES_PER_CLASS,
    SUBSET_SEED,
    MAX_EPOCHS,
    INITIAL_LEARNING_RATE,
    FREEZE_BACKBONE,
    EARLY_STOPPING_MONITOR,
    EARLY_STOPPING_PATIENCE,
    EARLY_STOPPING_RESTORE_BEST_WEIGHTS,
    REDUCE_LR_MONITOR,
    REDUCE_LR_FACTOR,
    REDUCE_LR_PATIENCE,
    REDUCE_LR_MIN_LR,
    CHECKPOINT_MONITOR,
    CHECKPOINT_SAVE_BEST_ONLY,
)


def check_hardware():
    """
    Step 2: Hardware Check. Reports CPU/GPU availability.
    """
    print("==================================================")
    print("STEP 2 — HARDWARE CHECK")
    print("==================================================")
    gpus = tf.config.list_physical_devices("GPU")
    if gpus:
        gpu_name = gpus[0].name
        print("GPU Available: YES")
        print(f"GPU Device   : {gpu_name}")
        hw_info = f"GPU ({gpu_name})"
    else:
        print("GPU Available: NO")
        print("Execution Target: CPU (TensorFlow Native CPU Execution)")
        hw_info = "CPU (Native Windows x86_64)"
    print("==================================================\n")
    return hw_info


def get_balanced_subset_paths(data_dir, samples_per_class, seed=SUBSET_SEED):
    """
    Dynamically selects a deterministic, balanced subset of image filepaths.
    No duplicate image files are created on disk.
    """
    data_dir = Path(data_dir)
    file_paths = []
    labels = []
    class_distribution = {}

    rng = random.Random(seed)

    for cls_name in CLASS_NAMES:
        cls_dir = data_dir / cls_name
        cls_idx = CLASS_TO_INDEX[cls_name]
        
        # Sort for cross-platform deterministic order
        all_files = sorted([
            str(f) for f in cls_dir.glob("*.*")
            if f.suffix.lower() in {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
        ])

        if len(all_files) < samples_per_class:
            raise ValueError(f"Not enough images in {cls_dir}: found {len(all_files)}, requested {samples_per_class}")

        shuffled_files = list(all_files)
        rng.shuffle(shuffled_files)

        selected = shuffled_files[:samples_per_class]
        file_paths.extend(selected)
        labels.extend([cls_idx] * len(selected))
        class_distribution[cls_name] = len(selected)

    return file_paths, labels, class_distribution


def build_subset_dataset(file_paths, labels, apply_augmentation=False, batch_size=BATCH_SIZE, seed=SUBSET_SEED, shuffle=True):
    """
    Constructs a tf.data.Dataset pipeline from image filepaths using Phase 3 preprocessing.
    """
    aug_layer = get_augmentation_layer(seed=seed) if apply_augmentation else None

    def _process_sample(path, label):
        file_contents = tf.io.read_file(path)
        img = tf.io.decode_image(file_contents, channels=3, expand_animations=False)
        img.set_shape([None, None, 3])
        img = tf.image.resize(img, IMAGE_SIZE)
        img = tf.cast(img, tf.float32) * (1.0 / 255.0)  # Pixel normalization 0-1
        if apply_augmentation and aug_layer is not None:
            img = aug_layer(img, training=True)
        return img, label

    ds = tf.data.Dataset.from_tensor_slices((file_paths, labels))
    if shuffle:
        ds = ds.shuffle(buffer_size=len(file_paths), seed=seed)
    ds = ds.map(_process_sample, num_parallel_calls=tf.data.AUTOTUNE)
    ds = ds.batch(batch_size)
    return ds.prefetch(buffer_size=tf.data.AUTOTUNE)


def run_sanity_check(train_ds):
    """
    Step 4: Sanity Check Before Training.
    - Loads 1 real batch
    - Confirms shape == (batch, 224, 224, 3)
    - Confirms labels in [0, 4]
    - Builds Phase 4 MobileNetV2 model
    - Confirms output shape == (batch, 5)
    - Confirms valid softmax probabilities
    """
    print("==================================================")
    print("STEP 4 — SANITY CHECK FIRST")
    print("==================================================")

    print("[1/5] Extracting 1 real training subset batch...")
    for images, labels in train_ds.take(1):
        batch_images = images
        batch_labels = labels
        break

    batch_shape = tuple(batch_images.shape)
    label_min = int(tf.reduce_min(batch_labels).numpy())
    label_max = int(tf.reduce_max(batch_labels).numpy())

    print(f"      Real Batch Image Shape : {batch_shape}")
    print(f"      Batch Label Range      : [{label_min}, {label_max}]")

    # 1. Confirm image batch shape
    if len(batch_shape) != 4 or batch_shape[1:] != (IMAGE_SIZE[0], IMAGE_SIZE[1], 3):
        raise ValueError(f"Sanity Check Failed! Expected shape (batch, 224, 224, 3), got {batch_shape}")

    # 2. Confirm label range
    if label_min < 0 or label_max >= NUM_CLASSES:
        raise ValueError(f"Sanity Check Failed! Labels must be within [0, {NUM_CLASSES-1}], got [{label_min}, {label_max}]")

    print("[2/5] Building Phase 4 MobileNetV2 model...")
    model = build_rice_classifier(
        input_shape=INPUT_SHAPE,
        num_classes=NUM_CLASSES,
        freeze_backbone=FREEZE_BACKBONE,
        learning_rate=INITIAL_LEARNING_RATE,
        compile_model=True,
    )

    print("[3/5] Executing 1 forward pass on real training batch...")
    output = model(batch_images, training=False)
    output_shape = tuple(output.shape)

    print(f"      Model Output Shape     : {output_shape}")

    # 3. Confirm output shape
    if len(output_shape) != 2 or output_shape[1] != NUM_CLASSES:
        raise ValueError(f"Sanity Check Failed! Output shape expected (batch, 5), got {output_shape}")

    # 4. Confirm softmax output probabilities sum to 1.0
    output_sums = tf.reduce_sum(output, axis=-1).numpy()
    if not np.allclose(output_sums, 1.0, atol=1e-3):
        raise ValueError("Sanity Check Failed! Softmax outputs do not sum to 1.0")

    print("[4/5] Label index mapping:")
    for idx, cname in enumerate(CLASS_NAMES):
        print(f"      Index {idx} -> {cname}")

    print("[5/5] SANITY CHECK PASSED SUCCESSFULLY!")
    print("==================================================\n")
    return model


def plot_training_metrics(history_dict):
    """
    Generates and saves training loss and accuracy plots.
    """
    epochs = range(1, len(history_dict["loss"]) + 1)
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)

    # Accuracy Plot
    plt.figure(figsize=(9, 5))
    plt.plot(epochs, history_dict["accuracy"], "b-o", linewidth=2, label="Training Accuracy")
    plt.plot(epochs, history_dict["val_accuracy"], "g-s", linewidth=2, label="Validation Accuracy")
    plt.title("GrainVision AI — Phase 5 Model Training Accuracy", fontsize=13, fontweight="bold")
    plt.xlabel("Epoch", fontsize=11)
    plt.ylabel("Accuracy", fontsize=11)
    plt.xticks(list(epochs))
    plt.grid(True, linestyle=":", alpha=0.6)
    plt.legend(loc="lower right", fontsize=10)
    plt.tight_layout()
    plt.savefig(TRAINING_ACCURACY_PLOT_PATH, dpi=300)
    plt.close()
    print(f"[OK] Training accuracy plot saved to: {TRAINING_ACCURACY_PLOT_PATH}")

    # Loss Plot
    plt.figure(figsize=(9, 5))
    plt.plot(epochs, history_dict["loss"], "b-o", linewidth=2, label="Training Loss")
    plt.plot(epochs, history_dict["val_loss"], "g-s", linewidth=2, label="Validation Loss")
    plt.title("GrainVision AI — Phase 5 Model Training Loss", fontsize=13, fontweight="bold")
    plt.xlabel("Epoch", fontsize=11)
    plt.ylabel("Loss (Sparse Categorical Crossentropy)", fontsize=11)
    plt.xticks(list(epochs))
    plt.grid(True, linestyle=":", alpha=0.6)
    plt.legend(loc="upper right", fontsize=10)
    plt.tight_layout()
    plt.savefig(TRAINING_LOSS_PLOT_PATH, dpi=300)
    plt.close()
    print(f"[OK] Training loss plot saved to: {TRAINING_LOSS_PLOT_PATH}")


def train_model():
    """
    Executes Phase 5 Model Training workflow.
    """
    start_time = time.time()

    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)

    hw_info = check_hardware()

    print("==================================================")
    print("PREPARING BALANCED REAL DATASET SUBSET")
    print("==================================================")
    train_dir = PROCESSED_DATA_DIR / "train"
    val_dir = PROCESSED_DATA_DIR / "validation"

    train_paths, train_labels, train_dist = get_balanced_subset_paths(
        train_dir, TRAIN_SAMPLES_PER_CLASS, seed=SUBSET_SEED
    )
    val_paths, val_labels, val_dist = get_balanced_subset_paths(
        val_dir, VAL_SAMPLES_PER_CLASS, seed=SUBSET_SEED
    )

    print("Training Subset Distribution (600 images total):")
    for cls, cnt in train_dist.items():
        print(f"  - {cls:<12}: {cnt} images")

    print("\nValidation Subset Distribution (100 images total):")
    for cls, cnt in val_dist.items():
        print(f"  - {cls:<12}: {cnt} images")
    print("==================================================\n")

    # Construct datasets
    train_ds = build_subset_dataset(train_paths, train_labels, apply_augmentation=True, shuffle=True)
    val_ds = build_subset_dataset(val_paths, val_labels, apply_augmentation=False, shuffle=False)

    # Run Sanity Check
    model = run_sanity_check(train_ds)

    print("==================================================")
    print("STEP 5 — STARTING REAL SUBSET TRAINING")
    print("==================================================")
    print(f"Strategy          : MobileNetV2 Backbone Frozen")
    print(f"Optimizer         : Adam (Learning Rate = {INITIAL_LEARNING_RATE})")
    print(f"Loss Function     : Sparse Categorical Crossentropy")
    print(f"Max Epochs        : {MAX_EPOCHS}")
    print(f"Batch Size        : {BATCH_SIZE}")
    print(f"Checkpoint Target : {BEST_MODEL_PATH}")
    print("--------------------------------------------------\n")

    callbacks = [
        EarlyStopping(
            monitor=EARLY_STOPPING_MONITOR,
            patience=EARLY_STOPPING_PATIENCE,
            restore_best_weights=EARLY_STOPPING_RESTORE_BEST_WEIGHTS,
            verbose=1,
        ),
        ModelCheckpoint(
            filepath=str(BEST_MODEL_PATH),
            monitor=CHECKPOINT_MONITOR,
            save_best_only=CHECKPOINT_SAVE_BEST_ONLY,
            verbose=1,
        ),
        ReduceLROnPlateau(
            monitor=REDUCE_LR_MONITOR,
            factor=REDUCE_LR_FACTOR,
            patience=REDUCE_LR_PATIENCE,
            min_lr=REDUCE_LR_MIN_LR,
            verbose=1,
        ),
    ]

    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=MAX_EPOCHS,
        callbacks=callbacks,
        verbose=1,
    )

    total_duration = time.time() - start_time
    duration_min = int(total_duration // 60)
    duration_sec = int(total_duration % 60)
    duration_str = f"{duration_min}m {duration_sec}s ({total_duration:.2f}s)"

    hist_dict = {
        "loss": [float(x) for x in history.history["loss"]],
        "accuracy": [float(x) for x in history.history["accuracy"]],
        "val_loss": [float(x) for x in history.history["val_loss"]],
        "val_accuracy": [float(x) for x in history.history["val_accuracy"]],
        "lr": [float(x) for x in history.history.get("learning_rate", history.history.get("lr", [INITIAL_LEARNING_RATE] * len(history.history["loss"])))],
    }

    best_epoch_idx = int(np.argmin(hist_dict["val_loss"]))
    best_epoch_num = best_epoch_idx + 1
    best_train_acc = hist_dict["accuracy"][best_epoch_idx]
    best_train_loss = hist_dict["loss"][best_epoch_idx]
    best_val_acc = hist_dict["val_accuracy"][best_epoch_idx]
    best_val_loss = hist_dict["val_loss"][best_epoch_idx]

    # Verify best model saved & loadable
    print("\n==================================================")
    print("STEP 7 — SAVE & VERIFY BEST MODEL")
    print("==================================================")
    if not BEST_MODEL_PATH.exists():
        model.save(str(BEST_MODEL_PATH))

    model_size_mb = BEST_MODEL_PATH.stat().st_size / (1024 * 1024)
    print(f"[OK] Best Model Saved to : {BEST_MODEL_PATH}")
    print(f"[OK] Model File Size     : {model_size_mb:.2f} MB")

    print("[*] Verifying saved .keras model loadability...")
    loaded_model = tf.keras.models.load_model(str(BEST_MODEL_PATH))
    dummy_input = tf.zeros((1, 224, 224, 3), dtype=tf.float32)
    dummy_pred = loaded_model(dummy_input, training=False)
    print(f"[OK] Verification check passed! Model loaded successfully. Dummy pred shape: {dummy_pred.shape}")
    print("==================================================\n")

    # Save training results
    print("==================================================")
    print("STEP 8 — SAVE TRAINING RESULTS")
    print("==================================================")

    history_export = {
        "dataset_scope": "Balanced Representative Subset (Quick CPU Training)",
        "full_dataset_total_images": 75000,
        "subset_train_images": len(train_paths),
        "subset_val_images": len(val_paths),
        "class_distribution_train": train_dist,
        "class_distribution_val": val_dist,
        "num_classes": NUM_CLASSES,
        "class_names": CLASS_NAMES,
        "hardware": hw_info,
        "total_epochs_completed": len(hist_dict["loss"]),
        "best_epoch": best_epoch_num,
        "best_metrics": {
            "train_loss": round(best_train_loss, 4),
            "train_accuracy": round(best_train_acc, 4),
            "val_loss": round(best_val_loss, 4),
            "val_accuracy": round(best_val_acc, 4),
        },
        "fine_tuning_applied": False,
        "training_duration_seconds": round(total_duration, 2),
        "history": hist_dict,
    }

    with open(TRAINING_HISTORY_PATH, "w") as f:
        json.dump(history_export, f, indent=2)
    print(f"[OK] Training history JSON saved to: {TRAINING_HISTORY_PATH}")

    plot_training_metrics(hist_dict)

    summary_text = (
        "==================================================\n"
        "GrainVision AI — Phase 5 Model Training Summary\n"
        "==================================================\n\n"
        f"Execution Timestamp   : {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
        f"Hardware Environment  : {hw_info}\n"
        f"Dataset Strategy      : Balanced Representative Subset (Dynamic Deterministic Sampling, Seed 42)\n"
        f"Training Subset       : {len(train_paths)} real images (120 per class)\n"
        f"Validation Subset     : {len(val_paths)} real images (20 per class)\n"
        f"Classes (5)           : {', '.join(CLASS_NAMES)}\n"
        f"Model Architecture    : MobileNetV2 (ImageNet pretrained + Custom Dense Head)\n"
        f"Batch Size            : {BATCH_SIZE}\n"
        f"Image Input Shape     : {INPUT_SHAPE}\n\n"
        "--------------------------------------------------\n"
        "TRAINING PERFORMANCE METRICS\n"
        "--------------------------------------------------\n"
        f"Epochs Completed      : {len(hist_dict['loss'])} / {MAX_EPOCHS}\n"
        f"Best Epoch            : Epoch {best_epoch_num}\n"
        f"Best Training Accuracy: {best_train_acc:.4f} ({best_train_acc*100:.2f}%)\n"
        f"Best Training Loss    : {best_train_loss:.4f}\n"
        f"Best Validation Acc   : {best_val_acc:.4f} ({best_val_acc*100:.2f}%)\n"
        f"Best Validation Loss  : {best_val_loss:.4f}\n"
        f"Fine-Tuning Applied   : NO\n"
        f"Training Duration     : {duration_str}\n\n"
        "--------------------------------------------------\n"
        "ARTIFACT LOCATIONS\n"
        "--------------------------------------------------\n"
        f"Best Trained Model    : {BEST_MODEL_PATH.resolve()}\n"
        f"Training History JSON : {TRAINING_HISTORY_PATH.resolve()}\n"
        f"Accuracy Plot PNG     : {TRAINING_ACCURACY_PLOT_PATH.resolve()}\n"
        f"Loss Plot PNG         : {TRAINING_LOSS_PLOT_PATH.resolve()}\n"
        f"Summary Text          : {TRAINING_SUMMARY_PATH.resolve()}\n"
        "==================================================\n"
    )

    with open(TRAINING_SUMMARY_PATH, "w") as f:
        f.write(summary_text)
    print(f"[OK] Training summary text saved to: {TRAINING_SUMMARY_PATH}")
    print("==================================================\n")

    return history_export


if __name__ == "__main__":
    train_model()
