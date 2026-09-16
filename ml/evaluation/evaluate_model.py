"""
GrainVision AI — Model Evaluation Module
Phase 6: Model Evaluation

Evaluates the Phase 5 trained MobileNetV2 classification model on the full 11,250 real test dataset images.
Calculates overall test accuracy, macro/weighted precision, recall, F1-score, 5x5 confusion matrix,
per-class metrics, generates plots, sample prediction visualizer, and exports evaluation reports.
"""

import os
import sys
import time
import json
from pathlib import Path

# Disable verbose TensorFlow C++ logging & force unbuffered stdout
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
os.environ["PYTHONUNBUFFERED"] = "1"

import numpy as np
import matplotlib
matplotlib.use("Agg")  # Non-interactive backend
import matplotlib.pyplot as plt
import tensorflow as tf
from sklearn.metrics import (
    accuracy_score,
    precision_recall_fscore_support,
    confusion_matrix,
    classification_report,
)

from ml.preprocessing.preprocessing_config import (
    CLASS_NAMES,
    NUM_CLASSES,
    CLASS_TO_INDEX,
    INDEX_TO_CLASS,
    PROCESSED_DATA_DIR,
    METADATA_DIR,
    RESULTS_DIR,
)
from ml.preprocessing.data_pipeline import create_test_dataset
from ml.evaluation.evaluation_config import (
    BEST_MODEL_PATH,
    TEST_DATA_DIR,
    EVALUATION_BATCH_SIZE,
    EVALUATION_REPORT_TXT,
    CLASSIFICATION_REPORT_TXT,
    CONFUSION_MATRIX_PNG,
    NORMALIZED_CONFUSION_MATRIX_PNG,
    PER_CLASS_METRICS_PNG,
    PREDICTION_EXAMPLES_PNG,
    EVALUATION_REPORT_JSON,
)


def check_hardware():
    """
    Hardware environment check for evaluation.
    """
    gpus = tf.config.list_physical_devices("GPU")
    if gpus:
        return f"GPU ({gpus[0].name})"
    return "CPU (Native Windows x86_64)"


def plot_confusion_matrix(cm, normalize=False, save_path=CONFUSION_MATRIX_PNG):
    """
    Plots and saves 5x5 Confusion Matrix heatmaps using matplotlib.
    """
    plt.figure(figsize=(8, 6.5))
    
    if normalize:
        cm_display = cm.astype("float") / cm.sum(axis=1)[:, np.newaxis]
        title = "GrainVision AI — Normalized Confusion Matrix"
    else:
        cm_display = cm
        title = "GrainVision AI — Rice Grain Classification Confusion Matrix"

    plt.imshow(cm_display, interpolation="nearest", cmap=plt.cm.Blues)
    plt.title(title, fontsize=13, fontweight="bold", pad=12)
    plt.colorbar()

    tick_marks = np.arange(len(CLASS_NAMES))
    plt.xticks(tick_marks, CLASS_NAMES, rotation=30, fontsize=10)
    plt.yticks(tick_marks, CLASS_NAMES, fontsize=10)

    plt.xlabel("Predicted Class Label", fontsize=11, labelpad=8)
    plt.ylabel("True Class Label", fontsize=11, labelpad=8)

    # Annotate matrix cells with values
    thresh = cm_display.max() / 2.0
    for i in range(cm_display.shape[0]):
        for j in range(cm_display.shape[1]):
            val_str = f"{cm_display[i, j]:.2f}" if normalize else f"{cm_display[i, j]:,}"
            color = "white" if cm_display[i, j] > thresh else "black"
            plt.text(j, i, val_str, horizontalalignment="center", verticalalignment="center", color=color, fontsize=10, fontweight="bold")

    plt.tight_layout()
    plt.savefig(save_path, dpi=300)
    plt.close()
    print(f"[OK] Saved confusion matrix plot to: {save_path}", flush=True)


