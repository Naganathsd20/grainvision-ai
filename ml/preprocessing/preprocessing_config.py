"""
GrainVision AI — Preprocessing Configuration
Phase 3: Data Preprocessing

Centralized configuration parameters for data loading, image preprocessing,
normalization, augmentation, class mapping, and reproducibility settings.
"""

from pathlib import Path

# Target Rice Classes (5 Categories)
CLASS_NAMES = [
    "Arborio",
    "Basmati",
    "Ipsala",
    "Jasmine",
    "Karacadag"
]

NUM_CLASSES = len(CLASS_NAMES)

# Canonical class name to numeric index mapping
CLASS_TO_INDEX = {name: idx for idx, name in enumerate(CLASS_NAMES)}
INDEX_TO_CLASS = {idx: name for idx, name in enumerate(CLASS_NAMES)}

# Image Geometry
IMAGE_HEIGHT = 224
IMAGE_WIDTH = 224
CHANNELS = 3
IMAGE_SIZE = (IMAGE_HEIGHT, IMAGE_WIDTH)
INPUT_SHAPE = (IMAGE_HEIGHT, IMAGE_WIDTH, CHANNELS)

# Pipeline Batching & Performance Settings
BATCH_SIZE = 32
SEED = 42

# Normalization Strategy
# Pixel values scaled from [0, 255] -> [0.0, 1.0]
NORMALIZATION_SCALE = 1.0 / 255.0

# Data Augmentation Hyperparameters (Training dataset only)
AUGMENTATION_CONFIG = {
    "rotation_factor": 0.05,       # Small rotation (~18 degrees max)
    "zoom_factor": 0.1,            # Small zoom in/out (±10%)
    "translation_factor": 0.05,    # Small vertical/horizontal shift (±5%)
    "brightness_factor": 0.1,      # Minor brightness adjustment (±10%)
    "horizontal_flip": True,       # Horizontal flip
    "fill_mode": "reflect"         # Edge fill mode for transformations
}

# Default Directory Paths
PROJECT_ROOT = Path(__file__).resolve().parents[2]
RAW_DATA_DIR = PROJECT_ROOT / "ml" / "dataset" / "raw"
PROCESSED_DATA_DIR = PROJECT_ROOT / "ml" / "dataset" / "processed"
METADATA_DIR = PROJECT_ROOT / "ml" / "dataset" / "metadata"
RESULTS_DIR = PROJECT_ROOT / "results"
