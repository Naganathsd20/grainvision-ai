# GrainVision AI — Rice Grain Quality Classification Using Deep Learning

![Project Status](https://img.shields.io/badge/Status-Phase%201%20--%20Project%20Foundation-blue)
![Python](https://img.shields.io/badge/Python-3.9%2B-green)
![Flask](https://img.shields.io/badge/Backend-Flask-black)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-cyan)
![TensorFlow](https://img.shields.io/badge/DL%20Framework-TensorFlow%2FKeras-orange)

> **Current Status: Phase 1 — Project Foundation**  
> *Note: Model training and dataset processing will take place in subsequent phases (Phases 2–5).*

---

## 📌 Project Overview

**GrainVision AI** is a Deep Learning-based web application designed to automatically classify rice grain varieties and evaluate quality from digital images. Built as a comprehensive academic and portfolio application, the system combines lightweight Convolutional Neural Networks (CNNs) via Transfer Learning with an intuitive REST API and a modern web frontend.

---

## 🎯 Problem Statement

Manual classification of rice grain varieties is labor-intensive, time-consuming, and subject to subjective human error. Quality control in agricultural processing requires rapid, reproducible, and accurate variety identification to ensure market compliance, fair pricing, and automated sorting. Deep Learning visual inspection provides an accurate, automated solution to categorize grain types in real time.

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
│   ├── dataset/              # Raw & split dataset storage (git-ignored)
│   ├── preprocessing/        # Data pipelines & augmentation scripts
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

### 1. Backend Setup (Flask)

```bash
# Navigate to backend or root
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r ../requirements.txt

# Run Flask server
python app.py
```

Backend will start at: `http://localhost:5000`  
Test Health API: `http://localhost:5000/api/health`

### 2. Frontend Setup (React + Vite)

```bash
# Navigate to frontend
cd frontend

# Install Node dependencies
npm install

# Start development server
npm run dev
```

Frontend will start at: `http://localhost:5173`

---

## 📌 Project Roadmap

- [x] **Phase 1: Project Foundation** *(Current)*
- [ ] **Phase 2: Dataset Preparation**
- [ ] **Phase 3: Data Preprocessing**
- [ ] **Phase 4: Deep Learning Model Architecture**
- [ ] **Phase 5: Model Training & Tuning**
- [ ] **Phase 6: Model Evaluation & Metrics**
- [ ] **Phase 7: Backend & Prediction API**
- [ ] **Phase 8: Frontend Web Application**
- [ ] **Phase 9: Integration & End-to-End Testing**
- [ ] **Phase 10: Deployment & Portfolio Presentation**

---

## 📄 License & Credits

Developed for academic research and portfolio demonstration.  
Academic Project — 20-Mark Deep Learning Curriculum.
