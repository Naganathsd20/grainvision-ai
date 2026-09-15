"""
GrainVision AI — Dataset Splitting Script
Phase 2: Dataset Preparation

This script splits raw rice grain images into reproducible Train (70%),
Validation (15%), and Test (15%) sets using a fixed random seed (42).
Generates dataset manifests (CSV) and summary statistics (JSON).
"""

import os
import sys
import random
import shutil
import json
import csv
from pathlib import Path
from PIL import Image

# Fixed random seed for reproducibility
RANDOM_SEED = 42
TRAIN_RATIO = 0.70
VAL_RATIO = 0.15
TEST_RATIO = 0.15

REQUIRED_CLASSES = ["Arborio", "Basmati", "Ipsala", "Jasmine", "Karacadag"]
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}

def split_dataset(raw_dir, processed_dir, metadata_dir, seed=RANDOM_SEED):
    """
    Splits raw dataset images into train, validation, and test subsets.
    """
    raw_path = Path(raw_dir)
    processed_path = Path(processed_dir)
    metadata_path = Path(metadata_dir)

    print(f"\n==================================================")
    print(f"GrainVision AI — Reproducible Dataset Splitter")
    print(f"Random Seed      : {seed}")
    print(f"Split Ratios     : Train={TRAIN_RATIO*100:.0f}%, Val={VAL_RATIO*100:.0f}%, Test={TEST_RATIO*100:.0f}%")
    print(f"Raw Directory    : {raw_path.resolve()}")
    print(f"Output Directory : {processed_path.resolve()}")
    print(f"==================================================\n")

    random.seed(seed)

    # Check if raw directory exists and has class folders
    if not raw_path.exists():
        print(f"[!] Error: Raw directory '{raw_path}' does not exist.")
        return False

    all_images_by_class = {}
    total_images_found = 0

    for class_name in REQUIRED_CLASSES:
        class_dir = raw_path / class_name
        if not class_dir.exists():
            print(f"[!] Note: Raw class directory '{class_name}' not found.")
            all_images_by_class[class_name] = []
            continue

        valid_files = [
            f for f in class_dir.iterdir()
            if f.is_file() and f.suffix.lower() in SUPPORTED_EXTENSIONS and not f.name.startswith(".")
        ]
        all_images_by_class[class_name] = sorted(valid_files)
        total_images_found += len(valid_files)

    if total_images_found == 0:
        print(f"[!] Notice: No raw images found in '{raw_path}'.")
        print(f"    Please place raw image folders ('{', '.join(REQUIRED_CLASSES)}') inside '{raw_path}'.\n")
        return False

    print(f"Found {total_images_found:,} raw images across {len(REQUIRED_CLASSES)} classes.\n")

    # Create destination directories
    splits = ["train", "validation", "test"]
    for split in splits:
        for class_name in REQUIRED_CLASSES:
            (processed_path / split / class_name).mkdir(parents=True, exist_ok=True)

    metadata_path.mkdir(parents=True, exist_ok=True)
    csv_file_path = metadata_path / "dataset_metadata.csv"
    json_file_path = metadata_path / "dataset_summary.json"

    metadata_records = []
    summary = {
        "project": "GrainVision AI",
        "random_seed": seed,
        "split_ratio": {"train": TRAIN_RATIO, "validation": VAL_RATIO, "test": TEST_RATIO},
        "total_images": total_images_found,
        "classes": REQUIRED_CLASSES,
        "split_counts": {"train": 0, "validation": 0, "test": 0},
        "class_distribution": {cls: {"train": 0, "validation": 0, "test": 0, "total": 0} for cls in REQUIRED_CLASSES}
    }

    # Perform stratified splitting
    for class_name, file_list in all_images_by_class.items():
        if not file_list:
            continue

        # Shuffle deterministically using fixed seed
        shuffled = list(file_list)
        random.shuffle(shuffled)

        n_total = len(shuffled)
        n_train = int(n_total * TRAIN_RATIO)
        n_val = int(n_total * VAL_RATIO)
        # Remaining goes to test to guarantee exact total
        n_test = n_total - n_train - n_val

        train_files = shuffled[:n_train]
        val_files = shuffled[n_train:n_train + n_val]
        test_files = shuffled[n_train + n_val:]

        split_assignments = [
            ("train", train_files),
            ("validation", val_files),
            ("test", test_files),
        ]

        print(f"Splitting '{class_name}' ({n_total:,} images):")
        print(f"  - Train      : {len(train_files):,} images")
        print(f"  - Validation : {len(val_files):,} images")
        print(f"  - Test       : {len(test_files):,} images")

        for split_name, files in split_assignments:
            dest_dir = processed_path / split_name / class_name
            
            for file_path in files:
                dest_file = dest_dir / file_path.name
                
                # Copy file into target split directory
                shutil.copy2(file_path, dest_file)

                # Get image dimensions & format
                width, height, fmt = None, None, None
                try:
                    with Image.open(file_path) as img:
                        width, height = img.size
                        fmt = img.format
                except Exception:
                    pass

                file_size = file_path.stat().st_size

                # Record metadata entry
                metadata_records.append({
                    "filename": file_path.name,
                    "class": class_name,
                    "split": split_name,
                    "width": width,
                    "height": height,
                    "format": fmt or file_path.suffix.lstrip(".").upper(),
                    "file_size_bytes": file_size,
                    "source_path": str(file_path.resolve()),
                    "processed_path": str(dest_file.resolve()),
                })

                summary["split_counts"][split_name] += 1
                summary["class_distribution"][class_name][split_name] += 1
                summary["class_distribution"][class_name]["total"] += 1

    # Write CSV manifest
    fieldnames = ["filename", "class", "split", "width", "height", "format", "file_size_bytes", "source_path", "processed_path"]
    with open(csv_file_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(metadata_records)

    # Write JSON summary
    with open(json_file_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)

    print(f"\n--------------------------------------------------")
    print(f"DATASET SPLITTING COMPLETE")
    print(f"--------------------------------------------------")
    print(f"Total Processed Images : {len(metadata_records):,}")
    print(f"Train Set Count        : {summary['split_counts']['train']:,}")
    print(f"Validation Set Count   : {summary['split_counts']['validation']:,}")
    print(f"Test Set Count         : {summary['split_counts']['test']:,}")
    print(f"CSV Manifest           : {csv_file_path}")
    print(f"JSON Summary           : {json_file_path}")
    print(f"--------------------------------------------------\n")

    return True

if __name__ == "__main__":
    project_root = Path(__file__).resolve().parents[2]
    raw_directory = project_root / "ml" / "dataset" / "raw"
    processed_directory = project_root / "ml" / "dataset" / "processed"
    metadata_directory = project_root / "ml" / "dataset" / "metadata"

    split_dataset(raw_directory, processed_directory, metadata_directory, seed=RANDOM_SEED)
