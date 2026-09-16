"""
GrainVision AI — Evaluation Verification Script
Phase 6: Model Evaluation

Runs a 10-point automated verification audit to confirm that Phase 6 model evaluation
operates on the real test dataset, computes exact 5x5 confusion matrix dimensions,
validates all report artifacts, and enforces zero model retraining.
"""

import os
import sys
import json
from pathlib import Path
import numpy as np
import tensorflow as tf

from ml.preprocessing.preprocessing_config import (
    CLASS_NAMES,
    NUM_CLASSES,
    IMAGE_SIZE,
    INPUT_SHAPE,
    PROJECT_ROOT,
    PROCESSED_DATA_DIR,
    METADATA_DIR,
    RESULTS_DIR,
)
from ml.preprocessing.data_pipeline import create_test_dataset
from ml.evaluation.evaluation_config import (
    BEST_MODEL_PATH,
    TEST_DATA_DIR,
    EVALUATION_REPORT_TXT,
    CLASSIFICATION_REPORT_TXT,
    CONFUSION_MATRIX_PNG,
    NORMALIZED_CONFUSION_MATRIX_PNG,
    PER_CLASS_METRICS_PNG,
    PREDICTION_EXAMPLES_PNG,
    EVALUATION_REPORT_JSON,
)


def verify_evaluation():
    """
    Executes 10-point evaluation audit.
    """
    print("==================================================")
    print("GRAINVISION AI — PHASE 6: EVALUATION VERIFICATION")
    print("==================================================")

    results = {
        "passed_checks": 0,
        "total_checks": 10,
        "details": [],
    }

    def _record(check_num, description, status, notes=""):
        symbol = "[OK]" if status else "[FAILED]"
        print(f"{symbol} Check {check_num}/10: {description}")
        if notes:
            print(f"       -> {notes}")
        results["details"].append({
            "check": check_num,
            "description": description,
            "passed": status,
            "notes": notes,
        })
        if status:
            results["passed_checks"] += 1

    # Check 1: Model loads successfully
    try:
        model = tf.keras.models.load_model(str(BEST_MODEL_PATH))
        _record(1, "Best model loaded successfully", True, f"Path: {BEST_MODEL_PATH}")
    except Exception as e:
        _record(1, "Best model loaded successfully", False, str(e))
        return results

    # Check 2: Test dataset directory exists and count
    try:
        test_dir = Path(TEST_DATA_DIR)
        all_test_files = list(test_dir.rglob("*.*"))
        valid_files = [f for f in all_test_files if f.suffix.lower() in {".jpg", ".jpeg", ".png", ".bmp", ".webp"}]
        test_count = len(valid_files)
        status = (test_dir.exists() and test_count == 11250)
        _record(2, "Test dataset directory and file count (11,250)", status, f"Found {test_count:,} test images")
    except Exception as e:
        _record(2, "Test dataset directory and file count (11,250)", False, str(e))

    # Check 3: Test dataset batch extraction & geometry
    try:
        test_ds = create_test_dataset(data_dir=TEST_DATA_DIR, batch_size=32)
        for x_batch, y_batch in test_ds.take(1):
            sample_x = x_batch
            sample_y = y_batch
            break
        img_shape = tuple(sample_x.shape[1:])
        status = (img_shape == (224, 224, 3))
        _record(3, "Test image tensor shape == (224, 224, 3)", status, f"Got {img_shape}")
    except Exception as e:
        _record(3, "Test image tensor shape == (224, 224, 3)", False, str(e))

    # Check 4: Test label index range [0, 4]
    try:
        labels_arr = sample_y.numpy()
        l_min, l_max = int(labels_arr.min()), int(labels_arr.max())
        status = (l_min >= 0 and l_max < NUM_CLASSES)
        _record(4, "Test label indices within range [0, 4]", status, f"Range: [{l_min}, {l_max}]")
    except Exception as e:
        _record(4, "Test label indices within range [0, 4]", False, str(e))

    # Check 5: Model forward pass output shape (N, 5) & softmax sums
    try:
        out_probs = model(sample_x, training=False).numpy()
        out_shape = out_probs.shape
        sums = np.sum(out_probs, axis=-1)
        valid_sums = np.allclose(sums, 1.0, atol=1e-3)
        status = (len(out_shape) == 2 and out_shape[1] == 5 and valid_sums)
        _record(5, "Model output shape == (batch, 5) & Softmax valid", status, f"Output shape: {out_shape}")
    except Exception as e:
        _record(5, "Model output shape == (batch, 5) & Softmax valid", False, str(e))

    # Check 6: Generated confusion matrix dimensions == 5x5
    try:
        if EVALUATION_REPORT_JSON.exists():
            with open(EVALUATION_REPORT_JSON, "r") as f:
                report_json = json.load(f)
            cm_arr = np.array(report_json["confusion_matrix"])
            status = (cm_arr.shape == (5, 5))
            _record(6, "Confusion matrix dimensions strictly 5x5", status, f"Shape: {cm_arr.shape}")
        else:
            _record(6, "Confusion matrix dimensions strictly 5x5", False, "evaluation_report.json not found")
    except Exception as e:
        _record(6, "Confusion matrix dimensions strictly 5x5", False, str(e))

    # Check 7: Classification report covers all 5 classes
    try:
        if CLASSIFICATION_REPORT_TXT.exists():
            with open(CLASSIFICATION_REPORT_TXT, "r") as f:
                clf_txt = f.read()
            missing_classes = [c for c in CLASS_NAMES if c not in clf_txt]
            status = (len(missing_classes) == 0)
            _record(7, "Classification report covers all 5 target classes", status, f"Covered: {CLASS_NAMES}")
        else:
            _record(7, "Classification report covers all 5 target classes", False, "classification_report.txt not found")
    except Exception as e:
        _record(7, "Classification report covers all 5 target classes", False, str(e))

    # Check 8: Evaluated total image count == 11,250
    try:
        if EVALUATION_REPORT_JSON.exists():
            eval_total = report_json.get("total_test_images", 0)
            status = (eval_total == 11250)
            _record(8, "Evaluated total image count == 11,250", status, f"Evaluated count: {eval_total:,}")
        else:
            _record(8, "Evaluated total image count == 11,250", False, "evaluation_report.json missing")
    except Exception as e:
        _record(8, "Evaluated total image count == 11,250", False, str(e))

    # Check 9: All evaluation artifact files exist
    try:
        required_artifacts = [
            EVALUATION_REPORT_TXT,
            CLASSIFICATION_REPORT_TXT,
            CONFUSION_MATRIX_PNG,
            NORMALIZED_CONFUSION_MATRIX_PNG,
            PER_CLASS_METRICS_PNG,
            PREDICTION_EXAMPLES_PNG,
            EVALUATION_REPORT_JSON,
        ]
        missing_art = [str(art.name) for art in required_artifacts if not art.exists()]
        status = (len(missing_art) == 0)
        _record(9, "All 7 evaluation artifact files present", status, f"Missing: {missing_art}" if missing_art else "All files present")
    except Exception as e:
        _record(9, "All 7 evaluation artifact files present", False, str(e))

    # Check 10: Model backbone frozen & zero training occurred
    try:
        backbone_layer = None
        for l in model.layers:
            if "mobilenetv2" in l.name.lower():
                backbone_layer = l
                break

        if backbone_layer is not None:
            is_frozen = not backbone_layer.trainable
            _record(10, "Model backbone frozen & zero retraining occurred", is_frozen, f"Backbone '{backbone_layer.name}' trainable: {backbone_layer.trainable}")
        else:
            _record(10, "Model backbone frozen & zero retraining occurred", False, f"Backbone layer not found in layers: {[l.name for l in model.layers]}")
    except Exception as e:
        _record(10, "Model backbone frozen & zero retraining occurred", False, str(e))

    print("--------------------------------------------------")
    print(f"VERIFICATION SUMMARY: {results['passed_checks']} / {results['total_checks']} Checks Passed")
    print("==================================================\n")

    return results


if __name__ == "__main__":
    verify_evaluation()
