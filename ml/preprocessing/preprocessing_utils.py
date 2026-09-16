"""
GrainVision AI — Preprocessing Utility Functions
Phase 3: Data Preprocessing

Utility helpers for dataset inspection, batch shape/normalization diagnostics,
class mapping verification, and synthetic sample dataset generation for offline testing.
"""

import os
import shutil
import numpy as np
from pathlib import Path
from PIL import Image, ImageDraw

from ml.preprocessing.preprocessing_config import (
    CLASS_NAMES,
    NUM_CLASSES,
    IMAGE_SIZE,
    PROCESSED_DATA_DIR
)

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}

def check_dataset_availability(base_dir=None):
    """
    Checks if the dataset splits exist and contain valid images for all 5 classes.
    Returns:
        (is_available: bool, summary_dict: dict)
    """
    if base_dir is None:
        base_dir = PROCESSED_DATA_DIR

    base_dir = Path(base_dir)
    splits = ["train", "validation", "test"]
    summary = {
        "base_directory": str(base_dir.resolve()),
        "is_available": True,
        "splits": {}
    }

    total_images_all_splits = 0

    for split in splits:
        split_dir = base_dir / split
        split_summary = {"exists": split_dir.exists(), "classes": {}, "total_images": 0}
        
        if not split_dir.exists():
            summary["is_available"] = False
            summary["splits"][split] = split_summary
            continue

        for cls in CLASS_NAMES:
            cls_dir = split_dir / cls
            if not cls_dir.exists():
                split_summary["classes"][cls] = 0
                summary["is_available"] = False
                continue

            valid_images = [
                f for f in cls_dir.iterdir()
                if f.is_file() and f.suffix.lower() in SUPPORTED_EXTENSIONS and not f.name.startswith(".")
            ]
            count = len(valid_images)
            split_summary["classes"][cls] = count
            split_summary["total_images"] += count

        total_images_all_splits += split_summary["total_images"]
        if split_summary["total_images"] == 0:
            summary["is_available"] = False

        summary["splits"][split] = split_summary

    summary["total_images_all_splits"] = total_images_all_splits
    return summary["is_available"], summary

def create_synthetic_verification_dataset(target_dir, images_per_class=10):
    """
    Generates a small synthetic dataset of 224x224 RGB images with grain-like shapes
    for testing the TensorFlow data pipeline without requiring the 75k Kaggle download.
    """
    target_path = Path(target_dir)
    splits = ["train", "validation", "test"]
    
    # Class colors for synthetic visual distinction
    class_colors = {
        "Arborio": (220, 220, 210),
        "Basmati": (240, 235, 215),
        "Ipsala": (210, 225, 230),
        "Jasmine": (245, 240, 230),
        "Karacadag": (200, 210, 200)
    }

    counts = {"train": images_per_class, "validation": max(2, images_per_class // 3), "test": max(2, images_per_class // 3)}

    for split, num_imgs in counts.items():
        for cls_idx, cls_name in enumerate(CLASS_NAMES):
            cls_dir = target_path / split / cls_name
            cls_dir.mkdir(parents=True, exist_ok=True)
            
            base_color = class_colors.get(cls_name, (200, 200, 200))
            
            for i in range(num_imgs):
                # Create dark background image (224x224 RGB)
                img = Image.new("RGB", IMAGE_SIZE, color=(30, 30, 30))
                draw = ImageDraw.Draw(img)
                
                # Draw synthetic rice grain oval
                center_x, center_y = 112, 112
                radius_x = 25 + (i % 5) * 4
                radius_y = 65 + (i % 7) * 5
                
                bounding_box = [
                    center_x - radius_x,
                    center_y - radius_y,
                    center_x + radius_x,
                    center_y + radius_y
                ]
                
                draw.ellipse(bounding_box, fill=base_color, outline=(255, 255, 255))
                
                filename = f"synth_{cls_name.lower()}_{i+1:03d}.png"
                img.save(cls_dir / filename)

    return target_path

def cleanup_synthetic_dataset(target_dir):
    """
    Removes the synthetic verification dataset directory.
    """
    target_path = Path(target_dir)
    if target_path.exists():
        shutil.rmtree(target_path)

def inspect_dataset_batch(dataset, num_batches=1):
    """
    Inspects a batch from a tf.data.Dataset and extracts metrics:
    - Images batch shape
    - Labels batch shape
    - Pixel min and max values
    - Channels count
    - Unique label indices
    """
    stats = {
        "batches_inspected": 0,
        "image_batch_shape": None,
        "label_batch_shape": None,
        "min_pixel_value": None,
        "max_pixel_value": None,
        "channels": None,
        "unique_labels": []
    }

    for images, labels in dataset.take(num_batches):
        images_np = images.numpy()
        labels_np = labels.numpy()

        stats["batches_inspected"] += 1
        stats["image_batch_shape"] = tuple(images_np.shape)
        stats["label_batch_shape"] = tuple(labels_np.shape)
        stats["min_pixel_value"] = float(np.min(images_np))
        stats["max_pixel_value"] = float(np.max(images_np))
        stats["channels"] = images_np.shape[-1]
        stats["unique_labels"] = sorted([int(l) for l in np.unique(labels_np)])

    return stats
