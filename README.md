# GrainVision AI — Rice Grain Quality Classification Using Deep Learning

![Project Status](https://img.shields.io/badge/Status-Phase%207%20--%20Backend%20%26%20Prediction%20API-green)
![Python](https://img.shields.io/badge/Python-3.9%2B-green)
![Flask](https://img.shields.io/badge/Backend-Flask-black)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-cyan)
![TensorFlow](https://img.shields.io/badge/DL%20Framework-TensorFlow%2FKeras-orange)

> **Current Status: Phase 7 — Backend & Prediction API (COMPLETE)**  
> *Note: React Web Application development (Phase 8) takes place in the next phase.*

---

## 📌 Project Overview

**GrainVision AI** is a Deep Learning-based web application designed to automatically classify rice grain varieties and evaluate quality from digital images. Built as a comprehensive academic and portfolio application, the system combines lightweight Convolutional Neural Networks (CNNs) via Transfer Learning with an intuitive REST API and a modern web frontend.

---

## 🎯 Problem Statement

Manual classification of rice grain varieties is labor-intensive, time-consuming, and subject to subjective human error. Quality control in agricultural processing requires rapid, reproducible, and accurate variety identification to ensure market compliance, fair pricing, and automated sorting. Deep Learning visual inspection provides an accurate, automated solution to categorize grain types in real time.

---

## 🌾 Phase 2 — Dataset Preparation

The dataset pipeline is fully configured for the **Rice Image Dataset** (Koklu et al., 2021):

- **Target Classes (5 Categories)**: *Arborio, Basmati, Ipsala, Jasmine, Karacadag*.
- **Official Source**: [Kaggle — Rice Image Dataset](https://www.kaggle.com/datasets/muratkokludataset/rice-image-dataset) (75,000 images, 15,000 per class).
- **Directory Layout**:
  - `ml/dataset/raw/`: Raw image subfolders for the 5 classes.
  - `ml/dataset/processed/`: Reproducible 70% Train, 15% Validation, 15% Test splits.
  - `ml/dataset/metadata/`: CSV manifests, JSON summaries, and verification reports.
- **Validation & Duplicate Checking**: Automated file verification (`verify_dataset.py`) and MD5 cryptographic hashing (`check_duplicates.py`).
- **Reproducible Split**: Stratified sampling using fixed random seed `42`.

For complete download instructions and pipeline details, see [ml/dataset/README.md](file:///f:/grainvision-ai/ml/dataset/README.md).

---

## ⚙️ Phase 3 — Data Preprocessing

The preprocessing pipeline (`ml/preprocessing/`) builds modular TensorFlow/Keras `tf.data` input pipelines:

- **Image Geometry**: `224 × 224` pixels, 3 RGB channels (`IMAGE_SIZE = (224, 224)`).
- **Pixel Normalization**: Scaled from `[0, 255]` to `[0.0, 1.0]` (`Rescaling(1./255)`).
- **Batching & Performance**: Configurable `BATCH_SIZE = 32`, fixed `SEED = 42`, parallel loading with `AUTOTUNE` prefetching.
- **Training Data Augmentation**: Training-only transformations (Random Rotation ±5%, Horizontal Flip, Random Zoom ±10%, Random Translation ±5%). Validation and test sets remain unaugmented.
- **10-Point Verification**: Automated pipeline testing (`verify_preprocessing.py`) and visual comparison output (`visualize_preprocessing.py`).

For complete technical documentation, see [ml/preprocessing/README.md](file:///f:/grainvision-ai/ml/preprocessing/README.md).

---

## 🧠 Phase 4 — Deep Learning Model Architecture

The model module (`ml/model/`) defines the transfer learning architecture using MobileNetV2:

- **Backbone**: `MobileNetV2` pre-trained on ImageNet (`include_top=False`, `weights="imagenet"`).
- **Freezing Strategy**: Initial backbone frozen (`base_model.trainable = False`) to preserve pre-trained features.
- **Classification Head**: `GlobalAveragePooling2D` → `BatchNormalization` → `Dense(256, ReLU)` → `Dropout(0.3)` → `Dense(5, Softmax)`.
- **Compilation**: Compiled with `Adam` optimizer (`lr=0.001`), `sparse_categorical_crossentropy` loss, and `accuracy` metric.
- **10-Point Verification**: Architecture verified via `verify_model.py` with dummy and real Phase 3 batch forward passes. Summary exported to `results/model_summary.txt`.

For complete technical documentation, see [ml/model/README.md](file:///f:/grainvision-ai/ml/model/README.md).

---

## 🚀 Key Objectives

- **Automated Grain Classification**: Identify 5 prominent commercial rice varieties from uploaded grain images.
- **Deep Learning Accuracy**: Implement fine-tuned MobileNetV2 Transfer Learning for high classification precision with low computational overhead.
- **Confidence Metrics**: Provide real-time probability distribution across predicted categories.
- **Modern User Experience**: Deliver an intuitive dashboard featuring instant preview, responsive layouts, and interactive visual feedback.

---

## 🌾 Target Rice Classes (5 Categories)

1. **Arborio**: Short, plump Italian rice variety commonly used in risotto.
2. **Basmati**: Long, slender aromatic rice originating from the Indian subcontinent.
3. **Ipsala**: Medium-to-long grain rice grown extensively in Thrace, Turkey.
4. **Jasmine**: Long-grain aromatic variety native to Thailand.
5. **Karacadag**: Medium-grain local Turkish rice known for high water absorption.

---

## 🛠️ Planned Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons |
| **Backend API** | Python, Flask, Flask-CORS |
| **Deep Learning** | TensorFlow 2.x, Keras, OpenCV, NumPy, Scikit-learn, Pillow |
| **Deployment** | Gunicorn / Vite Build / REST API |

---

## 🧠 Planned Deep Learning Approach

- **Model Architecture**: **MobileNetV2** (Pre-trained on ImageNet with custom classification head).
- **Techniques**:
  - Image Resizing & Normalization (`224 x 224 x 3`)
  - Data Augmentation (Rotation, Zoom, Horizontal Flip, Brightness adjustments)
  - Softmax activation output layer over 5 classes
  - Cross-Entropy Loss & Adam Optimizer

---

## 🏗️ System Architecture Overview

```
┌─────────────────┐        HTTP / REST        ┌─────────────────┐
│  React Frontend │ ────────────────────────> │  Flask Backend  │
│    (Vite UI)    │ <──────────────────────── │    (Python)     │
└─────────────────┘      JSON Payload         └────────┬────────┘
                                                       │
                                            Passes Image Tensor
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │ Deep Learning   │
                                              │  MobileNetV2    │
                                              │ (Phase 4 Model) │
                                              └─────────────────┘
```

---

## 📁 Repository Directory Structure

```
grainvision-ai/
├── backend/                  # Flask REST API server
│   ├── routes/               # API route endpoints (health, future predict)
│   ├── services/             # Model loading & inference logic
│   ├── utils/                # Image preprocessing helpers
│   ├── app.py                # Server entry point
│   └── config.py             # Server configuration settings
│
├── frontend/                 # React + Vite + Tailwind CSS application
│   ├── public/               # Static web assets
│   ├── src/                  # React components & UI logic
│   ├── index.html            # Main HTML entry point
│   ├── package.json          # Node dependencies & build scripts
│   └── vite.config.js        # Vite bundler configuration
│
├── ml/                       # Machine Learning codebase
│   ├── dataset/              # Raw, processed splits, and metadata
│   │   ├── raw/              # Raw image folders (git-ignored)
│   │   ├── processed/        # 70/15/15 train/val/test splits (git-ignored)
│   │   ├── metadata/         # Summary JSON, CSV manifest, charts
│   │   └── README.md         # Dataset setup documentation
│   ├── preprocessing/        # Dataset verification, duplicate, split scripts
│   ├── training/             # Model training pipelines & callbacks
│   ├── evaluation/           # Evaluation metrics, confusion matrix, plots
│   └── notebooks/            # Exploratory analysis & experiments
│
├── models/                   # Saved model binaries (.h5, .keras)
├── results/                  # Plots, loss curves, confusion matrices
├── docs/                     # Architecture & technical documentation
├── .gitignore                # Git exclusions
├── requirements.txt          # Python dependencies
└── README.md                 # Project documentation
```

---

## ⚡ Quick Start & Development Setup

### 1. Dataset Preparation Setup

```bash
# Run verification script
python ml/preprocessing/verify_dataset.py

# Run duplicate checker
python ml/preprocessing/check_duplicates.py

# Perform 70/15/15 train/val/test split (Seed 42)
python ml/preprocessing/split_dataset.py

# Generate distribution reports & sample plots
python ml/preprocessing/generate_reports.py
python ml/preprocessing/visualize_samples.py
```

### 2. Backend Setup (Flask)

```bash
cd backend
python app.py
```

Backend will start at: `http://localhost:5000`  
Test Health API: `http://localhost:5000/api/health`

### 3. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at: `http://localhost:5173`

---

## 📌 Project Roadmap

- [x] **Phase 1: Project Foundation**
- [x] **Phase 2: Dataset Preparation**
- [x] **Phase 3: Data Preprocessing**
- [x] **Phase 4: Deep Learning Model Architecture**
- [x] **Phase 5: Model Training & Tuning**
- [x] **Phase 6: Model Evaluation & Metrics**
- [x] **Phase 7: Backend & Prediction API**
- [ ] **Phase 8: Frontend Web Application**
- [ ] **Phase 9: Integration & End-to-End Testing**
- [ ] **Phase 10: Deployment & Portfolio Presentation**

---

## 📄 License & Credits

Developed for academic research and portfolio demonstration.  
Academic Project — 20-Mark Deep Learning Curriculum.
