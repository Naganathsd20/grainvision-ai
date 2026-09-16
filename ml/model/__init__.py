"""
GrainVision AI — Deep Learning Model Module
Phase 4: Deep Learning Model Architecture
"""

from ml.model.model_config import (
    MODEL_NAME,
    BASE_MODEL_NAME,
    PRETRAINED_WEIGHTS,
    INPUT_SHAPE,
    IMAGE_SIZE,
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
)
from ml.model.build_model import build_rice_classifier, get_model_summary_str

__all__ = [
    "MODEL_NAME",
    "BASE_MODEL_NAME",
    "PRETRAINED_WEIGHTS",
    "INPUT_SHAPE",
    "IMAGE_SIZE",
    "NUM_CLASSES",
    "CLASS_NAMES",
    "CLASS_TO_INDEX",
    "FREEZE_BACKBONE",
    "DENSE_UNITS",
    "DROPOUT_RATE",
    "LEARNING_RATE",
    "OPTIMIZER_NAME",
    "LOSS_FUNCTION",
    "METRICS",
    "build_rice_classifier",
    "get_model_summary_str",
]
