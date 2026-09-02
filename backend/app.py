import os
import sys
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from services.eligibility_engine import load_schemes
from rag.vector_store import index_schemes
from routes.schemes import schemes_bp
from routes.eligibility import eligibility_bp
from routes.chat import chat_bp
from routes.guidance import guidance_bp

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Initialize Vector Store Index
    schemes = load_schemes()
    print(f"[*] Loaded {len(schemes)} schemes from {Config.SCHEMES_FILE}")
    index_schemes(schemes)
    print("[*] Vector store initialized successfully.")
    
    # Register blueprints
    app.register_blueprint(schemes_bp, url_prefix='/api/schemes')
    app.register_blueprint(eligibility_bp, url_prefix='/api/check-eligibility')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')
    app.register_blueprint(guidance_bp, url_prefix='/api/application-guide')
    
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "SahayakAI Backend",
            "version": "1.0.0",
            "schemes_indexed": len(schemes),
            "gemini_active": bool(Config.GEMINI_API_KEY)
        })
        
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"status": "error", "message": "Resource not found"}), 404
        
    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"status": "error", "message": "Internal server error"}), 500
        
    return app

if __name__ == '__main__':
    app = create_app()
    port = Config.PORT
    print(f"[*] 🇮🇳 SahayakAI Backend starting on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)
