# GrainVision AI — Deep Learning Model Architecture
## Phase 4: Model Architecture & Transfer Learning

This module defines the deep learning classification model architecture for **GrainVision AI**, designed to categorize 5 rice grain varieties (*Arborio, Basmati, Ipsala, Jasmine, Karacadag*) using **Transfer Learning** with **MobileNetV2**.

---

## 📌 Architecture Rationale: Why MobileNetV2?

1. **Lightweight & Efficient**: MobileNetV2 uses inverted residuals and depthwise separable convolutions, providing high classification accuracy with low parameter count (~2.25M base parameters).
2. **Web & API Friendly**: Small memory footprint and fast inference times (~10–30 ms per image), ideal for deployment in web APIs and real-time frontend applications.
3. **Pre-trained Knowledge**: Weights pre-trained on ImageNet (1.4 million images across 1,000 categories) offer rich feature extraction capabilities for low-level visual patterns (edges, textures, shapes) relevant to grain analysis.

---

## 🏗️ Transfer Learning Network Design

```
Input Tensor (224 × 224 × 3 RGB)
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│ MobileNetV2 Feature Extraction Base (Pre-trained)       │
│ - include_top = False                                   │
│ - weights = "imagenet"                                  │
│ - trainable = False (Frozen for Stage 1 Training)       │
└──────────────────────────┬──────────────────────────────┘
                           │ Feature maps (7 × 7 × 1280)
                           ▼
┌─────────────────────────────────────────────────────────┐
│ GlobalAveragePooling2D                                  │
│ - Reduces spatial dimensions to feature vector (1280)   │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ BatchNormalization                                      │
│ - Standardizes feature activations                       │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ Dense Classification Head                               │
│ - 256 units, ReLU activation                            │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ Dropout Regularization                                  │
│ - rate = 0.3 (30% drop probability)                     │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│ Dense Output Layer (Softmax)                            │
│ - 5 units (Arborio, Basmati, Ipsala, Jasmine, Karacadag)│
└─────────────────────────────────────────────────────────┘
```

---

## ⚙️ Hyperparameters & Configuration

| Parameter | Value | Rationale / Description |
|---|---|---|
| **Input Shape** | `(224, 224, 3)` | Compatible with standard ImageNet backbones and Phase 3 pipeline |
| **Base Backbone** | `MobileNetV2` | Pre-trained ImageNet weights |
| **Backbone Trainable** | `False` | Initial frozen feature extractor for transfer learning |
| **Intermediate Dense** | `256` units | Nonlinear feature abstraction |
| **Dropout Rate** | `0.3` | Prevents co-adaptation and overfitting |
| **Output Layer** | `5` units, `softmax` | Categorical probability distribution |
| **Loss Function** | `SparseCategoricalCrossentropy` | Matches Phase 3 integer class labels (`0..4`) |
| **Optimizer** | `Adam` (`lr=0.001`) | Fast convergence for transfer learning classification head |
| **Metric** | `accuracy` | Multiclass classification accuracy |

---

## 🏷️ Class Mapping Alignment

The model output layer indices map directly to the Phase 3 class mapping:

```python
{
    0: "Arborio",
    1: "Basmati",
    2: "Ipsala",
    3: "Jasmine",
    4: "Karacadag"
}
```

---

## 🧪 Architecture Verification

The standalone script [verify_model.py](file:///F:/grainvision-ai/ml/model/verify_model.py) verifies the model without training (`model.fit()`):

```bash
python ml/model/verify_model.py
```

### Verification Checks Performed:
1. **Model Construction**: Successfully builds Keras Functional API model.
2. **Input Dimensions**: Validates tensor shape `(None, 224, 224, 3)`.
3. **Output Dimensions**: Validates probability tensor shape `(None, 5)`.
4. **Softmax Output**: Verifies activation function and 5 units.
5. **Backbone Presence**: Confirms MobileNetV2 base model inclusion.
6. **Backbone Freezing**: Confirms `base_model.trainable == False`.
7. **Compilation**: Validates Adam optimizer, sparse categorical cross-entropy loss, and accuracy metric.
8. **Dummy Forward Pass**: Evaluates dummy tensor `(1, 224, 224, 3)` for non-null output summing to 1.0.
9. **Phase 3 Integration**: Executes forward pass on a real batch from `ml.preprocessing.data_pipeline`.
10. **Report Export**: Writes model parameter breakdown to [results/model_summary.txt](file:///F:/grainvision-ai/results/model_summary.txt).

---

## 📊 Parameters Overview

- **Total Parameters**: ~2,587,461
- **Trainable Parameters**: ~329,477 (Classification Head layers only)
- **Non-Trainable Parameters**: ~2,257,984 (Frozen MobileNetV2 Base)

---

## 🚀 Future Training Strategy (Phase 5 Preview)

- **Stage 1**: Train the classification head for 10–15 epochs while keeping MobileNetV2 frozen.
- **Stage 2 (Fine-tuning)**: Unfreeze top layers of MobileNetV2 (e.g., layers after block 100) and train with a reduced learning rate (`1e-5`) to specialize feature representations for rice grain textures.
