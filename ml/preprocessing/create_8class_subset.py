"""
GrainVision AI — Stratified 8-Class Dataset Subset Creator
Extracts a balanced, reproducible subset of 1,000 images per class (8,000 total)
from the extracted Mendeley Milled Rice Grain Dataset using random seed 42.

Split ratio per class (1,000 images total):
  - 700 Training (70%)
  - 150 Validation (15%)
  - 150 Testing (15%)
Total across 8 classes: 5,600 Train / 1,200 Validation / 1,200 Test = 8,000 Total.
"""

import os
import sys
import json
import random
import shutil

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
VERIFICATION_JSON = os.path.join(PROJECT_ROOT, "ml", "dataset", "mendeley_verification.json")
PROCESSED_8CLASS_DIR = os.path.join(PROJECT_ROOT, "ml", "dataset", "processed_8class")

SEED = 42
TARGET_PER_CLASS = 1000
TRAIN_COUNT = 700
VAL_COUNT = 150
TEST_COUNT = 150


def create_subset():
    if not os.path.exists(VERIFICATION_JSON):
        raise RuntimeError("Verification JSON not found. Please run download_mendeley_dataset.py first!")

    with open(VERIFICATION_JSON, "r") as f:
        meta = json.load(f)

    class_root = meta["class_root"]
    classes = meta["classes"]
    print(f"[*] Found {len(classes)} classes in dataset root: {classes}")

    random.seed(SEED)
    
    # Prepare destination directories
    for split in ["train", "validation", "test"]:
        for cls in classes:
            os.makedirs(os.path.join(PROCESSED_8CLASS_DIR, split, cls), exist_ok=True)

    summary = {"seed": SEED, "total_images": 0, "classes": {}}

    for cls in classes:
        cls_dir = os.path.join(class_root, cls)
        all_images = sorted([
            f for f in os.listdir(cls_dir)
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp'))
        ])

        if len(all_images) < TARGET_PER_CLASS:
            print(f"[!] Warning: Class '{cls}' has only {len(all_images)} images (< {TARGET_PER_CLASS}). Using all available.")
            selected_images = list(all_images)
            random.shuffle(selected_images)
            n = len(selected_images)
            train_num = int(n * 0.70)
            val_num = int(n * 0.15)
            test_num = n - train_num - val_num
        else:
            selected_images = random.sample(all_images, TARGET_PER_CLASS)
            train_num = TRAIN_COUNT
            val_num = VAL_COUNT
            test_num = TEST_COUNT

        train_imgs = selected_images[:train_num]
        val_imgs = selected_images[train_num:train_num + val_num]
        test_imgs = selected_images[train_num + val_num:train_num + val_num + test_num]

        # Copy images to target directories
        for img in train_imgs:
            shutil.copy2(os.path.join(cls_dir, img), os.path.join(PROCESSED_8CLASS_DIR, "train", cls, img))
        for img in val_imgs:
            shutil.copy2(os.path.join(cls_dir, img), os.path.join(PROCESSED_8CLASS_DIR, "validation", cls, img))
        for img in test_imgs:
            shutil.copy2(os.path.join(cls_dir, img), os.path.join(PROCESSED_8CLASS_DIR, "test", cls, img))

        class_tot = len(train_imgs) + len(val_imgs) + len(test_imgs)
        summary["classes"][cls] = {
            "train": len(train_imgs),
            "validation": len(val_imgs),
            "test": len(test_imgs),
            "total": class_tot
        }
        summary["total_images"] += class_tot
        print(f"  [+] {cls}: Train={len(train_imgs)}, Val={len(val_imgs)}, Test={len(test_imgs)} (Total: {class_tot})")

    manifest_path = os.path.join(PROJECT_ROOT, "ml", "dataset", "dataset_8class_summary.json")
    with open(manifest_path, "w") as f:
        json.dump(summary, f, indent=2)

    print("\n" + "=" * 60)
    print(f"STRATIFIED SUBSET CREATED SUCCESSFULLY (Seed={SEED})")
    print(f"Total Images Copied: {summary['total_images']}")
    print(f"Destination: {PROCESSED_8CLASS_DIR}")
    print(f"Manifest Saved: {manifest_path}")
    print("=" * 60)


if __name__ == "__main__":
    try:
        create_subset()
    except Exception as e:
        print(f"[ERROR] Failed to create subset: {e}")
        sys.exit(1)
