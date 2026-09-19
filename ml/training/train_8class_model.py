"""
GrainVision AI — 8-Class MobileNetV2 Model Trainer
Trains a MobileNetV2 transfer learning CNN model on the 8-class balanced dataset (5,600 train / 1,200 val).
Saves best model to 'models/grainvision_milled_rice_8class_best.keras'.
"""

import os
import sys
import json
import time
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers, callbacks

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DATASET_DIR = os.path.join(PROJECT_ROOT, "ml", "dataset", "processed_8class")
TRAIN_DIR = os.path.join(DATASET_DIR, "train")
VAL_DIR = os.path.join(DATASET_DIR, "validation")
MODELS_DIR = os.path.join(PROJECT_ROOT, "models")
RESULTS_DIR = os.path.join(PROJECT_ROOT, "results")

MODEL_SAVE_PATH = os.path.join(MODELS_DIR, "grainvision_milled_rice_8class_best.keras")

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32
NUM_CLASSES = 8
SEED = 42
MAX_EPOCHS = 5
LEARNING_RATE = 0.001


def build_8class_model(num_classes=NUM_CLASSES):
    print("[*] Building MobileNetV2 Transfer Learning Architecture (8 Classes)...")
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights="imagenet"
    )
    base_model.trainable = False  # Freeze backbone

    inputs = layers.Input(shape=(224, 224, 3), name="image_input")
    x = base_model(inputs, training=False)
    x = layers.GlobalAveragePooling2D(name="global_avg_pool")(x)
    x = layers.BatchNormalization(name="batch_norm")(x)
    x = layers.Dense(256, activation="relu", name="dense_256")(x)
    x = layers.Dropout(0.3, name="dropout_0.3")(x)
    outputs = layers.Dense(num_classes, activation="softmax", name="predictions")(x)

    model = models.Model(inputs=inputs, outputs=outputs, name="GrainVision_MobileNetV2_8Class")
    
    model.compile(
        optimizer=optimizers.Adam(learning_rate=LEARNING_RATE),
        loss=tf.keras.losses.SparseCategoricalCrossentropy(),
        metrics=["accuracy"]
    )
    return model


def get_data_pipelines():
    print("[*] Creating tf.data preprocessing pipelines...")
    
    train_ds = tf.keras.utils.image_dataset_from_directory(
        TRAIN_DIR,
        image_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        label_mode="int",
        shuffle=True,
        seed=SEED
    )

    val_ds = tf.keras.utils.image_dataset_from_directory(
        VAL_DIR,
        image_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        label_mode="int",
        shuffle=False
    )

    class_names = train_ds.class_names
    print(f"[+] Loaded Class Names ({len(class_names)}): {class_names}")

    # Data augmentation pipeline for training
    data_augmentation = tf.keras.Sequential([
        layers.RandomFlip("horizontal", seed=SEED),
        layers.RandomRotation(0.1, seed=SEED),
        layers.RandomZoom(0.1, seed=SEED),
        layers.RandomTranslation(0.1, 0.1, seed=SEED),
        layers.RandomBrightness(0.1, seed=SEED)
    ], name="data_augmentation")

    # Rescaling 0-1
    rescale_layer = layers.Rescaling(1.0 / 255.0)

    train_ds = train_ds.map(lambda x, y: (rescale_layer(data_augmentation(x, training=True)), y), num_parallel_calls=tf.data.AUTOTUNE)
    val_ds = val_ds.map(lambda x, y: (rescale_layer(x), y), num_parallel_calls=tf.data.AUTOTUNE)

    train_ds = train_ds.prefetch(buffer_size=tf.data.AUTOTUNE)
    val_ds = val_ds.prefetch(buffer_size=tf.data.AUTOTUNE)

    return train_ds, val_ds, class_names


def run_training():
    os.makedirs(MODELS_DIR, exist_ok=True)
    os.makedirs(RESULTS_DIR, exist_ok=True)

    train_ds, val_ds, class_names = get_data_pipelines()
    model = build_8class_model(num_classes=len(class_names))
    model.summary()

    # Timing check on 1 batch
    print("[*] Running 1-batch CPU timing check...")
    t0 = time.time()
    for x_b, y_b in train_ds.take(1):
        _ = model(x_b, training=False)
    t_batch = time.time() - t0
    total_batches = len(train_ds)
    est_epoch_sec = t_batch * total_batches
    print(f"[+] 1-batch time: {t_batch:.3f}s. Estimated time per epoch ({total_batches} batches): ~{est_epoch_sec:.1f}s")

    callbacks_list = [
        callbacks.EarlyStopping(
            monitor="val_loss",
            patience=3,
            restore_best_weights=True,
            verbose=1
        ),
        callbacks.ModelCheckpoint(
            filepath=MODEL_SAVE_PATH,
            monitor="val_accuracy",
            mode="max",
            save_best_only=True,
            verbose=1
        )
    ]

    print(f"\n[*] Starting model training for maximum {MAX_EPOCHS} epochs...")
    start_time = time.time()
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=MAX_EPOCHS,
        callbacks=callbacks_list,
        verbose=1
    )
    total_duration = time.time() - start_time
    print(f"\n[+] Training completed in {total_duration:.2f} seconds ({total_duration/60:.2f} minutes)!")

    # Save final model if checkpoint didn't trigger
    if not os.path.exists(MODEL_SAVE_PATH):
        model.save(MODEL_SAVE_PATH)
        print(f"[+] Saved model to: {MODEL_SAVE_PATH}")

    # Record REAL metrics
    train_acc = [float(x) for x in history.history.get("accuracy", [])]
    val_acc = [float(x) for x in history.history.get("val_accuracy", [])]
    train_loss = [float(x) for x in history.history.get("loss", [])]
    val_loss = [float(x) for x in history.history.get("val_loss", [])]

    history_data = {
        "class_names": class_names,
        "epochs_completed": len(train_acc),
        "total_duration_sec": round(total_duration, 2),
        "train_accuracy": train_acc,
        "val_accuracy": val_acc,
        "train_loss": train_loss,
        "val_loss": val_loss,
        "final_train_accuracy": round(train_acc[-1], 4) if train_acc else 0.0,
        "final_val_accuracy": round(val_acc[-1], 4) if val_acc else 0.0,
        "best_val_accuracy": round(max(val_acc), 4) if val_acc else 0.0
    }

    history_file = os.path.join(RESULTS_DIR, "training_history_8class.json")
    with open(history_file, "w") as f:
        json.dump(history_data, f, indent=2)

    summary_file = os.path.join(RESULTS_DIR, "training_summary_8class.txt")
    with open(summary_file, "w") as f:
        f.write("GrainVision AI — 8-Class Model Training Summary\n")
        f.write("=" * 50 + "\n")
        f.write(f"Model File: {MODEL_SAVE_PATH}\n")
        f.write(f"Classes ({len(class_names)}): {', '.join(class_names)}\n")
        f.write(f"Epochs Completed: {len(train_acc)}\n")
        f.write(f"Training Duration: {total_duration:.2f}s ({total_duration/60:.2f}m)\n")
        f.write(f"Final Training Accuracy: {train_acc[-1]:.4f}\n")
        f.write(f"Final Validation Accuracy: {val_acc[-1]:.4f}\n")
        f.write(f"Best Validation Accuracy: {max(val_acc):.4f}\n")

    print(f"[+] Saved training history to '{history_file}' and summary to '{summary_file}'")
    return history_data


if __name__ == "__main__":
    try:
        run_training()
    except Exception as e:
        print(f"[ERROR] Training failed: {e}")
        sys.exit(1)