def plot_per_class_metrics(precisions, recalls, f1_scores, save_path=PER_CLASS_METRICS_PNG):
    """
    Plots per-class precision, recall, and F1-score bar chart.
    """
    x = np.arange(len(CLASS_NAMES))
    width = 0.25

    plt.figure(figsize=(10, 5.5))
    plt.bar(x - width, precisions, width, label="Precision", color="#2b5c8f")
    plt.bar(x, recalls, width, label="Recall", color="#46a040")
    plt.bar(x + width, f1_scores, width, label="F1-Score", color="#d95f02")

    plt.title("GrainVision AI — Per-Class Performance Metrics", fontsize=13, fontweight="bold", pad=12)
    plt.xlabel("Rice Variety Class", fontsize=11)
    plt.ylabel("Score", fontsize=11)
    plt.ylim(0, 1.08)
    plt.xticks(x, CLASS_NAMES, fontsize=10)
    plt.grid(axis="y", linestyle=":", alpha=0.6)
    plt.legend(loc="lower right", fontsize=10)

    # Add numeric value labels on top of bars
    for i in range(len(CLASS_NAMES)):
        plt.text(i - width, precisions[i] + 0.015, f"{precisions[i]:.2f}", ha="center", fontsize=8)
        plt.text(i, recalls[i] + 0.015, f"{recalls[i]:.2f}", ha="center", fontsize=8)
        plt.text(i + width, f1_scores[i] + 0.015, f"{f1_scores[i]:.2f}", ha="center", fontsize=8)

    plt.tight_layout()
    plt.savefig(save_path, dpi=300)
    plt.close()
    print(f"[OK] Saved per-class metrics plot to: {save_path}", flush=True)


def plot_prediction_examples(sample_images, sample_trues, sample_preds, sample_confs, save_path=PREDICTION_EXAMPLES_PNG):
    """
    Plots sample prediction grid showing correct and incorrect test image predictions.
    """
    n_samples = len(sample_images)
    if n_samples == 0:
        return

    cols = 5
    rows = int(np.ceil(n_samples / cols))

    plt.figure(figsize=(15, 3.2 * rows))
    for i in range(n_samples):
        plt.subplot(rows, cols, i + 1)
        img = sample_images[i]
        if np.max(img) <= 1.0:
            img = (img * 255.0).astype(np.uint8)

        plt.imshow(img)
        plt.axis("off")

        true_cls = CLASS_NAMES[sample_trues[i]]
        pred_cls = CLASS_NAMES[sample_preds[i]]
        conf = sample_confs[i] * 100.0

        is_correct = sample_trues[i] == sample_preds[i]
        color = "green" if is_correct else "red"
        status = "CORRECT" if is_correct else "MISCLASSIFIED"

        title_str = f"[{status}]\nTrue: {true_cls}\nPred: {pred_cls} ({conf:.1f}%)"
        plt.title(title_str, fontsize=9, color=color, fontweight="bold")

    plt.suptitle("GrainVision AI — Test Prediction Sample Visualizer", fontsize=14, fontweight="bold", y=0.98)
    plt.tight_layout()
    plt.savefig(save_path, dpi=300)
    plt.close()
    print(f"[OK] Saved prediction examples plot to: {save_path}", flush=True)


