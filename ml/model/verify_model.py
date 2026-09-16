"""
GrainVision AI — Model Architecture Verification Suite
Phase 4: Deep Learning Model Architecture

Validates MobileNetV2 architecture, layer configurations, tensor shapes,
backbone freezing, model compilation, dummy forward pass, and Phase 3 batch
compatibility without executing model training (model.fit()).
"""

import sys
import json
from pathlib import Path
import numpy as np
import tensorflow as tf

# Add project root to sys.path
PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from ml.model.model_config import (
    MODEL_NAME,
    BASE_MODEL_NAME,
    PRETRAINED_WEIGHTS,
    INPUT_SHAPE,
    NUM_CLASSES,
    CLASS_NAMES,
    CLASS_TO_INDEX,
    FREEZE_BACKBONE,
    DENSE_UNITS,
    DROPOUT_RATE,
    LEARNING_RATE,
    OPTIMIZER_NAME,
    LOSS_FUNCTION,
    METRICS,
    MODEL_SUMMARY_FILE,
    MODEL_PLOT_FILE,
    RESULTS_DIR,
)
from ml.model.build_model import build_rice_classifier, get_model_summary_str
from ml.preprocessing.data_pipeline import create_validation_dataset, create_test_dataset


def verify_model_architecture():
    """
    Executes a 10-point architectural verification test on the Phase 4 model.
    """
    print(f"\n==================================================")
    print(f"GrainVision AI — Model Architecture Verification Suite")
    print(f"Phase 4: Deep Learning Model Architecture")
    print(f"==================================================\n")

    results = {
        "model_name": MODEL_NAME,
        "base_model": BASE_MODEL_NAME,
        "pretrained_weights": PRETRAINED_WEIGHTS,
        "input_shape": list(INPUT_SHAPE),
        "num_classes": NUM_CLASSES,
        "class_mapping": CLASS_TO_INDEX,
        "checks": {},
        "passed_checks": 0,
        "total_checks": 10,
        "pipeline_status": "FAIL"
    }

    # 1. Construct Model
    try:
        model = build_rice_classifier(
            input_shape=INPUT_SHAPE,
            num_classes=NUM_CLASSES,
            freeze_backbone=FREEZE_BACKBONE,
            learning_rate=LEARNING_RATE,
            dropout_rate=DROPOUT_RATE,
            dense_units=DENSE_UNITS,
            compile_model=True
        )
        results["checks"]["1_model_constructed"] = "PASS"
        print("[OK] 1. Model Construction              : PASS")
    except Exception as e:
        results["checks"]["1_model_constructed"] = f"FAIL ({str(e)})"
        print(f"[!] 1. Model Construction              : FAIL ({e})")
        return results

    # 2. Input Shape Verification
    expected_input_shape = (None,) + INPUT_SHAPE
    if model.input_shape == expected_input_shape:
        results["checks"]["2_input_shape_224x224x3"] = "PASS"
        print(f"[OK] 2. Input Shape {expected_input_shape}   : PASS")
    else:
        results["checks"]["2_input_shape_224x224x3"] = f"FAIL (Got {model.input_shape})"
        print(f"[!] 2. Input Shape                     : FAIL (Got {model.input_shape})")

    # 3. Output Shape Verification
    expected_output_shape = (None, NUM_CLASSES)
    if model.output_shape == expected_output_shape:
        results["checks"]["3_output_shape_none_5"] = "PASS"
        print(f"[OK] 3. Output Shape {expected_output_shape}       : PASS")
    else:
        results["checks"]["3_output_shape_none_5"] = f"FAIL (Got {model.output_shape})"
        print(f"[!] 3. Output Shape                    : FAIL (Got {model.output_shape})")

    # 4. Softmax Output Layer Verification
    final_layer = model.layers[-1]
    is_softmax = getattr(final_layer.activation, "__name__", "") == "softmax"
    if is_softmax and final_layer.units == NUM_CLASSES:
        results["checks"]["4_softmax_5_classes"] = "PASS"
        print("[OK] 4. Softmax Output (5 Classes)     : PASS")
    else:
        results["checks"]["4_softmax_5_classes"] = f"FAIL (Units={final_layer.units}, Act={final_layer.activation})"
        print(f"[!] 4. Softmax Output                  : FAIL")

    # 5. MobileNetV2 Backbone Existence
    backbone_layer = None
    for layer in model.layers:
        if "mobilenetv2" in layer.name.lower():
            backbone_layer = layer
            break

    if backbone_layer is not None:
        results["checks"]["5_mobilenetv2_backbone"] = "PASS"
        print("[OK] 5. MobileNetV2 Backbone Present   : PASS")
    else:
        results["checks"]["5_mobilenetv2_backbone"] = "FAIL (Backbone not found)"
        print("[!] 5. MobileNetV2 Backbone            : FAIL")

    # 6. Backbone Freezing Verification
    if backbone_layer is not None and not backbone_layer.trainable:
        results["checks"]["6_backbone_frozen"] = "PASS"
        print("[OK] 6. Backbone Frozen (Trainable=False): PASS")
    else:
        results["checks"]["6_backbone_frozen"] = "FAIL (Backbone is trainable)"
        print("[!] 6. Backbone Frozen                 : FAIL")

    # 7. Model Compilation Verification
    is_compiled = model.optimizer is not None and model.loss is not None
    if is_compiled:
        results["checks"]["7_model_compiled"] = "PASS"
        print(f"[OK] 7. Model Compiled (Loss={LOSS_FUNCTION}, Opt={OPTIMIZER_NAME}): PASS")
    else:
        results["checks"]["7_model_compiled"] = "FAIL"
        print("[!] 7. Model Compiled                  : FAIL")

    # 8. Dummy Forward Pass Test
    try:
        dummy_input = np.random.uniform(0.0, 1.0, size=(1, 224, 224, 3)).astype(np.float32)
        dummy_output = model(dummy_input, training=False)
        output_sum = float(np.sum(dummy_output.numpy()))
        # Softmax probabilities should sum to approximately 1.0
        if dummy_output.shape == (1, 5) and abs(output_sum - 1.0) < 1e-4:
            results["checks"]["8_dummy_forward_pass"] = "PASS"
            print(f"[OK] 8. Dummy Forward Pass (Shape={dummy_output.shape}, Sum={output_sum:.4f}): PASS")
        else:
            results["checks"]["8_dummy_forward_pass"] = f"FAIL (Output={dummy_output.numpy()})"
            print(f"[!] 8. Dummy Forward Pass              : FAIL")
    except Exception as e:
        results["checks"]["8_dummy_forward_pass"] = f"FAIL ({str(e)})"
        print(f"[!] 8. Dummy Forward Pass              : FAIL ({e})")

    # 9. Real Phase 3 Batch Compatibility Forward Pass Test
    try:
        val_ds = create_validation_dataset(batch_size=32)
        batch_images, batch_labels = next(iter(val_ds))
        real_output = model(batch_images, training=False)
        if real_output.shape == (batch_images.shape[0], 5):
            results["checks"]["9_phase3_batch_forward_pass"] = "PASS"
            print(f"[OK] 9. Phase 3 Batch Forward Pass (Batch={batch_images.shape[0]}, Out={real_output.shape}): PASS")
        else:
            results["checks"]["9_phase3_batch_forward_pass"] = f"FAIL (Output={real_output.shape})"
            print(f"[!] 9. Phase 3 Batch Forward Pass      : FAIL")
    except Exception as e:
        results["checks"]["9_phase3_batch_forward_pass"] = f"FAIL ({str(e)})"
        print(f"[!] 9. Phase 3 Batch Forward Pass      : FAIL ({e})")

    # 10. Model Summary Export Verification
    try:
        RESULTS_DIR.mkdir(parents=True, exist_ok=True)
        summary_str = get_model_summary_str(model)
        
        # Calculate parameter counts
        total_params = model.count_params()
        trainable_params = sum([tf.keras.backend.count_params(w) for w in model.trainable_weights])
        non_trainable_params = sum([tf.keras.backend.count_params(w) for w in model.non_trainable_weights])

        results["total_parameters"] = total_params
        results["trainable_parameters"] = trainable_params
        results["non_trainable_parameters"] = non_trainable_params

        summary_header = (
            "==================================================\n"
            "GrainVision AI — Model Summary Report\n"
            "Phase 4: Deep Learning Model Architecture\n"
            "==================================================\n"
            f"Model Name           : {MODEL_NAME}\n"
            f"Backbone             : {BASE_MODEL_NAME} (ImageNet Pre-trained)\n"
            f"Backbone Trainable   : False (Frozen for Transfer Learning)\n"
            f"Input Geometry       : {INPUT_SHAPE}\n"
            f"Output Classes       : {NUM_CLASSES} ({', '.join(CLASS_NAMES)})\n"
            f"Loss Function        : {LOSS_FUNCTION}\n"
            f"Optimizer            : {OPTIMIZER_NAME} (lr={LEARNING_RATE})\n"
            f"Metrics              : {', '.join(METRICS)}\n"
            "--------------------------------------------------\n"
            f"Total Parameters     : {total_params:,}\n"
            f"Trainable Parameters : {trainable_params:,}\n"
            f"Non-Trainable Params : {non_trainable_params:,}\n"
            "==================================================\n\n"
        )

        with open(MODEL_SUMMARY_FILE, "w", encoding="utf-8") as f:
            f.write(summary_header + summary_str)

        # Attempt model plot image generation
        try:
            tf.keras.utils.plot_model(
                model,
                to_file=str(MODEL_PLOT_FILE),
                show_shapes=True,
                show_layer_names=True,
                expand_nested=True
            )
            print(f"[+] Model architecture diagram saved to: {MODEL_PLOT_FILE}")
            results["model_plot_saved"] = True
        except Exception as plot_err:
            print(f"[!] Notice: Model diagram generation skipped ({plot_err})")
            results["model_plot_saved"] = False

        results["checks"]["10_model_summary_exported"] = "PASS"
        print(f"[OK] 10. Model Summary Exported to '{MODEL_SUMMARY_FILE.name}': PASS")
    except Exception as e:
        results["checks"]["10_model_summary_exported"] = f"FAIL ({str(e)})"
        print(f"[!] 10. Model Summary Exported          : FAIL ({e})")

    # Evaluate Overall Status
    passed_count = sum(1 for status in results["checks"].values() if status.startswith("PASS"))
    results["passed_checks"] = passed_count
    results["pipeline_status"] = "PASS" if passed_count == results["total_checks"] else "FAIL"

    print(f"--------------------------------------------------")
    print(f"VERIFICATION REPORT — PHASE 4 MODEL ARCHITECTURE")
    print(f"--------------------------------------------------")
    print(f"Model Name              : {MODEL_NAME}")
    print(f"Backbone                : {BASE_MODEL_NAME} (ImageNet)")
    print(f"Total Parameters        : {results.get('total_parameters', 0):,}")
    print(f"Trainable Parameters    : {results.get('trainable_parameters', 0):,}")
    print(f"Non-Trainable Parameters: {results.get('non_trainable_parameters', 0):,}")
    print(f"Passed Checks           : {passed_count} / {results['total_checks']}")
    print(f"Pipeline Status         : {results['pipeline_status']}")
    print(f"--------------------------------------------------\n")

    # Save JSON Report
    report_file = PROJECT_ROOT / "ml" / "dataset" / "metadata" / "model_verification_report.json"
    with open(report_file, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)

    print(f"[+] Detailed report saved to: {report_file}\n")
    return results


if __name__ == "__main__":
    verification_results = verify_model_architecture()
    if verification_results["pipeline_status"] != "PASS":
        sys.exit(1)
