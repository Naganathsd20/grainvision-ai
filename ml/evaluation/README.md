# GrainVision AI — Phase 6: Model Evaluation

This directory contains configuration, evaluation scripts, verification audits, and technical documentation for **Phase 6: Model Evaluation** of the GrainVision AI project.

---

## Overview

The model evaluation module assesses the Phase 5 trained **MobileNetV2** transfer learning classification model (`models/grainvision_mobilenetv2_best.keras`) on the official 11,250 real test dataset images (`ml/dataset/processed/test`, 2,250 per class).

- **Evaluation Dataset**: 11,250 real test images (2,250 per class: `Arborio`, `Basmati`, `Ipsala`, `Jasmine`, `Karacadag`)
- **Trained Model**: `models/grainvision_mobilenetv2_best.keras` (13.0 MB)
- **Batch Processing**: Batch size 64 for efficient, deterministic CPU evaluation
- **Zero Retraining**: Evaluation runs strictly in inference mode without updating model weights

---

## Directory Structure

```text
ml/evaluation/
├── README.md               # Phase 6 documentation (this file)
├── evaluation_config.py    # Paths & evaluation configuration
├── evaluate_model.py       # Main evaluation pipeline & plotting script
└── verify_evaluation.py    # 10-point evaluation audit script
```

---

## Output Artifacts

Upon completion, evaluation generates the following reports and visualizations:

- **Evaluation Text Summary**: `results/evaluation_report.txt`
- **Classification Report Text**: `results/classification_report.txt`
- **Raw Confusion Matrix Plot**: `results/confusion_matrix.png`
- **Normalized Confusion Matrix Plot**: `results/normalized_confusion_matrix.png`
- **Per-Class Metrics Bar Chart**: `results/per_class_metrics.png`
- **Prediction Visualizer Grid**: `results/prediction_examples.png`
- **Structured JSON Metadata**: `ml/dataset/metadata/evaluation_report.json`

---

## How to Run Evaluation

From the project root (`f:\grainvision-ai`):

```bash
# Run model evaluation on full 11,250 test set
python -m ml.evaluation.evaluate_model

# Run 10-point evaluation verification audit
python -m ml.evaluation.verify_evaluation
```
