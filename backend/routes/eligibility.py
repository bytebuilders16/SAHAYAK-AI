from flask import Blueprint, jsonify, request
from services.eligibility_engine import evaluate_eligibility, load_schemes

eligibility_bp = Blueprint('eligibility', __name__)

@eligibility_bp.route('', methods=['POST'])
def check_eligibility():
    data = request.get_json() or {}
    
    # Process profile with defaults
    user_profile = {
        "age": int(data.get("age", 25)),
        "state": str(data.get("state", "Uttar Pradesh")).strip(),
        "annual_income": float(data.get("annual_income", 250000)),
        "occupation": str(data.get("occupation", "Student")).strip(),
        "student_status": bool(data.get("student_status", False)),
        "category": str(data.get("category", "General")).strip(),
        "gender": str(data.get("gender", "All")).strip(),
        "residence": str(data.get("residence", "Urban")).strip(),
        "farmer_status": bool(data.get("farmer_status", False)),
        "healthcare_req": bool(data.get("healthcare_req", False)),
        "housing_req": bool(data.get("housing_req", False)),
        "education_req": bool(data.get("education_req", False))
    }
    
    results = evaluate_eligibility(user_profile)
    
    eligible_count = sum(1 for r in results if r["status"] == "Eligible")
    possible_count = sum(1 for r in results if r["status"] == "Possibly Eligible / More Information Required")
    
    return jsonify({
        "status": "success",
        "profile": user_profile,
        "summary": {
            "total_evaluated": len(results),
            "eligible_count": eligible_count,
            "possible_count": possible_count
        },
        "results": results
    })
