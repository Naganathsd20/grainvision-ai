# GrainVision AI — Dataset Documentation & Setup Guide

> **Phase 2 — Dataset Preparation**

---

## 📌 1. Dataset Purpose & Overview

**GrainVision AI** requires a high-quality, balanced digital image dataset of 5 commercial rice varieties to train, validate, and evaluate the **MobileNetV2 Transfer Learning** Convolutional Neural Network (CNN) model.

The official dataset selected for this project is the **Rice Image Dataset** (Koklu et al., 2021), a benchmark agricultural computer vision dataset created by Murat Koklu at Selcuk University, Turkey.

---

## 🌾 2. Target Rice Classes (5 Categories)

The dataset contains digital images for 5 distinct rice varieties:

| Class Name | Variety Type | Origin / Characteristic |
|---|---|---|
| **Arborio** | Short / Plump | Italian risotto rice, high amylopectin content |
| **Basmati** | Long / Slender | Indian aromatic long-grain rice, lengthens during cooking |
| **Ipsala** | Medium / Long | Turkish long-grain variety, uniform kernel length |
| **Jasmine** | Long Aromatic | Thai fragrant rice, soft sticky texture |
| **Karacadag** | Medium Grain | Local Turkish variety, high water absorption capacity |

---

## 🔗 3. Official Dataset Source & License

- **Dataset Name**: Rice Image Dataset
- **Primary Source (Kaggle)**: [https://www.kaggle.com/datasets/muratkokludataset/rice-image-dataset](https://www.kaggle.com/datasets/muratkokludataset/rice-image-dataset)
- **Author**: Prof. Dr. Murat Koklu (Selcuk University)
- **License**: Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Total Images in Full Benchmark**: 75,000 images (15,000 images per class)
- **Image Resolution**: 250 x 250 pixels (RGB, PNG/JPG format)

---

## 📥 4. Step-by-Step Dataset Download & Setup Instructions

To set up the dataset locally on your machine:

### Step 1: Download Dataset Zip from Kaggle
1. Visit the official Kaggle dataset link:  
   👉 **[Rice Image Dataset on Kaggle](https://www.kaggle.com/datasets/muratkokludataset/rice-image-dataset)**
2. Click the **"Download"** button (Size: ~220 MB zip).

### Step 2: Extract Zip into `ml/dataset/raw/`
1. Extract the downloaded `Rice_Image_Dataset.zip` archive.
2. Inside the extracted folder, locate the 5 class subfolders:
   - `Arborio/`
   - `Basmati/`
   - `Ipsala/`
   - `Jasmine/`
   - `Karacadag/`
3. Place these 5 class folders directly inside `F:\grainvision-ai\ml\dataset\raw\`.

Target folder structure after extraction:
```text
F:\grainvision-ai\ml\dataset\raw\
├── Arborio/
├── Basmati/
├── Ipsala/
├── Jasmine/
└── Karacadag/
```

---

## 📁 5. Directory Structure Layout

```
ml/dataset/
├── raw/                      # Unmodified raw image folders by class
│   ├── Arborio/              # Raw Arborio grain images
│   ├── Basmati/              # Raw Basmati grain images
│   ├── Ipsala/               # Raw Ipsala grain images
│   ├── Jasmine/              # Raw Jasmine grain images
│   └── Karacadag/            # Raw Karacadag grain images
│
├── processed/                # Reproducibly split dataset (Seed 42)
│   ├── train/ (70%)          # 70% Training set per class
│   ├── validation/ (15%)     # 15% Validation set per class
│   └── test/ (15%)           # 15% Testing set per class
│
├── metadata/                 # Verification reports & dataset summary
│   ├── dataset_summary.json  # Verified statistics & split counts
│   ├── dataset_metadata.csv # File-level manifest (width, height, size, split)
│   ├── verification_report.json # Corrupt/empty file check report
│   ├── duplicates_report.json   # MD5 hash duplicate detection report
│   ├── class_distribution.png   # Class distribution bar chart
│   └── sample_grains.png        # Sample visualization grid
│
└── README.md                 # Dataset documentation (this file)
```

---

## 🛠️ 6. Automated Pipeline Scripts (`ml/preprocessing/`)

Run the following scripts from the project root directory (`F:\grainvision-ai`):

### 1. Verify Dataset Integrity
Scans image headers using Pillow to ensure no 0-byte or corrupted files exist:
```bash
python ml/preprocessing/verify_dataset.py
```

### 2. Detect Duplicate Files
Calculates MD5 cryptographic digests to identify duplicate files across classes:
```bash
python ml/preprocessing/check_duplicates.py
```

### 3. Perform Stratified Train / Validation / Test Split (70/15/15)
Splits raw images into `processed/train/`, `processed/validation/`, and `processed/test/` using fixed random seed **42**:
```bash
python ml/preprocessing/split_dataset.py
```

### 4. Generate Reports & Visualizations
Generates class distribution bar charts and sample grain image grids:
```bash
python ml/preprocessing/generate_reports.py
python ml/preprocessing/visualize_samples.py
```

---

## 🔒 7. Train / Validation / Test Split Specification

- **Seed**: `42` (Fixed for exact reproducibility across environments)
- **Ratio**:
  - **70% Training**: Used for MobileNetV2 feature extractor fine-tuning (Phase 5).
  - **15% Validation**: Used for hyperparameter tuning & loss convergence callbacks.
  - **15% Testing**: Held out strictly for final model evaluation & confusion matrix (Phase 6).
- **Leakage Prevention**: Every image is assigned to exactly one split. MD5 verification prevents duplicate images across splits.

---

## 🛡️ 8. Git Exclusions & Safety

To keep the GitHub repository lightweight and comply with platform file size limits:
- `ml/dataset/raw/*` is strictly ignored in `.gitignore`.
- `ml/dataset/processed/*` is strictly ignored in `.gitignore`.
- Only preprocessing scripts, metadata manifests (`.csv`, `.json`), report plots, and folder placeholders (`.gitkeep`) are tracked in Version Control.
