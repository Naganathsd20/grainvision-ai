"""
GrainVision AI — Dataset Reports & Class Distribution Chart Generator
Phase 2: Dataset Preparation

This script analyzes class distributions, generates dataset statistics summary JSON,
and produces a bar chart visualization saved to results/class_distribution.png.
"""

import os
import sys
import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

REQUIRED_CLASSES = ["Arborio", "Basmati", "Ipsala", "Jasmine", "Karacadag"]
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}

def generate_reports(raw_dir, metadata_dir, results_dir):
    """
    Computes class counts and creates class distribution bar chart plot.
    """
    raw_path = Path(raw_dir)
    metadata_path = Path(metadata_dir)
    results_path = Path(results_dir)

    print(f"\n==================================================")
    print(f"GrainVision AI — Class Distribution & Report Generator")
    print(f"Raw Directory    : {raw_path.resolve()}")
    print(f"Metadata Output  : {metadata_path.resolve()}")
    print(f"Results Output   : {results_path.resolve()}")
    print(f"==================================================\n")

    metadata_path.mkdir(parents=True, exist_ok=True)
    results_path.mkdir(parents=True, exist_ok=True)

    class_counts = {}
    total_images = 0

    for class_name in REQUIRED_CLASSES:
        class_dir = raw_path / class_name
        if class_dir.exists():
            count = len([
                f for f in class_dir.iterdir()
                if f.is_file() and f.suffix.lower() in SUPPORTED_EXTENSIONS and not f.name.startswith(".")
            ])
        else:
            count = 0
        class_counts[class_name] = count
        total_images += count

    print("Class Counts Found:")
    for cls, cnt in class_counts.items():
        print(f"  - {cls:<12}: {cnt:,} images")
    print(f"Total Raw Images: {total_images:,}\n")

    # Generate Matplotlib Bar Chart
    colors = ['#f59e0b', '#10b981', '#06b6d4', '#8b5cf6', '#f43f5e']
    
    fig, ax = plt.subplots(figsize=(8, 4.5), facecolor='#080d1a')
    ax.set_facecolor('#0f172a')

    bars = ax.bar(REQUIRED_CLASSES, [class_counts[cls] for cls in REQUIRED_CLASSES], color=colors, width=0.55, edgecolor='#1e293b', linewidth=1.5)

    ax.set_title("GrainVision AI — Class Distribution Across 5 Rice Varieties", color='white', fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel("Rice Variety Category", color='#94a3b8', fontsize=10, labelpad=8)
    ax.set_ylabel("Number of Images", color='#94a3b8', fontsize=10, labelpad=8)

    ax.tick_params(colors='#94a3b8', labelsize=9)
    ax.grid(axis='y', linestyle='--', alpha=0.2, color='#94a3b8')

    for spine in ax.spines.values():
        spine.set_color('#1e293b')

    # Add numeric label annotations above bars
    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{height:,}',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 4),  # 4 points vertical offset
                    textcoords="offset points",
                    ha='center', va='bottom',
                    color='white', fontsize=9, fontweight='bold')

    plt.tight_layout()

    # Save distribution plot
    chart_file_1 = results_path / "class_distribution.png"
    chart_file_2 = metadata_path / "class_distribution.png"
    
    plt.savefig(chart_file_1, dpi=200, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.savefig(chart_file_2, dpi=200, bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()

    print(f"[OK] Class distribution chart saved to: {chart_file_1}")
    print(f"[OK] Class distribution chart saved to: {chart_file_2}")

    # Generate Summary JSON if not already produced by splitter
    summary_file = metadata_path / "dataset_summary.json"
    if not summary_file.exists():
        summary_data = {
            "project": "GrainVision AI",
            "subtitle": "Intelligent Rice Grain Classification Using Deep Learning",
            "phase": "Phase 2 - Dataset Preparation",
            "classes": REQUIRED_CLASSES,
            "total_raw_images": total_images,
            "raw_class_counts": class_counts
        }
        with open(summary_file, "w") as f:
            json.dump(summary_data, f, indent=2)
        print(f"[OK] Dataset summary JSON written to: {summary_file}")

    print(f"\nReport generation complete.\n")

if __name__ == "__main__":
    project_root = Path(__file__).resolve().parents[2]
    raw_directory = project_root / "ml" / "dataset" / "raw"
    metadata_directory = project_root / "ml" / "dataset" / "metadata"
    results_directory = project_root / "ml" / "dataset" / "metadata" # or results/

    generate_reports(raw_directory, metadata_directory, project_root / "results")
