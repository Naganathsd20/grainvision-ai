from flask import Flask, jsonify
from flask_cors import CORS
import sys
import os

# Ensure backend directory is in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import Config
from routes.health import health_bp
from routes.predict import predict_bp
from services.model_service import model_service

def create_app():
    """
    Factory function to initialize and configure the Flask application.
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable Cross-Origin Resource Sharing (CORS) for local React frontend (localhost:5173)
    CORS(app, resources={r"/api/*": {"origins": Config.CORS_ORIGINS}})

    # Pre-load trained model into memory
    with app.app_context():
        model_service.load_model()

    # Register blueprints
    app.register_blueprint(health_bp)
    app.register_blueprint(predict_bp)

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "success": False,
            "error": getattr(error, "description", "Bad request payload")
        }), 400

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "success": False,
            "error": "API endpoint not found"
        }), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            "success": False,
            "error": "HTTP method not allowed for this endpoint"
        }), 405

    @app.errorhandler(413)
    def request_entity_too_large(error):
        return jsonify({
            "success": False,
            "error": "Uploaded image file size exceeds 10 MB limit"
        }), 413

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "success": False,
            "error": "Internal server error occurred"
        }), 500

    return app

app = create_app()

if __name__ == '__main__':
    print(f"Starting {Config.PROJECT_NAME} Backend Server...")
    print(f"Status: {Config.CURRENT_PHASE}")
    print(f"Model Path: {Config.MODEL_PATH}")
    print(f"Model Loaded: {model_service.is_loaded}")
    print(f"Listening on http://{Config.HOST}:{Config.PORT}")
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
