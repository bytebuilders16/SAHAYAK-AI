from flask import Blueprint, jsonify, request
from services.eligibility_engine import load_schemes

guidance_bp = Blueprint('guidance', __name__)

@guidance_bp.route('', methods=['POST'])
def get_application_guide():
    data = request.get_json() or {}
    scheme_id = data.get("scheme_id")
    user_profile = data.get("user_profile") or {}
    
    schemes = load_schemes()
    scheme = next((s for s in schemes if s.get("id") == scheme_id), None)
    
    if not scheme:
        return jsonify({
            "status": "error",
            "message": f"Scheme '{scheme_id}' not found."
        }), 404
        
    # Build custom 6-step simulated application guide
    guide_steps = [
        {
            "step_number": 1,
            "title": "Check Required Documents",
            "description": "Gather all mandatory identity, residency, and qualification records beforehand.",
            "checklist": scheme.get("required_documents", [
                "Aadhaar Card with linked active mobile number",
                "Income Certificate from authorized Tehsildar/Revenue officer",
                "Bank Account Passbook (Aadhaar DBT enabled)"
            ]),
            "tip": "Ensure your name and date of birth match identically across your Aadhaar and Bank Passbook."
        },
        {
            "step_number": 2,
            "title": "Verify Profile Eligibility Information",
            "description": "Cross-check your family income, state residency, and eligibility criteria against scheme rules.",
            "eligibility_summary": scheme.get("eligibility"),
            "tip": "Applicants must not have filed misleading income returns."
        },
        {
            "step_number": 3,
            "title": "Prepare & Digitize Documents",
            "description": "Scan certificates in PDF/JPEG format under 200KB. Keep DigiLocker credentials handy.",
            "tip": "Keep original color scans rather than black-and-white photocopies to avoid verification rejection."
        },
        {
            "step_number": 4,
            "title": "Complete Online Application Form",
            "description": f"Log in to the official portal ({scheme.get('official_url')}) and enter applicant details accurately.",
            "instructions": scheme.get("application_steps", []),
            "tip": "Save draft at each step to prevent session timeouts."
        },
        {
            "step_number": 5,
            "title": "Review & Verification Submission",
            "description": "Preview your filled application carefully before triggering OTP final submission.",
            "tip": "Download and print the acknowledgment slip containing your Application Reference ID."
        },
        {
            "step_number": 6,
            "title": "Visit Official Government Portal / Follow-up",
            "description": f"Submit directly on the designated central/state government portal: {scheme.get('official_url')}",
            "official_url": scheme.get("official_url"),
            "tip": "Track application status weekly using your Reference ID."
        }
    ]
    
    return jsonify({
        "status": "success",
        "scheme_id": scheme.get("id"),
        "scheme_name": scheme.get("name"),
        "category": scheme.get("category"),
        "official_url": scheme.get("official_url"),
        "benefits": scheme.get("benefits"),
        "steps": guide_steps,
        "disclaimer": "SahayakAI provides informational guidance and simulated preparation. Final application must be submitted through the official government portal."
    })
