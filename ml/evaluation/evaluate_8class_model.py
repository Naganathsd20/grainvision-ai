"""
GrainVision AI — 8-Class Model Evaluator
Evaluates 'models/grainvision_milled_rice_8class_best.keras' on the held-out 1,200 test set images.
Generates comprehensive accuracy, precision, recall, F1-score, classification report, and confusion matrix.
"""

import os
import sys
import json
import numpy as np
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix, precision_recall_fscore_support
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
TEST_DIR = os.path.join(PROJECT_ROOT, "ml", "dataset", "processed_8class", "test")
MODEL_PATH = os.path.join(PROJECT_ROOT, "models", "grainvision_milled_rice_8class_best.keras")
RESULTS_DIR = os.path.join(PROJECT_ROOT, "results")

IMAGE_SIZE = (224, 224)
BATCH_SIZE = 32


def evaluate_model():
    print(f"[*] Loading trained 8-class model from: {MODEL_PATH}...")
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at: {MODEL_PATH}")

    model = tf.keras.models.load_model(MODEL_PATH)
    print("[+] Model loaded successfully!")

    print(f"[*] Loading test dataset from: {TEST_DIR}...")
    test_ds = tf.keras.utils.image_dataset_from_directory(
        TEST_DIR,
        image_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        label_mode="int",
        shuffle=False
    )

    class_names = test_ds.class_names
    print(f"[+] Test dataset loaded with classes ({len(class_names)}): {class_names}")

    rescale_layer = tf.keras.layers.Rescaling(1.0 / 255.0)
    test_ds_scaled = test_ds.map(lambda x, y: (rescale_layer(x), y))

    # Collect ground truth labels and predictions
    y_true = []
    y_pred = []
    y_prob = []

    print("[*] Running inference on 1,200 test images...")
    for images, labels in test_ds_scaled:
        preds = model(images, training=False).numpy()
        pred_labels = np.argmax(preds, axis=1)
        
        y_true.extend(labels.numpy())
        y_pred.extend(pred_labels)
        y_prob.extend(preds)

    y_true = np.array(y_true)
    y_pred = np.array(y_pred)
    y_prob = np.array(y_prob)

    # Overall Metrics
    correct = np.sum(y_true == y_pred)
    total = len(y_true)
    test_accuracy = float(correct / total)
    print(f"\n[+] Test Set Accuracy: {test_accuracy * 100:.2f}% ({correct}/{total})")

    # Precision, Recall, F1
    macro_p, macro_r, macro_f1, _ = precision_recall_fscore_support(y_true, y_pred, average="macro")
    weighted_p, weighted_r, weighted_f1, _ = precision_recall_fscore_support(y_true, y_pred, average="weighted")
    per_class_p, per_class_r, per_class_f1, per_class_support = precision_recall_fscore_support(y_true, y_pred, average=None)

    cls_report_str = classification_report(y_true, y_pred, target_names=class_names, digits=4)
    print("\nClassification Report:\n" + cls_report_str)

    # Confusion Matrix
    cm = confusion_matrix(y_true, y_pred)

    os.makedirs(RESULTS_DIR, exist_ok=True)

    # Save Confusion Matrix Plot
    plt.figure(figsize=(9, 7))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=class_names, yticklabels=class_names)
    plt.title(f"GrainVision AI — 8-Class Confusion Matrix (Acc: {test_accuracy*100:.2f}%)")
    plt.xlabel("Predicted Variety")
    plt.ylabel("True Variety")
    plt.tight_layout()
    cm_plot_path = os.path.join(RESULTS_DIR, "confusion_matrix_8class.png")
    plt.savefig(cm_plot_path, dpi=300)
    plt.close()
    print(f"[+] Saved Confusion Matrix plot to: {cm_plot_path}")

    # Build per-class dictionary
    per_class_dict = {}
    for idx, name in enumerate(class_names):
        per_class_dict[name] = {
            "precision": round(float(per_class_p[idx]), 4),
            "recall": round(float(per_class_r[idx]), 4),
            "f1_score": round(float(per_class_f1[idx]), 4),
            "support": int(per_class_support[idx])
        }

    eval_json = {
        "model_path": MODEL_PATH,
        "test_images_total": total,
        "test_accuracy": round(test_accuracy, 4),
        "macro_precision": round(float(macro_p), 4),
        "macro_recall": round(float(macro_r), 4),
        "macro_f1_score": round(float(macro_f1), 4),
        "weighted_precision": round(float(weighted_p), 4),
        "weighted_recall": round(float(weighted_r), 4),
        "weighted_f1_score": round(float(weighted_f1), 4),
        "per_class_metrics": per_class_dict
    }

    report_json_path = os.path.join(RESULTS_DIR, "evaluation_report_8class.json")
    with open(report_json_path, "w") as f:
        json.dump(eval_json, f, indent=2)

    report_txt_path = os.path.join(RESULTS_DIR, "evaluation_report_8class.txt")
    with open(report_txt_path, "w") as f:
        f.write("GrainVision AI — 8-Class Test Set Evaluation Report\n")
        f.write("=" * 60 + "\n")
        f.write(f"Model File: {MODEL_PATH}\n")
        f.write(f"Test Set Size: {total} images ({len(class_names)} classes x 150 images)\n")
        f.write(f"Test Accuracy: {test_accuracy * 100:.2f}%\n")
        f.write(f"Macro F1-Score: {macro_f1:.4f}\n")
        f.write(f"Weighted F1-Score: {weighted_f1:.4f}\n\n")
        f.write("Classification Report:\n")
        f.write(cls_report_str)

    print(f"[+] Saved evaluation JSON to '{report_json_path}' and TXT report to '{report_txt_path}'")
    return eval_json


if __name__ == "__main__":
    try:
        evaluate_model()
    except Exception as e:
        print(f"[ERROR] Evaluation failed: {e}")
        sys.exit(1)
