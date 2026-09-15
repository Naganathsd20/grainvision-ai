import os

class Config:
    PROJECT_NAME = "GrainVision AI"
    SUBTITLE = "Intelligent Rice Grain Classification Using Deep Learning"
    VERSION = "1.0.0"
    CURRENT_PHASE = "Phase 1 - Project Foundation"
    
    # Server settings
    HOST = os.environ.get("HOST", "0.0.0.0")
    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = os.environ.get("FLASK_DEBUG", "True").lower() in ("true", "1")
    
    # Target Rice Classes
    RICE_CLASSES = ["Arborio", "Basmati", "Ipsala", "Jasmine", "Karacadag"]
    
    # Model Configuration (For Phase 4+)
    MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "rice_mobilenetv2.h5")
    TARGET_IMAGE_SIZE = (224, 224)
