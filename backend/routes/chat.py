import datetime
from flask import Blueprint, jsonify, request
from rag.rag_service import ask_sahayak_rag

chat_bp = Blueprint('chat', __name__)

@chat_bp.route('', methods=['POST'])
def handle_chat():
    data = request.get_json() or {}
    message = data.get("message", "").strip()
    user_profile = data.get("user_profile")
    
    if not message:
        return jsonify({
            "status": "error",
            "message": "Query message cannot be empty."
        }), 400
        
    result = ask_sahayak_rag(message, user_profile=user_profile)
    
    return jsonify({
        "status": "success",
        "timestamp": datetime.datetime.now().isoformat(),
        "response": result["answer"],
        "source_mode": result["source_mode"],
        "citations": result["citations"]
    })