def evaluate_model():
    """
    Executes full Phase 6 Model Evaluation workflow.
    """
    start_time = time.time()
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    METADATA_DIR.mkdir(parents=True, exist_ok=True)

    hw_info = check_hardware()

    print("==================================================", flush=True)
    print("GRAINVISION AI — PHASE 6: MODEL EVALUATION", flush=True)
    print("==================================================", flush=True)
    print(f"Target Model      : {BEST_MODEL_PATH}", flush=True)
    print(f"Test Dataset Dir  : {TEST_DATA_DIR}", flush=True)
    print(f"Hardware          : {hw_info}", flush=True)
    print("==================================================\n", flush=True)

    if not BEST_MODEL_PATH.exists():
        raise FileNotFoundError(f"Trained model file not found at: {BEST_MODEL_PATH}")

    # 1. Load Phase 5 best trained model
    print("[1/5] Loading trained model artifact...", flush=True)
    model = tf.keras.models.load_model(str(BEST_MODEL_PATH))
    print("      Model loaded successfully.\n", flush=True)

    # 2. Load Phase 3 real test dataset
    print("[2/5] Loading test data pipeline...", flush=True)
    test_ds = create_test_dataset(data_dir=TEST_DATA_DIR, batch_size=EVALUATION_BATCH_SIZE)
    print("      Test data pipeline initialized.\n", flush=True)

    # 3. Fast prediction & label extraction
    print("[3/5] Running model predictions across 11,250 test images...", flush=True)
    
    # Extract true labels efficiently
    y_true_list = []
    sample_images = []
    sample_trues = []
    sample_preds = []
    sample_confs = []

    # Fast batch prediction
    y_pred_probs = model.predict(test_ds, verbose=1)
    y_pred = np.argmax(y_pred_probs, axis=-1)
    confidences = np.max(y_pred_probs, axis=-1)

    # Extract ground truth labels from test dataset
    for x_batch, y_batch in test_ds:
        labels = y_batch.numpy()
        y_true_list.extend(labels)

    y_true = np.array(y_true_list)

    # Collect prediction visualizer samples (up to 5 correct, 5 incorrect)
    correct_cnt = 0
    incorrect_cnt = 0
    
    # Re-iterate early batches for sample image visualization
    for x_batch, y_batch in test_ds.take(10):
        if correct_cnt >= 5 and incorrect_cnt >= 5:
            break
        labels = y_batch.numpy()
        imgs = x_batch.numpy()
        probs_b = model(x_batch, training=False).numpy()
        preds_b = np.argmax(probs_b, axis=-1)
        confs_b = np.max(probs_b, axis=-1)

        for i in range(len(labels)):
            t_c = labels[i]
            p_c = preds_b[i]
            if t_c == p_c and correct_cnt < 5:
                sample_images.append(imgs[i])
                sample_trues.append(t_c)
                sample_preds.append(p_c)
                sample_confs.append(confs_b[i])
                correct_cnt += 1
            elif t_c != p_c and incorrect_cnt < 5:
                sample_images.append(imgs[i])
                sample_trues.append(t_c)
                sample_preds.append(p_c)
                sample_confs.append(confs_b[i])
                incorrect_cnt += 1

    total_evaluated = len(y_true)
    num_correct = int(np.sum(y_true == y_pred))
    num_incorrect = total_evaluated - num_correct

    print(f"\n      Total Test Images Evaluated : {total_evaluated:,}", flush=True)
    print(f"      Correct Predictions         : {num_correct:,}", flush=True)
    print(f"      Incorrect Predictions       : {num_incorrect:,}\n", flush=True)

    # 4. Compute Metrics
    print("[4/5] Computing statistical evaluation metrics...", flush=True)
    acc = accuracy_score(y_true, y_pred)
    
    prec_macro, rec_macro, f1_macro, _ = precision_recall_fscore_support(
        y_true, y_pred, average="macro"
    )
    prec_weighted, rec_weighted, f1_weighted, _ = precision_recall_fscore_support(
        y_true, y_pred, average="weighted"
    )
    prec_per_cls, rec_per_cls, f1_per_cls, supp_per_cls = precision_recall_fscore_support(
        y_true, y_pred, average=None
    )

    cm = confusion_matrix(y_true, y_pred)
    clf_report_str = classification_report(y_true, y_pred, target_names=CLASS_NAMES, digits=4)

    print("--------------------------------------------------", flush=True)
    print("EVALUATION SUMMARY RESULTS", flush=True)
    print("--------------------------------------------------", flush=True)
    print(f"Test Accuracy     : {acc:.4f} ({acc*100:.2f}%)", flush=True)
    print(f"Macro Precision   : {prec_macro:.4f}", flush=True)
    print(f"Macro Recall      : {rec_macro:.4f}", flush=True)
    print(f"Macro F1-Score    : {f1_macro:.4f}", flush=True)
    print(f"Weighted Precision: {prec_weighted:.4f}", flush=True)
    print(f"Weighted Recall   : {rec_weighted:.4f}", flush=True)
    print(f"Weighted F1-Score : {f1_weighted:.4f}", flush=True)
    print("--------------------------------------------------\n", flush=True)
    print("Classification Report:\n", flush=True)
    print(clf_report_str, flush=True)

    # 5. Generate Plots & Reports
    print("[5/5] Exporting evaluation charts and reports...", flush=True)
    
    plot_confusion_matrix(cm, normalize=False, save_path=CONFUSION_MATRIX_PNG)
    plot_confusion_matrix(cm, normalize=True, save_path=NORMALIZED_CONFUSION_MATRIX_PNG)
    plot_per_class_metrics(prec_per_cls, rec_per_cls, f1_per_cls, save_path=PER_CLASS_METRICS_PNG)
    plot_prediction_examples(sample_images, sample_trues, sample_preds, sample_confs, save_path=PREDICTION_EXAMPLES_PNG)

    with open(CLASSIFICATION_REPORT_TXT, "w") as f:
        f.write(clf_report_str)
    print(f"[OK] Saved classification report text to: {CLASSIFICATION_REPORT_TXT}", flush=True)

    total_duration = time.time() - start_time
    duration_min = int(total_duration // 60)
    duration_sec = int(total_duration % 60)
    duration_str = f"{duration_min}m {duration_sec}s ({total_duration:.2f}s)"

    summary_text = (
        "==================================================\n"
        "GrainVision AI — Phase 6 Model Evaluation Report\n"
        "==================================================\n\n"
        f"Execution Timestamp   : {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
        f"Evaluated Model       : {BEST_MODEL_PATH.resolve()}\n"
        f"Hardware Target       : {hw_info}\n"
        f"Test Dataset Location : {TEST_DATA_DIR.resolve()}\n"
        f"Total Test Images     : {total_evaluated:,}\n"
        f"Evaluated Classes (5) : {', '.join(CLASS_NAMES)}\n\n"
        "--------------------------------------------------\n"
        "OVERALL PERFORMANCE METRICS\n"
        "--------------------------------------------------\n"
        f"Overall Test Accuracy : {acc:.4f} ({acc*100:.2f}%)\n"
        f"Correct Predictions   : {num_correct:,} / {total_evaluated:,}\n"
        f"Incorrect Predictions : {num_incorrect:,} / {total_evaluated:,}\n\n"
        f"Macro Precision       : {prec_macro:.4f}\n"
        f"Macro Recall          : {rec_macro:.4f}\n"
        f"Macro F1-Score        : {f1_macro:.4f}\n\n"
        f"Weighted Precision    : {prec_weighted:.4f}\n"
        f"Weighted Recall       : {rec_weighted:.4f}\n"
        f"Weighted F1-Score     : {f1_weighted:.4f}\n"
        f"Evaluation Duration   : {duration_str}\n\n"
        "--------------------------------------------------\n"
        "PER-CLASS PERFORMANCE BREAKDOWN\n"
        "--------------------------------------------------\n"
    )

    per_class_summary = {}
    for idx, cname in enumerate(CLASS_NAMES):
        p_val = float(prec_per_cls[idx])
        r_val = float(rec_per_cls[idx])
        f_val = float(f1_per_cls[idx])
        s_val = int(supp_per_cls[idx])
        
        summary_text += (
            f"Class [{idx}] {cname:<10} | Precision: {p_val:.4f} | Recall: {r_val:.4f} | "
            f"F1-Score: {f_val:.4f} | Support: {s_val:,}\n"
        )
        
        per_class_summary[cname] = {
            "class_index": idx,
            "precision": round(p_val, 4),
            "recall": round(r_val, 4),
            "f1_score": round(f_val, 4),
            "support": s_val,
        }

    summary_text += (
        "\n--------------------------------------------------\n"
        "CONFUSION MATRIX (5x5 Raw Counts)\n"
        "--------------------------------------------------\n"
        f"Header Classes: {CLASS_NAMES}\n"
        f"{cm}\n\n"
        "==================================================\n"
    )

    with open(EVALUATION_REPORT_TXT, "w") as f:
        f.write(summary_text)
    print(f"[OK] Saved evaluation report text to: {EVALUATION_REPORT_TXT}", flush=True)

    json_metadata = {
        "project": "GrainVision AI",
        "phase": "Phase 6 — Model Evaluation",
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "hardware": hw_info,
        "evaluated_model": str(BEST_MODEL_PATH.resolve()),
        "test_dataset_dir": str(TEST_DATA_DIR.resolve()),
        "total_test_images": total_evaluated,
        "correct_predictions": num_correct,
        "incorrect_predictions": num_incorrect,
        "overall_test_accuracy": round(acc, 4),
        "macro_metrics": {
            "precision": round(prec_macro, 4),
            "recall": round(rec_macro, 4),
            "f1_score": round(f1_macro, 4),
        },
        "weighted_metrics": {
            "precision": round(prec_weighted, 4),
            "recall": round(rec_weighted, 4),
            "f1_score": round(f1_weighted, 4),
        },
        "per_class_metrics": per_class_summary,
        "confusion_matrix": cm.tolist(),
        "normalized_confusion_matrix": (cm.astype("float") / cm.sum(axis=1)[:, np.newaxis]).tolist(),
        "evaluation_duration_seconds": round(total_duration, 2),
    }

    with open(EVALUATION_REPORT_JSON, "w") as f:
        json.dump(json_metadata, f, indent=2)
    print(f"[OK] Saved evaluation metadata JSON to: {EVALUATION_REPORT_JSON}", flush=True)
    print("==================================================\n", flush=True)

    return json_metadata


if __name__ == "__main__":
    evaluate_model()
