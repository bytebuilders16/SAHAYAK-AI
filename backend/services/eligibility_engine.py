import json
from pathlib import Path
from config import Config

def load_schemes():
    path = Config.SCHEMES_FILE
    if not path.exists():
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def evaluate_eligibility(user_profile, schemes=None):
    """
    Evaluates user profile against schemes.
    user_profile expects:
      - age: int
      - state: str
      - annual_income: float/int
      - occupation: str
      - student_status: bool
      - category: str ('General', 'OBC', 'SC', 'ST', 'EWS')
      - gender: str ('Male', 'Female', 'Other')
      - residence: str ('Rural', 'Urban')
      - farmer_status: bool
      - healthcare_req: bool
      - housing_req: bool
      - education_req: bool
    """
    if schemes is None:
        schemes = load_schemes()
        
    results = []
    
    age = int(user_profile.get("age", 25))
    state = str(user_profile.get("state", "All")).strip()
    income = float(user_profile.get("annual_income", 0))
    occupation = str(user_profile.get("occupation", "")).strip().lower()
    is_student = bool(user_profile.get("student_status", False))
    category = str(user_profile.get("category", "General")).strip()
    gender = str(user_profile.get("gender", "All")).strip()
    residence = str(user_profile.get("residence", "Urban")).strip().lower()
    is_farmer = bool(user_profile.get("farmer_status", False))
    req_healthcare = bool(user_profile.get("healthcare_req", False))
    req_housing = bool(user_profile.get("housing_req", False))
    req_education = bool(user_profile.get("education_req", False))
    
    for s in schemes:
        score = 50  # baseline interest
        reasons = []
        flags = []
        is_hard_disqualified = False
        
        # 1. Age check
        age_range = s.get("age_range", [0, 100])
        min_age, max_age = age_range[0], age_range[1]
        if min_age <= age <= max_age:
            score += 15
            reasons.append(f"Your age ({age} yrs) fulfills the age bracket ({min_age}–{max_age} yrs).")
        else:
            if s.get("id") == "sukanya-samriddhi" and age > 10:
                is_hard_disqualified = True
                flags.append(f"Exceeds maximum child age limit of 10 years (Current: {age} yrs).")
            elif s.get("id") == "ignoaps" and age < 60:
                is_hard_disqualified = True
                flags.append(f"Requires minimum age of 60 years for senior pension (Current: {age} yrs).")
            else:
                score -= 25
                flags.append(f"Outside standard age bracket of {min_age}–{max_age} years.")
                
        # 2. Income check
        income_limit = s.get("income_limit")
        if income_limit is not None:
            if income <= income_limit:
                score += 15
                reasons.append(f"Annual income of ₹{income:,.0f} satisfies scheme ceiling (₹{income_limit:,.0f}).")
            else:
                score -= 30
                flags.append(f"Income of ₹{income:,.0f} exceeds max ceiling of ₹{income_limit:,.0f}.")
                if income > income_limit * 1.5:
                    is_hard_disqualified = True
        else:
            score += 5
            reasons.append("No restrictive upper family income ceiling specified.")
            
        # 3. Student requirement
        if s.get("student_required", False):
            if is_student or occupation == "student":
                score += 20
                reasons.append("Verified student status matches scheme academic criteria.")
            else:
                score -= 35
                flags.append("Restricted strictly to actively enrolled regular students.")
                
        # 4. Farmer requirement
        if s.get("farmer_required", False):
            if is_farmer or "farmer" in occupation or "agri" in occupation:
                score += 20
                reasons.append("Registered farmer status matches agricultural beneficiary guidelines.")
            else:
                score -= 35
                flags.append("Intended specifically for agricultural landholding farmers.")
                
        # 5. Gender check
        scheme_gender = s.get("gender", "All")
        if scheme_gender != "All":
            if gender.lower() == scheme_gender.lower():
                score += 10
                reasons.append(f"Gender criteria ({scheme_gender}) satisfied.")
            else:
                score -= 30
                flags.append(f"Specifically designated for {scheme_gender} beneficiaries.")
                
        # 6. Target Requirements / User Interest Match
        target_reqs = s.get("target_requirements", [])
        matched_req = False
        if req_education and ("education" in target_reqs or s.get("category") == "Education"):
            score += 20
            matched_req = True
            reasons.append("Directly fulfills your designated requirement for Educational assistance.")
        if req_healthcare and ("healthcare" in target_reqs or s.get("category") == "Healthcare"):
            score += 20
            matched_req = True
            reasons.append("Directly matches your requirement for Healthcare & Medical protection.")
        if req_housing and ("housing" in target_reqs or s.get("category") == "Housing"):
            score += 20
            matched_req = True
            reasons.append("Directly matches your requirement for Housing & Pucca Home support.")
        if is_farmer and ("agriculture" in target_reqs or s.get("category") == "Agriculture"):
            score += 20
            matched_req = True
            reasons.append("Matches your profile for Farming & Agricultural livelihood.")
            
        # 7. Occupation match bonus
        occ_list = [o.lower() for o in s.get("occupation", ["All"])]
        if "all" in occ_list or occupation in occ_list:
            score += 10
        elif occupation and any(occupation in o for o in occ_list):
            score += 10
            reasons.append(f"Targeted for {s.get('occupation')}.")
            
        # Bound score between 10 and 98% (never 100% because final eligibility is authority determined)
        if is_hard_disqualified:
            score = min(score, 35)
            status = "Not Eligible"
        elif score >= 80:
            status = "Eligible"
            score = min(score, 96)
        elif score >= 55:
            status = "Possibly Eligible / More Information Required"
            score = min(score, 79)
        else:
            status = "Not Eligible"
            score = max(score, 18)
            
        # Sort score clamp
        profile_match = max(15, min(97, score))
        
        results.append({
            "scheme_id": s.get("id"),
            "name": s.get("name"),
            "category": s.get("category"),
            "short_description": s.get("description"),
            "benefits": s.get("benefits"),
            "eligibility_summary": s.get("eligibility"),
            "official_url": s.get("official_url"),
            "required_documents": s.get("required_documents", []),
            "application_steps": s.get("application_steps", []),
            "profile_match": profile_match,
            "status": status,
            "match_reasons": reasons[:4],
            "missing_criteria": flags[:3]
        })
        
    # Sort results by profile_match descending
    results.sort(key=lambda x: x["profile_match"], reverse=True)
    return results
