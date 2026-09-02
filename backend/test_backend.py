import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
import json
from services.eligibility_engine import evaluate_eligibility, load_schemes
from rag.vector_store import index_schemes, search_schemes
from rag.rag_service import ask_sahayak_rag
from routes.guidance import get_application_guide

def run_tests():
    print("=== TEST 1: Load Schemes ===")
    schemes = load_schemes()
    print(f"Loaded {len(schemes)} schemes.")
    assert len(schemes) >= 5, "Should have at least 5 schemes loaded"
    
    print("\n=== TEST 2: Index Schemes and Search ===")
    index_schemes(schemes)
    results = search_schemes("scholarship for college student", top_k=2)
    print(f"Top search result: {results[0]['metadata']['name']} (score: {results[0]['score']})")
    assert "Scholarship" in results[0]['metadata']['name'], "Should find scholarship scheme"
    
    print("\n=== TEST 3: Hackathon Demo Scenario (Age 20, Student, UP, Rs 2,50,000) ===")
    demo_profile = {
        "age": 20,
        "state": "Uttar Pradesh",
        "annual_income": 250000,
        "occupation": "Student",
        "student_status": True,
        "category": "General",
        "gender": "Male",
        "residence": "Urban",
        "farmer_status": False,
        "healthcare_req": False,
        "housing_req": False,
        "education_req": True
    }
    eval_results = evaluate_eligibility(demo_profile, schemes)
    print(f"Evaluated {len(eval_results)} schemes.")
    top_scheme = eval_results[0]
    print(f"Top Match: {top_scheme['name']} | Match: {top_scheme['profile_match']}% | Status: {top_scheme['status']}")
    assert top_scheme["status"] == "Eligible", "Top scheme should be Eligible"
    assert "nsp" in top_scheme["scheme_id"], "Top scheme should be NSP scholarship"
    
    print("\n=== TEST 4: Chatbot RAG & Grounded Fallback ===")
    chat_resp_en = ask_sahayak_rag("What documents do I need for college scholarship?", demo_profile)
    print("EN Answer sample:\n", chat_resp_en["answer"][:180], "...")
    assert len(chat_resp_en["answer"]) > 50
    
    chat_resp_hi = ask_sahayak_rag("छात्रवृत्ति के लिए क्या दस्तावेज चाहिए?", demo_profile)
    print("HI Answer sample:\n", chat_resp_hi["answer"][:180], "...")
    assert len(chat_resp_hi["answer"]) > 50
    
    print("\nALL BACKEND UNIT TESTS PASSED SUCCESSFULLY! 🚀")

if __name__ == "__main__":
    run_tests()
