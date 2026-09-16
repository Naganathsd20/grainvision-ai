"""
GrainVision AI — Prediction Route Endpoint
Phase 7: Backend & Prediction API

Provides POST /api/predict endpoint accepting multipart/form-data image uploads,
validating inputs, performing preprocessing, executing model inference, and returning clean JSON.
"""

from flask import Blueprint, request, jsonify
from services.model_service import model_service
from utils.image_utils import allowed_file, preprocess_image
from config import Config

predict_bp = Blueprint("predict", __name__)


@predict_bp.route("/api/predict", methods=["POST"])
def predict():
    """
    POST /api/predict

    Expects multipart/form-data payload with file field name 'image'.

    Returns:
        JSON response containing predicted class, confidence, and probabilities per class.
    """
    # 1. Validate request content type and file parameter existence
    if "image" not in request.files:
        return jsonify({
            "success": False,
            "error": "No image file provided. Please send a multipart/form-data request with field name 'image'."
        }), 400

    file = request.files["image"]

    # 2. Validate non-empty filename
    if not file or file.filename.strip() == "":
        return jsonify({
            "success": False,
            "error": "No selected file for upload."
        }), 400

    # 3. Validate file extension format
    if not allowed_file(file.filename):
        allowed_list = ", ".join(sorted([ext.upper() for ext in Config.ALLOWED_EXTENSIONS]))
        return jsonify({
            "success": False,
            "error": f"Unsupported image format. Allowed formats: {allowed_list}."
        }), 415

    # 4. Preprocess image stream
    try:
        image_tensor = preprocess_image(file.stream)
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Invalid or corrupted image file: {str(e)}"
        }), 400

    # 5. Check if model service is loaded
    if not model_service.is_loaded:
        return jsonify({
            "success": False,
            "error": f"Model service unavailable: {model_service.load_error or 'Model not loaded'}"
        }), 500

    # 6. Execute model prediction
    try:
        prediction_result = model_service.predict(image_tensor)
        return jsonify({
            "success": True,
            "prediction": prediction_result["prediction"],
            "probabilities": prediction_result["probabilities"],
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Prediction inference failed: {str(e)}"
        }), 500
