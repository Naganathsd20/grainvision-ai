import os

class Config:
    PROJECT_NAME = "GrainVision AI"
    SUBTITLE = "Intelligent Rice Grain Classification Using Deep Learning"
    VERSION = "1.0.0"
    CURRENT_PHASE = "Phase 7 - Backend & Prediction API"
    
    # Server settings
    HOST = os.environ.get("HOST", "0.0.0.0")
    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = os.environ.get("FLASK_DEBUG", "True").lower() in ("true", "1")
    
    # Target Rice Classes (5 Categories)
    RICE_CLASSES = ["Arborio", "Basmati", "Ipsala", "Jasmine", "Karacadag"]
    
    # Model Configuration
    PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    MODEL_PATH = os.path.join(PROJECT_ROOT, "models", "grainvision_mobilenetv2_best.keras")
    TARGET_IMAGE_SIZE = (224, 224)
    
    # Upload limits & security
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB maximum file size limit
    ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}
    
    # CORS Origins for local React frontend
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ]
