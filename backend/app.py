from flask import Flask, jsonify
from flask_cors import CORS
import sys
import os

# Ensure backend directory is in sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config import Config
from routes.health import health_bp

def create_app():
    """
    Factory function to initialize and configure the Flask application.
    """
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable Cross-Origin Resource Sharing (CORS) for frontend interaction
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints
    app.register_blueprint(health_bp)

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "error": "Endpoint not found",
            "status": 404
        }), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "error": "Internal server error",
            "status": 500
        }), 500

    return app

app = create_app()

if __name__ == '__main__':
    print(f"Starting {Config.PROJECT_NAME} Backend API...")
    print(f"Status: {Config.CURRENT_PHASE}")
    print(f"Listening on http://{Config.HOST}:{Config.PORT}")
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
