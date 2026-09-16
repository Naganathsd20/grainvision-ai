# GrainVision AI — Backend & Prediction API

This directory contains the Flask REST API server, model prediction service, image preprocessing utilities, and configuration for **Phase 7: Backend & Prediction API** of GrainVision AI.

---

## Overview

The Flask backend loads the pre-trained **MobileNetV2** deep learning model (`models/grainvision_mobilenetv2_best.keras`) once into memory upon server startup and exposes RESTful API endpoints for system health verification and real-time rice grain quality classification.

- **Framework**: Flask 3.x with Flask-CORS
- **Server Address**: `http://localhost:5000` (or `http://127.0.0.1:5000`)
- **CORS Allowed Origins**: `http://localhost:5173` (React + Vite Frontend)
- **Supported Upload Formats**: `JPG`, `JPEG`, `PNG`, `WEBP` (10 MB maximum file size limit)
- **Target Rice Classes (5)**: `Arborio`, `Basmati`, `Ipsala`, `Jasmine`, `Karacadag`

---

## Directory Structure

```text
backend/
├── app.py                  # Main Flask application entry point & blueprint registration
├── config.py               # Server, model path, and CORS configuration
├── test_api.py             # Automated REST API endpoint test suite
├── README.md               # Backend technical documentation (this file)
├── routes/
│   ├── health.py           # GET /api/health status endpoint
│   └── predict.py          # POST /api/predict image prediction endpoint
├── services/
│   └── model_service.py    # Singleton model loader and inference engine
├── utils/
│   └── image_utils.py      # Image validation, RGB conversion, resizing & normalization
└── results/
    └── api_verification_report.json  # Automated API audit report
```

---

## API Endpoints Reference

### 1. Health Check Endpoint

- **Endpoint**: `GET /api/health`
- **Description**: Verifies backend server health, active phase status, and target class configuration.
- **Request Headers**: None
- **Response**: `HTTP 200 OK`

```json
{
  "status": "ok",
  "project": "GrainVision AI",
  "subtitle": "Intelligent Rice Grain Classification Using Deep Learning",
  "version": "1.0.0",
  "phase": "Phase 7 - Backend & Prediction API",
  "classes": ["Arborio", "Basmati", "Ipsala", "Jasmine", "Karacadag"],
  "timestamp": 1789566800
}
```

- **Example curl Request**:
```bash
curl -X GET http://localhost:5000/api/health
```

---

### 2. Rice Grain Prediction Endpoint

- **Endpoint**: `POST /api/predict`
- **Description**: Accepts an uploaded grain image file, preprocesses it to `(224, 224, 3)` RGB normalized to `[0.0, 1.0]`, performs model inference, and returns predicted class and confidence.
- **Request Content-Type**: `multipart/form-data`
- **Form Parameters**:
  - `image` (File): Image file (`.jpg`, `.jpeg`, `.png`, `.webp`)

- **Successful Response**: `HTTP 200 OK`

```json
{
  "success": true,
  "prediction": {
    "class": "Basmati",
    "confidence": 0.9432
  },
  "probabilities": {
    "Arborio": 0.0012,
    "Basmati": 0.9432,
    "Ipsala": 0.0031,
    "Jasmine": 0.0214,
    "Karacadag": 0.0311
  }
}
```

- **Example curl Request**:
```bash
curl -X POST http://localhost:5000/api/predict \
  -F "image=@/path/to/sample_rice_grain.jpg"
```

---

## Error Handling & Status Codes

All API endpoints return structured JSON error payloads without exposing raw stack traces:

- **Missing File** (`HTTP 400 Bad Request`):
```json
{
  "success": false,
  "error": "No image file provided. Please send a multipart/form-data request with field name 'image'."
}
```

- **Unsupported Format** (`HTTP 415 Unsupported Media Type`):
```json
{
  "success": false,
  "error": "Unsupported image format. Allowed formats: JPG, JPEG, PNG, WEBP."
}
```

- **Corrupted Image** (`HTTP 400 Bad Request`):
```json
{
  "success": false,
  "error": "Invalid or corrupted image file."
}
```

- **File Size Exceeded** (`HTTP 413 Request Entity Too Large`):
```json
{
  "success": false,
  "error": "Uploaded image file size exceeds 10 MB limit."
}
```

---

## How to Run & Test Backend

From the project root (`f:\grainvision-ai`):

```bash
# 1. Run automated API test suite
python backend/test_api.py

# 2. Start Flask development server
cd backend
python app.py
```
