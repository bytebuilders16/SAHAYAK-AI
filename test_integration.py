import urllib.request
import json
import sys
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

def test_full_integration():
    print("=== Testing Frontend & Vite Proxy Integration ===")
    
    # 1. Frontend
    req = urllib.request.urlopen("http://localhost:5173/")
    assert req.status == 200
    html = req.read().decode('utf-8')
    assert "SahayakAI" in html
    print("✓ Frontend HTML served with HTTP 200 and SahayakAI title.")

    # 2. Vite Proxy -> Backend GET /api/schemes
    req = urllib.request.urlopen("http://localhost:5173/api/schemes")
    assert req.status == 200
    data = json.loads(req.read().decode('utf-8'))
    assert data["count"] == 10
    print(f"✓ Proxy GET /api/schemes returned {data['count']} schemes.")

    # 3. Vite Proxy -> Backend POST /api/check-eligibility
    demo_payload = {
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
    req = urllib.request.Request(
        "http://localhost:5173/api/check-eligibility",
        data=json.dumps(demo_payload).encode('utf-8'),
        headers={"Content-Type": "application/json"}
    )
    resp = urllib.request.urlopen(req)
    assert resp.status == 200
    eval_data = json.loads(resp.read().decode('utf-8'))
    top_scheme = eval_data["results"][0]
    print(f"✓ POST /api/check-eligibility succeeded: Top match '{top_scheme['name']}' ({top_scheme['profile_match']}%, status: {top_scheme['status']})")
    assert top_scheme["profile_match"] >= 90
    assert top_scheme["status"] == "Eligible"

    # 4. Vite Proxy -> Backend POST /api/chat
    chat_payload = {
        "message": "Which scholarship schemes can a college student apply for?",
        "user_profile": demo_payload
    }
    req = urllib.request.Request(
        "http://localhost:5173/api/chat",
        data=json.dumps(chat_payload).encode('utf-8'),
        headers={"Content-Type": "application/json"}
    )
    resp = urllib.request.urlopen(req)
    assert resp.status == 200
    chat_data = json.loads(resp.read().decode('utf-8'))
    print(f"✓ POST /api/chat succeeded (mode: {chat_data['source_mode']})")
    print(f"  Citations: {[c['name'] for c in chat_data['citations']]}")

    # 5. Vite Proxy -> Backend POST /api/application-guide
    guide_payload = {
        "scheme_id": "nsp-post-matric",
        "user_profile": demo_payload
    }
    req = urllib.request.Request(
        "http://localhost:5173/api/application-guide",
        data=json.dumps(guide_payload).encode('utf-8'),
        headers={"Content-Type": "application/json"}
    )
    resp = urllib.request.urlopen(req)
    assert resp.status == 200
    guide_data = json.loads(resp.read().decode('utf-8'))
    print(f"✓ POST /api/application-guide succeeded: {len(guide_data['steps'])} steps generated.")

    print("\n🎉 ALL FRONTEND + BACKEND PROXY INTEGRATION CHECKS PASSED 100%!")

if __name__ == "__main__":
    test_full_integration()
