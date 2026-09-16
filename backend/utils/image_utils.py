"""
GrainVision AI — Image Utilities
Phase 7: Backend & Prediction API

Provides image file validation, format checking, RGB conversion,
resizing to (224, 224), and pixel normalization to [0.0, 1.0].
"""

import os
import io
from PIL import Image, ImageOps
import numpy as np
from config import Config


def allowed_file(filename):
    """
    Validates if uploaded filename has a supported extension.
    """
    if not filename or "." not in filename:
        return False
    ext = filename.rsplit(".", 1)[1].lower()
    return ext in Config.ALLOWED_EXTENSIONS


def preprocess_image(file_stream):
    """
    Preprocesses an uploaded image stream for model inference:
    1. Opens image safely with PIL
    2. Validates image header and format
    3. Handles EXIF auto-rotation
    4. Converts image to 3-channel RGB
    5. Resizes to (224, 224)
    6. Converts to float32 NumPy array
    7. Scales pixel values [0, 255] -> [0.0, 1.0]
    8. Expands batch dimension to (1, 224, 224, 3)

    Args:
        file_stream (FileStorage.stream or BytesIO): Image input stream.

    Returns:
        np.ndarray: Preprocessed 4D tensor with shape (1, 224, 224, 3).
    """
    # Load image with Pillow
    img = Image.open(file_stream)
    
    # Auto-rotate image according to EXIF data if present
    try:
        img = ImageOps.exif_transpose(img)
    except Exception:
        pass

    # Ensure 3-channel RGB mode (handles PNG RGBA/grayscale/palette)
    if img.mode != "RGB":
        img = img.convert("RGB")

    # Resize to model input dimensions (224, 224)
    img_resized = img.resize(Config.TARGET_IMAGE_SIZE, Image.Resampling.BILINEAR)

    # Convert to NumPy array
    img_array = np.array(img_resized, dtype=np.float32)

    # Normalize pixel values [0, 255] -> [0.0, 1.0]
    img_normalized = img_array * (1.0 / 255.0)

    # Add batch dimension -> (1, 224, 224, 3)
    img_batch = np.expand_dims(img_normalized, axis=0)

    return img_batch
