"""
GrainVision AI — Model Evaluation Configuration
Phase 6: Model Evaluation

Centralized configuration parameters, input model paths, test dataset paths,
and output artifact filepaths for model evaluation.
"""

from pathlib import Path
from ml.preprocessing.preprocessing_config import (
    BATCH_SIZE,
    IMAGE_SIZE,
    INPUT_SHAPE,
    NUM_CLASSES,
    CLASS_NAMES,
    CLASS_TO_INDEX,
    INDEX_TO_CLASS,
    PROJECT_ROOT,
    PROCESSED_DATA_DIR,
    METADATA_DIR,
    RESULTS_DIR,
)

# Input Paths
MODELS_DIR = PROJECT_ROOT / "models"
BEST_MODEL_PATH = MODELS_DIR / "grainvision_mobilenetv2_best.keras"
TEST_DATA_DIR = PROCESSED_DATA_DIR / "test"

# Evaluation Execution Hyperparameters
EVALUATION_BATCH_SIZE = 64  # Batch size for memory-efficient CPU evaluation

# Output Artifact Paths in results/
EVALUATION_REPORT_TXT = RESULTS_DIR / "evaluation_report.txt"
CLASSIFICATION_REPORT_TXT = RESULTS_DIR / "classification_report.txt"
CONFUSION_MATRIX_PNG = RESULTS_DIR / "confusion_matrix.png"
NORMALIZED_CONFUSION_MATRIX_PNG = RESULTS_DIR / "normalized_confusion_matrix.png"
PER_CLASS_METRICS_PNG = RESULTS_DIR / "per_class_metrics.png"
PREDICTION_EXAMPLES_PNG = RESULTS_DIR / "prediction_examples.png"

# Output Metadata Path in ml/dataset/metadata/
EVALUATION_REPORT_JSON = METADATA_DIR / "evaluation_report.json"
