"""
GrainVision AI — Model Service Module
Phase 7: Backend & Prediction API

Singleton service for loading the pre-trained MobileNetV2 Keras model
once at application startup and performing real-time inference on input image tensors.
"""

import os
import sys
import numpy as np
import tensorflow as tf
from config import Config


class ModelService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelService, cls).__new__(cls)
            cls._instance.model = None
            cls._instance.is_loaded = False
            cls._instance.load_error = None
        return cls._instance

    def load_model(self, model_path=None):
        """
        Loads the trained Keras model artifact once into memory.
        """
        if self.is_loaded and self.model is not None:
            return True

        if model_path is None:
            model_path = Config.MODEL_PATH

        model_path = os.path.abspath(model_path)
        print(f"[*] ModelService loading model from: {model_path}...")

        if not os.path.exists(model_path):
            err_msg = f"Model artifact file not found at: {model_path}"
            print(f"[!] {err_msg}")
            self.load_error = err_msg
            self.is_loaded = False
            return False

        try:
            # Suppress verbose C++ logging during model load
            os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
            self.model = tf.keras.models.load_model(model_path)
            self.is_loaded = True
            self.load_error = None

            # Pre-warm model with a zero tensor pass
            dummy_input = np.zeros((1, 224, 224, 3), dtype=np.float32)
            _ = self.model(dummy_input, training=False)
            print("[OK] ModelService initialized and pre-warmed successfully!")
            return True
        except Exception as e:
            self.load_error = str(e)
            self.is_loaded = False
            print(f"[X] ModelService failed to load model: {e}")
            return False

    def predict(self, image_tensor):
        """
        Runs model inference on a preprocessed 4D image tensor (1, 224, 224, 3).

        Args:
            image_tensor (np.ndarray): Input image tensor of shape (1, 224, 224, 3).

        Returns:
            dict: Prediction result containing predicted class, confidence, and all class probabilities.
        """
        if not self.is_loaded or self.model is None:
            raise RuntimeError(f"Model is not loaded. Load error: {self.load_error}")

        # Run forward pass
        raw_probs = self.model(image_tensor, training=False).numpy()[0]

        # Extract top predicted class index and confidence score
        top_idx = int(np.argmax(raw_probs))
        top_class = Config.RICE_CLASSES[top_idx]
        confidence = float(raw_probs[top_idx])

        # Construct all 5 class probabilities dictionary
        probabilities = {
            cls_name: round(float(raw_probs[i]), 4)
            for i, cls_name in enumerate(Config.RICE_CLASSES)
        }

        return {
            "prediction": {
                "class": top_class,
                "confidence": round(confidence, 4),
            },
            "probabilities": probabilities,
        }


# Global singleton instance
model_service = ModelService()
