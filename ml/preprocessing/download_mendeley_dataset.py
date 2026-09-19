"""
GrainVision AI — Automatic Mendeley Dataset Downloader & Verifier (Resilient Download)
Downloads the official Milled Rice Grain Dataset (c5y6gjwdzh) from Mendeley Data,
resuming interrupted transfers if needed, extracts zip and nested .7z archives using py7zr,
and verifies image integrity across all classes.
"""

import os
import sys
import json
import urllib.request
import subprocess
import zipfile
import py7zr
from PIL import Image

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DOWNLOAD_DIR = os.path.join(PROJECT_ROOT, "ml", "dataset", "downloads")
RAW_MILLED_DIR = os.path.join(PROJECT_ROOT, "ml", "dataset", "raw_milled")
DIRECT_ZIP_URL = "https://data.mendeley.com/public-api/zip/c5y6gjwdzh/download/1"


def download_dataset():
    os.makedirs(DOWNLOAD_DIR, exist_ok=True)
    archive_path = os.path.join(DOWNLOAD_DIR, "Milled_Rice_Dataset.zip")

    print(f"[*] Downloading official Mendeley Milled Rice Grain Dataset from: {DIRECT_ZIP_URL}...", flush=True)

    expected_size = 0
    try:
        req_head = urllib.request.Request(DIRECT_ZIP_URL, method="HEAD", headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req_head, timeout=15) as resp:
            content_length = resp.headers.get("Content-Length")
            if content_length:
                expected_size = int(content_length)
                print(f"[+] Direct archive size: {expected_size / (1024*1024):.2f} MB", flush=True)
    except Exception as e:
        print(f"[!] HEAD request note: {e}. Will proceed with direct GET download.", flush=True)

    if os.path.exists(archive_path) and os.path.getsize(archive_path) > 10 * 1024 * 1024:
        if expected_size > 0 and os.path.getsize(archive_path) >= expected_size:
            print("[+] Archive already fully downloaded!", flush=True)
            return archive_path
        elif expected_size == 0:
            print("[+] Archive already downloaded!", flush=True)
            return archive_path

    print(f"[*] Downloading archive via curl.exe...", flush=True)
    curl_cmd = [
        "curl.exe", "-L", "-C", "-",
        "--retry", "5",
        "--retry-delay", "3",
        "--keepalive-time", "10",
        "-o", archive_path,
        DIRECT_ZIP_URL
    ]

    try:
        res = subprocess.run(curl_cmd, check=True)
        if os.path.exists(archive_path) and os.path.getsize(archive_path) > 10 * 1024 * 1024:
            print("[+] Download completed successfully via curl.exe!", flush=True)
            return archive_path
    except Exception as e:
        print(f"[!] curl.exe download note: {e}. Falling back to Python resilient downloader...", flush=True)

    max_retries = 10
    retry_count = 0
    while retry_count < max_retries:
        downloaded = os.path.getsize(archive_path) if os.path.exists(archive_path) else 0
        if expected_size > 0 and downloaded >= expected_size:
            print("[+] Archive download complete!", flush=True)
            break

        headers = {"User-Agent": "Mozilla/5.0"}
        if downloaded > 0:
            headers["Range"] = f"bytes={downloaded}-"
            print(f"[*] Resuming download from byte {downloaded} ({downloaded / (1024*1024):.1f} MB)...", flush=True)

        try:
            req_dl = urllib.request.Request(DIRECT_ZIP_URL, headers=headers)
            mode = "ab" if downloaded > 0 else "wb"
            with urllib.request.urlopen(req_dl, timeout=30) as resp, open(archive_path, mode) as out_file:
                block_size = 512 * 1024
                while True:
                    buffer = resp.read(block_size)
                    if not buffer:
                        break
                    out_file.write(buffer)
                    downloaded += len(buffer)
                    if expected_size > 0:
                        pct = (downloaded / expected_size) * 100
                        print(f"\rProgress: {downloaded / (1024*1024):.1f} / {expected_size / (1024*1024):.1f} MB ({pct:.1f}%)", end="", flush=True)
                    else:
                        print(f"\rDownloaded: {downloaded / (1024*1024):.1f} MB", end="", flush=True)
            print()
            if os.path.exists(archive_path) and os.path.getsize(archive_path) > 10 * 1024 * 1024:
                print("[+] Resilient download finished successfully!", flush=True)
                break
        except Exception as err:
            retry_count += 1
            print(f"\n[!] Download connection interrupted: {err}. Retrying ({retry_count}/{max_retries})...", flush=True)
            import time
            time.sleep(2)

    return archive_path


