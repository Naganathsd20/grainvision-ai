"""
GrainVision AI — Model Architecture Configuration
Phase 4: Deep Learning Model Architecture

Centralized parameters for model selection, transfer learning backbone,
classification head, regularizers, optimizer, loss function, and metrics.
"""

from pathlib import Path
from ml.preprocessing.preprocessing_config import (
    IMAGE_SIZE,
    INPUT_SHAPE,
    NUM_CLASSES,
    CLASS_NAMES,
    CLASS_TO_INDEX,
    INDEX_TO_CLASS,
    PROJECT_ROOT,
    RESULTS_DIR,
)

# Model Identification
MODEL_NAME = "GrainVision_MobileNetV2"
BASE_MODEL_NAME = "MobileNetV2"
PRETRAINED_WEIGHTS = "imagenet"

# Transfer Learning Configuration
FREEZE_BACKBONE = True

# Classification Head Architecture
GLOBAL_POOLING = "avg"           # GlobalAveragePooling2D
DENSE_UNITS = 256                # Intermediate Dense layer representation
DENSE_ACTIVATION = "relu"
USE_BATCH_NORM = True            # Batch Normalization before Dense layer
DROPOUT_RATE = 0.3               # 30% Dropout rate for overfitting prevention
FINAL_ACTIVATION = "softmax"     # 5-class probability distribution

# Model Compilation Hyperparameters
LEARNING_RATE = 0.001            # Initial learning rate for transfer learning
OPTIMIZER_NAME = "adam"
LOSS_FUNCTION = "sparse_categorical_crossentropy"
METRICS = ["accuracy"]

# Report Output Paths
MODEL_SUMMARY_FILE = RESULTS_DIR / "model_summary.txt"
MODEL_PLOT_FILE = RESULTS_DIR / "model_architecture.png"
