# GrainVision AI — Phase 5: Model Training

This directory contains configuration, scripts, and documentation for **Phase 5: Model Training** of the GrainVision AI project.

---

## Overview

The model training pipeline builds upon the preprocessed dataset (Phase 3) and model architecture (Phase 4) to train a transfer-learning classification model based on **MobileNetV2** pre-trained on ImageNet.

- **Dataset**: Real Rice Image Dataset (75,000 total images: 52,500 train, 11,250 val, 11,250 test)
- **Target Classes (5)**: `Arborio`, `Basmati`, `Ipsala`, `Jasmine`, `Karacadag`
- **Input Geometry**: 224 × 224 RGB normalized to [0.0, 1.0]
- **Base Architecture**: `MobileNetV2` (ImageNet pre-trained weights, classification top removed)
- **Custom Head**: `GlobalAveragePooling2D` → `BatchNormalization` → `Dense(256, ReLU)` → `Dropout(0.3)` → `Dense(5, Softmax)`

---

## Directory Structure

```text
ml/training/
├── README.md               # Phase 5 documentation (this file)
├── training_config.py      # Centralized training parameters & callback settings
└── train_model.py          # Sanity check, training execution & plotting script
```

---

## Training Strategy

Training is executed in two stages using standard Keras callbacks:

### 1. Stage 1 — Initial Transfer Learning
- **Backbone**: MobileNetV2 base is **frozen** (`trainable = False`).
- **Optimizer**: Adam (`learning_rate = 0.001`).
- **Loss Function**: `sparse_categorical_crossentropy`.
- **Metrics**: `accuracy`.
- **Max Epochs**: 10.
- **Callbacks**:
  - `EarlyStopping` (`monitor='val_loss'`, `patience=3`, `restore_best_weights=True`)
  - `ModelCheckpoint` (`filepath='models/grainvision_mobilenetv2_best.keras'`, `save_best_only=True`)
  - `ReduceLROnPlateau` (`monitor='val_loss'`, `factor=0.5`, `patience=2`, `min_lr=1e-6`)

### 2. Stage 2 — Fine-Tuning (Conditional)
- **Backbone**: Unfreezes top 30 layers of `MobileNetV2` backbone while keeping earlier feature extractors frozen.
- **Optimizer**: Adam (`learning_rate = 1e-5`).
- **Loss Function**: `sparse_categorical_crossentropy`.
- **Max Epochs**: 10.
- **Callbacks**: Same callback set monitoring `val_loss`.

---

## How to Run Training

From the project root (`f:\grainvision-ai`):

```bash
python -m ml.training.train_model
```

---

## Output Artifacts

Upon completion, training generates the following artifacts:

- **Trained Model**: `models/grainvision_mobilenetv2_best.keras`
- **Metrics JSON**: `results/training_history.json`
- **Summary Report**: `results/training_summary.txt`
- **Accuracy Plot**: `results/training_accuracy.png`
- **Loss Plot**: `results/training_loss.png`
