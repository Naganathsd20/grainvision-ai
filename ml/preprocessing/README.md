# GrainVision AI — Data Preprocessing Pipeline (Phase 3)

## 📌 Phase 3 Overview

Phase 3 implements the **Data Preprocessing Pipeline** for the GrainVision AI rice grain quality classification project. This pipeline prepares rice grain images to be consumed by TensorFlow/Keras deep learning model architectures in Phase 4 and 5.

---

## ⚙️ Key Technical Specifications

| Parameter | Value / Implementation |
|---|---|
| **Target Image Size** | `224 × 224` pixels |
| **Color Channels** | `3` (RGB) |
| **Pixel Normalization** | `0.0` – `1.0` scaling (`tf.keras.layers.Rescaling(1./255)`) |
| **Default Batch Size** | `32` (Configurable via `BATCH_SIZE`) |
| **Random Seed** | `42` (`SEED = 42`) |
| **Target Classes (5)** | *Arborio, Basmati, Ipsala, Jasmine, Karacadag* |
| **Class Index Mapping** | `0`: Arborio, `1`: Basmati, `2`: Ipsala, `3`: Jasmine, `4`: Karacadag |

---

## 🔄 Data Pipeline Architecture

The preprocessing pipeline is built using high-performance TensorFlow `tf.data.Dataset` pipelines:

```
                          ┌───────────────────────────┐
                          │   Raw Image File Directory │
                          └─────────────┬─────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │   tf.keras.utils          │
                          │   image_dataset_from_dir  │
                          └─────────────┬─────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │   RGB Resizing (224x224)  │
                          └─────────────┬─────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │   Pixel Normalization     │
                          │   [0 - 255] ──> [0.0 - 1.0] │
                          └─────────────┬─────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 │                                             │
                 ▼ (Train Set ONLY)                            ▼ (Val & Test Sets)
   ┌───────────────────────────┐                 ┌───────────────────────────┐
   │ Training Data Augmentation│                 │  NO Data Augmentation     │
   │ - Random Flip (Horizontal)│                 │  (Raw Normalized Tensors) │
   │ - Random Rotation (±5%)   │                 └─────────────┬─────────────┘
   │ - Random Zoom (±10%)      │                               │
   │ - Random Translation (±5%)│                               │
   └─────────────┬─────────────┘                               │
                 │                                             │
                 └──────────────────────┬──────────────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │ Batching (32) &           │
                          │ Prefetching (AUTOTUNE)    │
                          └───────────────────────────┘
```

---

## 🛡️ Training vs. Validation & Test Pipeline Rules

- **Training Pipeline (`create_training_dataset`)**:
  - Resizes images to `224 × 224 × 3`.
  - Normalizes pixel values to `[0.0, 1.0]`.
  - Applies **training data augmentation** (small rotation, horizontal flip, small zoom, translation).
  - Shuffles dataset using random seed `42`.
  - Batches samples into batches of `32`.
  - Applies `AUTOTUNE` prefetching for parallel I/O.

- **Validation Pipeline (`create_validation_dataset`)**:
  - Resizes images to `224 × 224 × 3`.
  - Normalizes pixel values to `[0.0, 1.0]`.
  - **NO data augmentation**.
  - **NO random transformations**.
  - Batches samples into batches of `32`.
  - Applies `AUTOTUNE` prefetching.

- **Test Pipeline (`create_test_dataset`)**:
  - Resizes images to `224 × 224 × 3`.
  - Normalizes pixel values to `[0.0, 1.0]`.
  - **NO data augmentation**.
  - **NO random transformations**.
  - Batches samples into batches of `32`.
  - Applies `AUTOTUNE` prefetching.

---

## 🚀 Performance Optimizations

To handle the 75,000 image dataset efficiently without disk duplication:
- **On-the-Fly Processing**: Images are loaded, resized, normalized, and augmented during batch loading rather than saved as redundant augmented images on disk.
- **Prefetching (`tf.data.AUTOTUNE`)**: Overlaps data preprocessing and model execution to eliminate I/O bottlenecks.
- **Parallel Loading (`num_parallel_calls=tf.data.AUTOTUNE`)**: Parallelizes element transformation mapping.

---

## 📂 Module Files Structure

```
ml/preprocessing/
├── preprocessing_config.py     # Centralized hyperparameters & class mappings
├── data_pipeline.py            # TensorFlow tf.data pipelines (train, val, test)
├── preprocessing_utils.py      # Preprocessing inspection & synthetic data helpers
├── verify_preprocessing.py     # 10-point automated verification script
├── visualize_preprocessing.py  # Generates side-by-side augmentation plots
└── README.md                   # Documentation for Phase 3
```

---

## 🧪 Running Verification & Visualizations

### 1. Execute 10-Point Pipeline Verification
```bash
python ml/preprocessing/verify_preprocessing.py
```

### 2. Generate Augmentation Visualizations
```bash
python ml/preprocessing/visualize_preprocessing.py
```

---

## 📊 Expected Verification Output

```text
==================================================
GrainVision AI — Preprocessing Verification Suite
Phase 3: Data Preprocessing
==================================================

--------------------------------------------------
VERIFICATION REPORT — PHASE 3 PREPROCESSING
--------------------------------------------------
Data Source Mode        : SYNTHETIC_TEST (or REAL)
Target Image Size       : 224 x 224
Color Channels          : 3 (RGB)
Batch Size              : 32
Number of Classes       : 5
Class Mapping           : {'Arborio': 0, 'Basmati': 1, 'Ipsala': 2, 'Jasmine': 3, 'Karacadag': 4}
Pixel Normalization     : [0.0, 1.0] (Rescaling 1/255)
Training Augmentation   : Enabled (Rotation, Flip, Zoom, Translation)
Validation Augmentation : Disabled
Test Augmentation       : Disabled
--------------------------------------------------
  [OK] Five Classes Detected              : PASS
  [OK] Images Load Correctly              : PASS
  [OK] Image Size 224X224                 : PASS
  [OK] Rgb Channels 3                     : PASS
  [OK] Pixel Normalization 0 1            : PASS
  [OK] Training Augmentation Enabled      : PASS
  [OK] Validation Augmentation Disabled   : PASS
  [OK] Test Augmentation Disabled         : PASS
  [OK] Batch Size Configurable            : PASS
  [OK] Valid Labels 0 To 4                : PASS
--------------------------------------------------
Passed Checks           : 10 / 10
Pipeline Status         : PASS
--------------------------------------------------
```
