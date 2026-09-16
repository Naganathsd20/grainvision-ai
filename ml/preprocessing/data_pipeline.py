"""
GrainVision AI — Data Pipeline Module
Phase 3: Data Preprocessing

Provides TensorFlow / Keras data pipelines for loading, resizing (224x224 RGB),
pixel normalization (0-1), training-only data augmentation, and efficient batching/prefetching.
"""

import os
from pathlib import Path
import tensorflow as tf
from tensorflow.keras import layers

from ml.preprocessing.preprocessing_config import (
    CLASS_NAMES,
    CLASS_TO_INDEX,
    IMAGE_SIZE,
    BATCH_SIZE,
    SEED,
    NORMALIZATION_SCALE,
    AUGMENTATION_CONFIG,
    PROCESSED_DATA_DIR
)

def get_normalization_layer():
    """
    Returns a Rescaling layer that converts 0-255 pixel values to 0.0-1.0.
    """
    return layers.Rescaling(scale=NORMALIZATION_SCALE, name="pixel_normalization")

def get_augmentation_layer(seed=SEED):
    """
    Constructs a Keras Sequential layer for data augmentation on training images.
    Data augmentation is applied ONLY to training data.
    """
    augmentation_layers = [
        layers.RandomFlip(
            mode="horizontal",
            seed=seed,
            name="aug_horizontal_flip"
        ),
        layers.RandomRotation(
            factor=AUGMENTATION_CONFIG["rotation_factor"],
            fill_mode=AUGMENTATION_CONFIG["fill_mode"],
            seed=seed,
            name="aug_rotation"
        ),
        layers.RandomZoom(
            height_factor=AUGMENTATION_CONFIG["zoom_factor"],
            width_factor=AUGMENTATION_CONFIG["zoom_factor"],
            fill_mode=AUGMENTATION_CONFIG["fill_mode"],
            seed=seed,
            name="aug_zoom"
        ),
        layers.RandomTranslation(
            height_factor=AUGMENTATION_CONFIG["translation_factor"],
            width_factor=AUGMENTATION_CONFIG["translation_factor"],
            fill_mode=AUGMENTATION_CONFIG["fill_mode"],
            seed=seed,
            name="aug_translation"
        ),
    ]

    # Add RandomBrightness if available in TensorFlow version
    if hasattr(layers, "RandomBrightness"):
        augmentation_layers.append(
            layers.RandomBrightness(
                factor=AUGMENTATION_CONFIG["brightness_factor"],
                value_range=(0.0, 1.0),
                seed=seed,
                name="aug_brightness"
            )
        )

    return tf.keras.Sequential(augmentation_layers, name="training_data_augmentation")

def preprocess_image(image, label=None, apply_augmentation=False, seed=SEED):
    """
    Preprocesses a single image tensor or batch of tensors:
    - Ensures 3-channel RGB
    - Resizes to target IMAGE_SIZE (224x224)
    - Normalizes pixel values to [0.0, 1.0]
    - Optionally applies training augmentation
    """
    # Cast to float32
    image = tf.cast(image, tf.float32)

    # Resize if not already 224x224
    image = tf.image.resize(image, IMAGE_SIZE)

    # Normalize [0, 255] -> [0.0, 1.0]
    image = image * NORMALIZATION_SCALE

    if apply_augmentation:
        aug_layer = get_augmentation_layer(seed=seed)
        image = aug_layer(image, training=True)

    if label is not None:
        return image, label
    return image

def create_training_dataset(data_dir=None, batch_size=BATCH_SIZE, image_size=IMAGE_SIZE, seed=SEED, shuffle=True):
    """
    Creates the training tf.data.Dataset pipeline:
    - Loads training images
    - Resizes to (224, 224) RGB
    - Normalizes pixels to 0-1
    - Applies data augmentation
    - Batches data
    - Shuffles (seed=42)
    - Applies prefetching (AUTOTUNE)
    """
    if data_dir is None:
        data_dir = PROCESSED_DATA_DIR / "train"
    
    data_dir = Path(data_dir)

    raw_ds = tf.keras.utils.image_dataset_from_directory(
        directory=str(data_dir),
        labels="inferred",
        label_mode="int",
        class_names=CLASS_NAMES,
        color_mode="rgb",
        batch_size=batch_size,
        image_size=image_size,
        shuffle=shuffle,
        seed=seed
    )

    norm_layer = get_normalization_layer()
    aug_layer = get_augmentation_layer(seed=seed)

    # Map normalization & augmentation
    processed_ds = raw_ds.map(
        lambda x, y: (aug_layer(norm_layer(x), training=True), y),
        num_parallel_calls=tf.data.AUTOTUNE
    )

    return processed_ds.prefetch(buffer_size=tf.data.AUTOTUNE)

def create_validation_dataset(data_dir=None, batch_size=BATCH_SIZE, image_size=IMAGE_SIZE):
    """
    Creates the validation tf.data.Dataset pipeline:
    - Loads validation images
    - Resizes to (224, 224) RGB
    - Normalizes pixels to 0-1
    - Batches data
    - NO augmentation
    - Applies prefetching (AUTOTUNE)
    """
    if data_dir is None:
        data_dir = PROCESSED_DATA_DIR / "validation"

    data_dir = Path(data_dir)

    raw_ds = tf.keras.utils.image_dataset_from_directory(
        directory=str(data_dir),
        labels="inferred",
        label_mode="int",
        class_names=CLASS_NAMES,
        color_mode="rgb",
        batch_size=batch_size,
        image_size=image_size,
        shuffle=False
    )

    norm_layer = get_normalization_layer()

    processed_ds = raw_ds.map(
        lambda x, y: (norm_layer(x), y),
        num_parallel_calls=tf.data.AUTOTUNE
    )

    return processed_ds.prefetch(buffer_size=tf.data.AUTOTUNE)

def create_test_dataset(data_dir=None, batch_size=BATCH_SIZE, image_size=IMAGE_SIZE):
    """
    Creates the test tf.data.Dataset pipeline:
    - Loads test images
    - Resizes to (224, 224) RGB
    - Normalizes pixels to 0-1
    - Batches data
    - NO augmentation
    - Applies prefetching (AUTOTUNE)
    """
    if data_dir is None:
        data_dir = PROCESSED_DATA_DIR / "test"

    data_dir = Path(data_dir)

    raw_ds = tf.keras.utils.image_dataset_from_directory(
        directory=str(data_dir),
        labels="inferred",
        label_mode="int",
        class_names=CLASS_NAMES,
        color_mode="rgb",
        batch_size=batch_size,
        image_size=image_size,
        shuffle=False
    )

    norm_layer = get_normalization_layer()

    processed_ds = raw_ds.map(
        lambda x, y: (norm_layer(x), y),
        num_parallel_calls=tf.data.AUTOTUNE
    )

    return processed_ds.prefetch(buffer_size=tf.data.AUTOTUNE)

def get_class_names():
    """
    Returns the ordered list of target rice class names.
    """
    return list(CLASS_NAMES)

def get_class_mapping():
    """
    Returns the class-to-index mapping dictionary.
    """
    return dict(CLASS_TO_INDEX)