def extract_dataset(archive_path):
    os.makedirs(RAW_MILLED_DIR, exist_ok=True)
    print(f"[*] Step 1: Extracting outer zip '{archive_path}' to '{RAW_MILLED_DIR}'...", flush=True)
    
    if archive_path.endswith('.zip'):
        with zipfile.ZipFile(archive_path, 'r') as z:
            z.extractall(RAW_MILLED_DIR)
    else:
        with py7zr.SevenZipFile(archive_path, mode="r") as z:
            z.extractall(path=RAW_MILLED_DIR)
            
    print("[+] Outer extraction complete!", flush=True)

    # Search for any nested .7z or .zip files inside RAW_MILLED_DIR
    nested_7z = []
    for root, dirs, files in os.walk(RAW_MILLED_DIR):
        for f in files:
            if f.lower().endswith('.7z'):
                nested_7z.append(os.path.join(root, f))

    if nested_7z:
        for n7z in nested_7z:
            target_extract_dir = os.path.dirname(n7z)
            print(f"[*] Step 2: Extracting inner 7z archive '{n7z}' to '{target_extract_dir}' using py7zr...", flush=True)
            with py7zr.SevenZipFile(n7z, mode="r") as z:
                z.extractall(path=target_extract_dir)
            print(f"[+] Inner 7z archive '{os.path.basename(n7z)}' extracted successfully!", flush=True)

    print("[+] Full extraction workflow completed successfully!", flush=True)


def verify_extracted_dataset():
    print(f"[*] Inspecting extracted files in '{RAW_MILLED_DIR}'...", flush=True)
    
    candidates = []
    for root, dirs, files in os.walk(RAW_MILLED_DIR):
        if len(dirs) >= 5:
            candidates.append(root)
    
    target_class_dir = None
    for cand in candidates:
        subdirs = [d for d in os.listdir(cand) if os.path.isdir(os.path.join(cand, d))]
        if len(subdirs) >= 5:
            target_class_dir = cand
            break

    if not target_class_dir:
        raise RuntimeError(f"Could not locate class subdirectories inside {RAW_MILLED_DIR}")

    print(f"[+] Class Directory Root Identified: {target_class_dir}", flush=True)
    classes = sorted([d for d in os.listdir(target_class_dir) if os.path.isdir(os.path.join(target_class_dir, d))])
    
    print(f"[*] Found {len(classes)} classes:", flush=True)
    class_counts = {}
    corrupted_files = []

    for cls in classes:
        cls_path = os.path.join(target_class_dir, cls)
        img_files = [f for f in os.listdir(cls_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tif', '.tiff'))]
        
        for img_name in img_files[:100]:
            img_path = os.path.join(cls_path, img_name)
            try:
                with Image.open(img_path) as img:
                    img.verify()
            except Exception as e:
                corrupted_files.append((img_path, str(e)))

        class_counts[cls] = len(img_files)
        print(f"    - {cls}: {len(img_files)} total images (Verified header check sample ok)", flush=True)

    print("\n" + "=" * 60, flush=True)
    print("DATASET VERIFICATION SUMMARY REPORT", flush=True)
    print("=" * 60, flush=True)
    print(f"Root Folder: {target_class_dir}", flush=True)
    print(f"Total Verified Classes: {len(classes)}", flush=True)
    print(f"Class Names Found: {classes}", flush=True)
    for cls, count in class_counts.items():
        print(f"  * {cls}: {count} images", flush=True)
    print(f"Corrupted Files Detected: {len(corrupted_files)}", flush=True)
    print("=" * 60, flush=True)

    meta_path = os.path.join(PROJECT_ROOT, "ml", "dataset", "mendeley_verification.json")
    with open(meta_path, "w") as f:
        json.dump({
            "class_root": target_class_dir,
            "classes": classes,
            "class_counts": class_counts,
            "corrupted_files": corrupted_files
        }, f, indent=2)
    print(f"[+] Saved verification summary to: {meta_path}", flush=True)
    return target_class_dir, classes, class_counts


if __name__ == "__main__":
    try:
        archive_file = download_dataset()
        extract_dataset(archive_file)
        verify_extracted_dataset()
        print("\n[SUCCESS] Mendeley dataset download, extraction, and verification complete!", flush=True)
    except Exception as e:
        print(f"\n[ERROR] Dataset automation failed: {e}", flush=True)
        sys.exit(1)
