from flask import Blueprint, jsonify, request
from services.eligibility_engine import load_schemes

schemes_bp = Blueprint('schemes', __name__)

@schemes_bp.route('', methods=['GET'])
def get_all_schemes():
    category = request.args.get('category')
    search = request.args.get('search', '').strip().lower()
    
    schemes = load_schemes()
    
    if category and category.lower() != 'all':
        schemes = [s for s in schemes if s.get('category', '').lower() == category.lower()]
        
    if search:
        schemes = [
            s for s in schemes
            if search in s.get('name', '').lower()
            or search in s.get('description', '').lower()
            or search in s.get('category', '').lower()
        ]
        
    return jsonify({
        "status": "success",
        "count": len(schemes),
        "schemes": schemes
    })

@schemes_bp.route('/<scheme_id>', methods=['GET'])
def get_scheme_by_id(scheme_id):
    schemes = load_schemes()
    match = next((s for s in schemes if s.get('id') == scheme_id), None)
    
    if not match:
        return jsonify({
            "status": "error",
            "message": f"Scheme with ID '{scheme_id}' not found."
        }), 404
        
    return jsonify({
        "status": "success",
        "scheme": match
    })
