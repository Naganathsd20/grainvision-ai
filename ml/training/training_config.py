"""
GrainVision AI — Model Training Configuration
Phase 5: Model Training (Quick CPU Version)

Centralized configuration settings, hyperparameters, callback parameters,
and output artifact filepaths for transfer learning on a balanced representative subset.
"""

from pathlib import Path
from ml.preprocessing.preprocessing_config import (
    BATCH_SIZE,
    SEED,
    IMAGE_SIZE,
    INPUT_SHAPE,
    NUM_CLASSES,
    CLASS_NAMES,
    CLASS_TO_INDEX,
    PROJECT_ROOT,
    RESULTS_DIR,
)

# Output Paths
MODELS_DIR = PROJECT_ROOT / "models"
BEST_MODEL_PATH = MODELS_DIR / "grainvision_mobilenetv2_best.keras"
TRAINING_HISTORY_PATH = RESULTS_DIR / "training_history.json"
TRAINING_ACCURACY_PLOT_PATH = RESULTS_DIR / "training_accuracy.png"
TRAINING_LOSS_PLOT_PATH = RESULTS_DIR / "training_loss.png"
TRAINING_SUMMARY_PATH = RESULTS_DIR / "training_summary.txt"

# Balanced Representative Subset Settings (Quick CPU Training)
TRAIN_SAMPLES_PER_CLASS = 120   # Total 600 training images (120 x 5 classes)
VAL_SAMPLES_PER_CLASS = 20      # Total 100 validation images (20 x 5 classes)
SUBSET_SEED = 42

# Hyperparameters
MAX_EPOCHS = 3
INITIAL_LEARNING_RATE = 0.001
FREEZE_BACKBONE = True

# Callbacks Configuration
EARLY_STOPPING_MONITOR = "val_loss"
EARLY_STOPPING_PATIENCE = 1
EARLY_STOPPING_RESTORE_BEST_WEIGHTS = True

REDUCE_LR_MONITOR = "val_loss"
REDUCE_LR_FACTOR = 0.5
REDUCE_LR_PATIENCE = 1
REDUCE_LR_MIN_LR = 1e-6

CHECKPOINT_MONITOR = "val_loss"
CHECKPOINT_SAVE_BEST_ONLY = True
