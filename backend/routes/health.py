from flask import Blueprint, jsonify
from config import Config
import time

health_bp = Blueprint('health', __name__)

@health_bp.route('/api/health', methods=['GET'])
def health_check():
    """
    Basic health and status endpoint for GrainVision AI backend.
    """
    return jsonify({
        "status": "ok",
        "project": Config.PROJECT_NAME,
        "subtitle": Config.SUBTITLE,
        "version": Config.VERSION,
        "phase": Config.CURRENT_PHASE,
        "classes": Config.RICE_CLASSES,
        "timestamp": int(time.time())
    }), 200
