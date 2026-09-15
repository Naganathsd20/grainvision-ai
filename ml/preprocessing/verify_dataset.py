"""
GrainVision AI — Dataset Verification Script
Phase 2: Dataset Preparation

This script scans raw and processed image datasets to verify file integrity,
format compatibility, image dimensions, corrupt files, and class distribution.
"""

import os
import sys
import json
from pathlib import Path
from PIL import Image

# Required rice classes for GrainVision AI
REQUIRED_CLASSES = ["Arborio", "Basmati", "Ipsala", "Jasmine", "Karacadag"]
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}

def verify_dataset(dataset_dir):
    """
    Scans a dataset directory and validates image files.
    """
    dataset_path = Path(dataset_dir)
    print(f"\n==================================================")
    print(f"GrainVision AI — Dataset Verification")
    print(f"Target Directory: {dataset_path.resolve()}")
    print(f"==================================================\n")

    if not dataset_path.exists():
        print(f"[!] Warning: Directory '{dataset_dir}' does not exist.")
        return None

    stats = {
        "dataset_path": str(dataset_path.resolve()),
        "total_images": 0,
        "valid_images": 0,
        "invalid_corrupt_images": 0,
        "empty_files": 0,
        "classes_found": [],
        "images_per_class": {},
        "corrupt_files_list": [],
        "image_dimensions": {}
    }

    # Check for class subdirectories
    found_subdirs = [d.name for d in dataset_path.iterdir() if d.is_dir() and not d.name.startswith('.')]
    
    if not found_subdirs:
        print(f"[!] Note: No class subdirectories found in '{dataset_dir}'.")
        print(f"    Expected class folders: {', '.join(REQUIRED_CLASSES)}")
        print(f"    Please place class folders inside '{dataset_dir}'.\n")
        return stats

    stats["classes_found"] = found_subdirs

    for class_name in REQUIRED_CLASSES:
        class_dir = dataset_path / class_name
        if not class_dir.exists():
            print(f"[!] Missing class folder: '{class_name}'")
            stats["images_per_class"][class_name] = 0
            continue

        valid_count = 0
        corrupt_count = 0
        
        for file_path in class_dir.rglob("*"):
            if file_path.is_file() and not file_path.name.startswith("."):
                ext = file_path.suffix.lower()
                if ext not in SUPPORTED_EXTENSIONS:
                    continue

                stats["total_images"] += 1

                # Check empty file
                if file_path.stat().st_size == 0:
                    stats["empty_files"] += 1
                    stats["invalid_corrupt_images"] += 1
                    stats["corrupt_files_list"].append(str(file_path))
                    continue

                # Verify image opening with Pillow
                try:
                    with Image.open(file_path) as img:
                        img.verify()  # Verify image header and integrity
                    
                    # Re-open to get dimensions (verify() closes image)
                    with Image.open(file_path) as img:
                        size_key = f"{img.width}x{img.height}"
                        stats["image_dimensions"][size_key] = stats["image_dimensions"].get(size_key, 0) + 1
                    
                    valid_count += 1
                    stats["valid_images"] += 1
                except Exception as err:
                    print(f"  [X] Corrupt image detected: {file_path.name} ({err})")
                    corrupt_count += 1
                    stats["invalid_corrupt_images"] += 1
                    stats["corrupt_files_list"].append(str(file_path))

        stats["images_per_class"][class_name] = valid_count

    # Print Verification Summary Report
    print(f"\n--------------------------------------------------")
    print(f"VERIFICATION SUMMARY REPORT")
    print(f"--------------------------------------------------")
    print(f"Total Images Scanned : {stats['total_images']}")
    print(f"Valid Images         : {stats['valid_images']}")
    print(f"Invalid / Corrupt    : {stats['invalid_corrupt_images']}")
    print(f"Empty Files (0-bytes): {stats['empty_files']}")
    print(f"\nImages Per Class:")
    for cls, count in stats["images_per_class"].items():
        print(f"  - {cls:<12}: {count:,} images")
    
    if stats["image_dimensions"]:
        print(f"\nImage Resolutions Found:")
        for res, count in stats["image_dimensions"].items():
            print(f"  - {res}: {count:,} images")

    print(f"--------------------------------------------------\n")

    return stats

if __name__ == "__main__":
    # Default to ml/dataset/raw
    project_root = Path(__file__).resolve().parents[2]
    raw_dir = project_root / "ml" / "dataset" / "raw"
    
    results = verify_dataset(raw_dir)
    
    # Save verification report
    if results:
        metadata_dir = project_root / "ml" / "dataset" / "metadata"
        metadata_dir.mkdir(parents=True, exist_ok=True)
        report_file = metadata_dir / "verification_report.json"
        
        with open(report_file, "w") as f:
            json.dump(results, f, indent=2)
        print(f"[OK] Verification report saved to: {report_file}")
