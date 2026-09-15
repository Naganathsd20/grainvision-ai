"""
GrainVision AI — Duplicate Image Detection Script
Phase 2: Dataset Preparation

This script calculates cryptographic hashes (MD5) for dataset images
to identify exact duplicate files across classes and split directories.
No data is deleted automatically; all findings are documented.
"""

import os
import sys
import hashlib
import json
from pathlib import Path

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}

def compute_file_hash(file_path, algorithm="md5", chunk_size=65536):
    """
    Computes hash digest for a given file.
    """
    hasher = hashlib.new(algorithm)
    with open(file_path, "rb") as f:
        while chunk := f.read(chunk_size):
            hasher.update(chunk)
    return hasher.hexdigest()

def check_duplicates(dataset_dir):
    """
    Scans a directory recursively and groups duplicate files by hash digest.
    """
    dataset_path = Path(dataset_dir)
    print(f"\n==================================================")
    print(f"GrainVision AI — Duplicate Detection Check")
    print(f"Target Directory: {dataset_path.resolve()}")
    print(f"==================================================\n")

    if not dataset_path.exists():
        print(f"[!] Warning: Directory '{dataset_dir}' does not exist.")
        return None

    hashes = {}
    total_files = 0
    duplicate_count = 0

    for file_path in dataset_path.rglob("*"):
        if file_path.is_file() and file_path.suffix.lower() in SUPPORTED_EXTENSIONS:
            total_files += 1
            file_hash = compute_file_hash(file_path)
            
            if file_hash in hashes:
                hashes[file_hash].append(str(file_path.resolve()))
                duplicate_count += 1
            else:
                hashes[file_hash] = [str(file_path.resolve())]

    # Filter hash groups to only keep duplicate sets
    duplicate_groups = {h: files for h, files in hashes.items() if len(files) > 1}

    print(f"--------------------------------------------------")
    print(f"DUPLICATE DETECTION SUMMARY")
    print(f"--------------------------------------------------")
    print(f"Total Images Hashed  : {total_files}")
    print(f"Unique Hashes        : {len(hashes)}")
    print(f"Duplicate Files      : {duplicate_count}")
    print(f"Duplicate Groups     : {len(duplicate_groups)}")
    print(f"Action Taken         : Documented (Original files preserved)")
    print(f"--------------------------------------------------\n")

    if duplicate_groups:
        print("[!] Duplicate groups detected:")
        for idx, (h, file_list) in enumerate(duplicate_groups.items(), 1):
            print(f"  Group {idx} (MD5: {h}):")
            for fpath in file_list:
                print(f"    - {fpath}")
            if idx >= 10:
                print(f"  ... and {len(duplicate_groups) - 10} more duplicate groups.")
                break
    else:
        print("[OK] No duplicate files found in dataset.")

    return {
        "total_files_scanned": total_files,
        "unique_files": len(hashes),
        "duplicate_count": duplicate_count,
        "duplicate_groups_count": len(duplicate_groups),
        "duplicate_groups": duplicate_groups,
    }

if __name__ == "__main__":
    project_root = Path(__file__).resolve().parents[2]
    raw_dir = project_root / "ml" / "dataset" / "raw"
    
    report = check_duplicates(raw_dir)
    
    if report:
        metadata_dir = project_root / "ml" / "dataset" / "metadata"
        metadata_dir.mkdir(parents=True, exist_ok=True)
        report_file = metadata_dir / "duplicates_report.json"
        
        with open(report_file, "w") as f:
            json.dump(report, f, indent=2)
        print(f"\n[OK] Duplicates report saved to: {report_file}")
