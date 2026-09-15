"""
GrainVision AI — Sample Image Visualization Script
Phase 2: Dataset Preparation

This script generates a clean visual panel displaying sample images
from each of the 5 target rice classes (Arborio, Basmati, Ipsala, Jasmine, Karacadag).
Saves visualization plot to results/sample_grains.png and ml/dataset/metadata/sample_grains.png.
"""

import os
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt

REQUIRED_CLASSES = ["Arborio", "Basmati", "Ipsala", "Jasmine", "Karacadag"]
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}

def create_synthetic_placeholder(class_name, width=250, height=250):
    """
    Creates a clean placeholder grain image when real image files are not yet present.
    """
    img = Image.new("RGB", (width, height), color=(15, 23, 42))
    draw = ImageDraw.Draw(img)
    
    # Draw grain outline shape
    center_x, center_y = width // 2, height // 2
    if class_name in ["Basmati", "Jasmine"]:
        # Long slender grain
        draw.ellipse([center_x - 30, center_y - 80, center_x + 30, center_y + 80], fill=(220, 210, 190), outline=(245, 235, 215), width=2)
    elif class_name in ["Arborio"]:
        # Short plump grain
        draw.ellipse([center_x - 55, center_y - 65, center_x + 55, center_y + 65], fill=(235, 225, 205), outline=(255, 245, 225), width=2)
    else:
        # Medium grain (Ipsala, Karacadag)
        draw.ellipse([center_x - 45, center_y - 70, center_x + 45, center_y + 70], fill=(225, 215, 195), outline=(245, 235, 215), width=2)
        
    return img

def visualize_samples(dataset_dir, output_dirs):
    """
    Creates a 1x5 grid plot showing representative grain samples for all 5 classes.
    """
    dataset_path = Path(dataset_dir)
    print(f"\n==================================================")
    print(f"GrainVision AI — Sample Grain Visualization")
    print(f"Source Directory: {dataset_path.resolve()}")
    print(f"==================================================\n")

    fig, axes = plt.subplots(1, 5, figsize=(15, 3.5), facecolor='#080d1a')
    fig.suptitle('GrainVision AI — Target Rice Grain Categories (5 Classes)', color='white', fontsize=14, fontweight='bold', y=1.02)

    for idx, class_name in enumerate(REQUIRED_CLASSES):
        ax = axes[idx]
        ax.set_facecolor('#0f172a')
        
        sample_file = None
        class_dir = dataset_path / class_name
        
        if class_dir.exists():
            candidates = [
                f for f in class_dir.iterdir()
                if f.is_file() and f.suffix.lower() in SUPPORTED_EXTENSIONS and not f.name.startswith(".")
            ]
            if candidates:
                sample_file = sorted(candidates)[0]

        if sample_file and sample_file.exists():
            try:
                img = Image.open(sample_file).convert("RGB")
                ax.imshow(img)
                subtitle = f"Real Sample\n({img.width}x{img.height})"
            except Exception as e:
                print(f"[!] Warning: Failed to load {sample_file}: {e}")
                placeholder = create_synthetic_placeholder(class_name)
                ax.imshow(placeholder)
                subtitle = "Sample Placeholder"
        else:
            placeholder = create_synthetic_placeholder(class_name)
            ax.imshow(placeholder)
            subtitle = "Sample Placeholder"

        ax.set_title(f"{class_name}", color='#34d399', fontsize=12, fontweight='bold', pad=8)
        ax.set_xlabel(subtitle, color='#94a3b8', fontsize=9)
        ax.set_xticks([])
        ax.set_yticks([])

        for spine in ax.spines.values():
            spine.set_color('#1e293b')
            spine.set_linewidth(1.5)

    plt.tight_layout()

    # Save visualization image to output paths
    for out_dir in output_dirs:
        out_path = Path(out_dir)
        out_path.mkdir(parents=True, exist_ok=True)
        target_file = out_path / "sample_grains.png"
        plt.savefig(target_file, dpi=200, bbox_inches='tight', facecolor=fig.get_facecolor())
        print(f"[OK] Saved sample grain visualization to: {target_file}")

    plt.close()
    print("\nVisualization generation complete.\n")

if __name__ == "__main__":
    project_root = Path(__file__).resolve().parents[2]
    raw_directory = project_root / "ml" / "dataset" / "raw"
    
    out_directories = [
        project_root / "results",
        project_root / "ml" / "dataset" / "metadata"
    ]

    visualize_samples(raw_directory, out_directories)
