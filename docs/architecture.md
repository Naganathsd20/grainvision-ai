# System Architecture — GrainVision AI

## 1. System Overview

**GrainVision AI** employs a decoupled client-server architecture designed for high scalability, rapid inference, and smooth user interaction. The system separates UI rendering (React + Vite) from model inference and backend logic (Flask REST API).

---

## 2. End-to-End Data & Request Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USER STEP                                  │
│                 1. Uploads Rice Grain Image (JPG/PNG)                   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           REACT FRONTEND                                │
│   - Client-side validation (file type, size limits)                     │
│   - Interactive preview render                                          │
│   - Sends multipart/form-data request to POST /api/predict              │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                             HTTP / REST (JSON)
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            FLASK BACKEND                                │
│   - Receives raw image file                                             │
│   - Invokes OpenCV/Pillow preprocessing helper                          │
│   - Resizes image tensor to (224, 224, 3) & scales pixel range [0, 1]   │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                             Passes Tensor Input
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                   DEEP LEARNING MODEL (MobileNetV2)                     │
│                *(To be trained & loaded in Phase 4 & 7)*                │
│   - Feature extraction via pre-trained MobileNetV2 backbone             │
│   - Dense Classification head (Dropout, Dense, Softmax)                 │
│   - Computes probability vector across 5 classes                        │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                             Returns Probabilities
                                     │
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           PREDICTION OUTPUT                             │
│   - Top Predicted Class (e.g. "Basmati")                                │
│   - Confidence Score (e.g. 98.4%)                                       │
│   - Full Probability Distribution across all 5 classes                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Details

### A. Frontend Layer (React + Vite + Tailwind CSS)
- **Role**: Serves the single-page web application, manages client state, handles file uploads, renders classification results with dynamic charts and confidence meters.
- **Port**: `5173` (Development)

### B. Backend Layer (Flask API)
- **Role**: Exposes HTTP endpoints (`/api/health`, `/api/predict`), executes CORS header management, coordinates image preprocessing and model inference pipeline.
- **Port**: `5000` (Development)

### C. Machine Learning & Inference Layer (TensorFlow / Keras)
- **Architecture**: MobileNetV2 Transfer Learning model.
- **Status**: **To be implemented in Phase 4 (Model Architecture) & Phase 5 (Training)**.
- **Target Classes**:
  1. Arborio
  2. Basmati
  3. Ipsala
  4. Jasmine
  5. Karacadag

---

## 4. API Endpoints Specification

### `GET /api/health`
- **Description**: Verification endpoint for frontend-backend communication status.
- **Response**:
  ```json
  {
    "status": "ok",
    "project": "GrainVision AI",
    "version": "1.0.0",
    "phase": "Phase 1 - Foundation"
  }
  ```

### `POST /api/predict` *(Planned for Phase 7)*
- **Description**: Accepts image upload, processes tensor, returns classification prediction.
- **Request**: `multipart/form-data` with `file` field containing image bytes.
- **Planned Response**:
  ```json
  {
    "success": true,
    "prediction": {
      "class": "Basmati",
      "confidence": 0.9842,
      "probabilities": {
        "Arborio": 0.0021,
        "Basmati": 0.9842,
        "Ipsala": 0.0051,
        "Jasmine": 0.0063,
        "Karacadag": 0.0023
      }
    }
  }
  ```
