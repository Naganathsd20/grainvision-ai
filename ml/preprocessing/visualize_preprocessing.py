"""
GrainVision AI — Preprocessed Data Visualizer
Phase 3: Data Preprocessing

Generates visual comparison grids illustrating original image, preprocessed image (224x224 RGB),
multiple training data augmentation variations, and unaugmented validation/test preprocessed samples.
Saves visual artifacts to `results/` and `ml/dataset/metadata/`.
"""

import os
import sys
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path
from PIL import Image, ImageDraw

# Ensure project root is in sys.path
PROJECT_ROOT = Path(__file__).resolve().parents[2]
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from ml.preprocessing.preprocessing_config import (
    CLASS_NAMES,
    IMAGE_SIZE,
    SEED,
    RESULTS_DIR,
    METADATA_DIR,
    PROCESSED_DATA_DIR
)
from ml.preprocessing.data_pipeline import (
    get_normalization_layer,
    get_augmentation_layer,
    preprocess_image
)
from ml.preprocessing.preprocessing_utils import (
    check_dataset_availability,
    create_synthetic_verification_dataset,
    cleanup_synthetic_dataset
)

def create_sample_grain_image():
    """
    Creates a single representative rice grain image for sample visualization.
    """
    img = Image.new("RGB", (300, 300), color=(25, 25, 25))
    draw = ImageDraw.Draw(img)
    
    # Draw realistic white/creamy rice grain oval
    draw.ellipse([100, 50, 200, 250], fill=(245, 240, 230), outline=(255, 255, 255))
    # Inner grain shadow/texture
    draw.ellipse([120, 80, 180, 220], fill=(235, 230, 215))
    
    return np.array(img)

def generate_preprocessing_visualization():
    """
    Generates and saves the Phase 3 preprocessing visualization grid.
    """
    print(f"\n==================================================")
    print(f"GrainVision AI — Preprocessing Visualizer")
    print(f"Phase 3: Data Preprocessing")
    print(f"==================================================\n")

    is_real_available, _ = check_dataset_availability(PROCESSED_DATA_DIR)
    
    sample_img_np = None
    sample_class = "Basmati"
    temp_dir = None

    if is_real_available:
        # Try finding a real image from processed/train/Basmati
        class_dir = PROCESSED_DATA_DIR / "train" / sample_class
        if class_dir.exists():
            img_files = list(class_dir.glob("*.png")) + list(class_dir.glob("*.jpg")) + list(class_dir.glob("*.jpeg"))
            if img_files:
                with Image.open(img_files[0]) as img:
                    sample_img_np = np.array(img.convert("RGB"))
                print(f"[+] Loaded real sample image: {img_files[0].name}")

    if sample_img_np is None:
        print("[!] Generating synthetic rice grain sample for visualization...")
        sample_img_np = create_sample_grain_image()

    # Apply preprocessing components
    norm_layer = get_normalization_layer()
    aug_layer = get_augmentation_layer(seed=SEED)

    # Convert to float32 tensor batch (1, H, W, C)
    input_tensor = np.expand_dims(sample_img_np.astype(np.float32), axis=0)

    # Resize to 224x224
    import tensorflow as tf
    resized_tensor = tf.image.resize(input_tensor, IMAGE_SIZE).numpy()

    # Normalize to [0.0, 1.0]
    normalized_tensor = norm_layer(resized_tensor).numpy()

    # Generate 3 augmented variations
    aug_var1 = aug_layer(normalized_tensor, training=True).numpy()[0]
    aug_var2 = aug_layer(normalized_tensor, training=True).numpy()[0]
    aug_var3 = aug_layer(normalized_tensor, training=True).numpy()[0]

    # Clip values to valid [0, 1] range for plotting
    norm_img = np.clip(normalized_tensor[0], 0.0, 1.0)
    aug_var1 = np.clip(aug_var1, 0.0, 1.0)
    aug_var2 = np.clip(aug_var2, 0.0, 1.0)
    aug_var3 = np.clip(aug_var3, 0.0, 1.0)

    # Set up matplotlib figure
    fig, axes = plt.subplots(2, 3, figsize=(14, 9))
    fig.suptitle(f"GrainVision AI — Phase 3 Preprocessing & Augmentation Demo\nClass: {sample_class}", fontsize=15, fontweight='bold')

    # Row 1: Original, Preprocessed, Training Aug 1
    axes[0, 0].imshow(sample_img_np)
    axes[0, 0].set_title(f"1. Original Raw Image\nShape: {sample_img_np.shape}", fontsize=11)
    axes[0, 0].axis('off')

    axes[0, 1].imshow(norm_img)
    axes[0, 1].set_title(f"2. Preprocessed & Normalized\nShape: {norm_img.shape}, Range: [0.0, 1.0]", fontsize=11)
    axes[0, 1].axis('off')

    axes[0, 2].imshow(aug_var1)
    axes[0, 2].set_title("3. Training Augmentation #1\n(Small Rotation & Flip)", fontsize=11)
    axes[0, 2].axis('off')

    # Row 2: Aug 2, Aug 3, Validation/Test (Unaugmented)
    axes[1, 0].imshow(aug_var2)
    axes[1, 0].set_title("4. Training Augmentation #2\n(Small Zoom & Shift)", fontsize=11)
    axes[1, 0].axis('off')

    axes[1, 1].imshow(aug_var3)
    axes[1, 1].set_title("5. Training Augmentation #3\n(Combined Transformation)", fontsize=11)
    axes[1, 1].axis('off')

    axes[1, 2].imshow(norm_img)
    axes[1, 2].set_title("6. Validation/Test Pipeline\n(Resized & Normalized, NO Augmentation)", fontsize=11)
    axes[1, 2].axis('off')

    plt.tight_layout()

    # Ensure output directories exist
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    METADATA_DIR.mkdir(parents=True, exist_ok=True)

    file_results = RESULTS_DIR / "preprocessing_visualization.png"
    file_metadata = METADATA_DIR / "preprocessing_visualization.png"

    plt.savefig(file_results, dpi=300, bbox_inches='tight')
    plt.savefig(file_metadata, dpi=300, bbox_inches='tight')
    plt.close()

    print(f"[+] Visualization saved to:")
    print(f"    - {file_results}")
    print(f"    - {file_metadata}\n")

    return file_results

if __name__ == "__main__":
    generate_preprocessing_visualization()
