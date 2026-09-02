import os
import requests
import json
from config import Config

def call_gemini(prompt, system_instruction=""):
    """
    Calls Google Gemini API using REST API.
    If no key or error occurs, returns None so fallback can activate.
    """
    api_key = Config.GEMINI_API_KEY
    if not api_key:
        return None
        
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    headers = {"Content-Type": "application/json"}
    
    contents = []
    if system_instruction:
        contents.append({
            "role": "user",
            "parts": [{"text": f"SYSTEM INSTRUCTION: {system_instruction}"}]
        })
        contents.append({
            "role": "model",
            "parts": [{"text": "Understood. I will act as SahayakAI citizen assistant according to these instructions."}]
        })
        
    contents.append({
        "role": "user",
        "parts": [{"text": prompt}]
    })
    
    payload = {
        "contents": contents,
        "generationConfig": {
            "temperature": 0.3,
            "topP": 0.85,
            "maxOutputTokens": 800
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=12)
        if response.status_code == 200:
            data = response.json()
            candidates = data.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    return parts[0].get("text", "")
        else:
            print(f"[Gemini API Warning] Status {response.status_code}: {response.text}")
    except Exception as e:
        print(f"[Gemini API Exception] {e}")
        
    return None

def generate_grounded_fallback(query, retrieved_schemes, language="en"):
    """
    Generates an intelligent, grounded conversational response using retrieved scheme records.
    Ensures the chatbot demo NEVER fails even when offline or without an API key.
    """
    q_lower = query.lower()
    
    # Detect language intent if Hindi or Hinglish
    is_hindi = any(word in q_lower for word in ["योजना", "पात्र", "छात्रवृत्ति", "किसान", "पेंशन", "दस्तावेज", "नमस्ते", "आवेदन", "क्या", "कैसा"]) or \
               any(word in q_lower for word in ["kaunsi", "chahiye", "yojana", "patra", "kaise", "kya", "batao", "mujhe"])
               
    if not retrieved_schemes:
        if is_hindi:
            return (
                "नमस्ते! मैं आपका सहायक बॉट हूँ। मुझे आपकी खोज से संबंधित कोई विशिष्ट योजना नहीं मिली। "
                "कृपया अपनी आवश्यकता (जैसे: छात्रवृत्ति, स्वास्थ्य कार्ड, किसान सम्मान निधि, या आवास योजना) का उल्लेख करें।"
            )
        return (
            "Hello! I am your Sahayak Bot. I couldn't find a specific scheme matching that query. "
            "Could you mention your requirement (e.g. scholarship, healthcare, farmer support, or housing assistance)?"
        )
        
    top_doc = retrieved_schemes[0]
    meta = top_doc.get("metadata", {})
    name = meta.get("name", "Government Scheme")
    category = meta.get("category", "Welfare")
    benefits = meta.get("benefits", "Government welfare assistance")
    portal = meta.get("official_url", "https://india.gov.in")
    
    # Check if multiple schemes found
    other_schemes = [d.get("metadata", {}).get("name") for d in retrieved_schemes[1:] if d.get("metadata", {}).get("name")]
    
    if is_hindi:
        response = f"🇮🇳 **{name}** ({category})\n\n"
        response += f"📌 **मुख्य लाभ:** {benefits}\n\n"
        response += "📋 **आवश्यक दस्तावेज:**\n"
        response += "• आधार कार्ड (Aadhaar Card)\n"
        response += "• आय प्रमाण पत्र (Income Certificate)\n"
        response += "• बैंक पासबुक (Aadhaar Seeded Bank Account)\n"
        response += "• शैक्षिक / निवास प्रमाण पत्र (यदि लागू हो)\n\n"
        response += f"🔗 **आधिकारिक पोर्टल:** [{portal}]({portal})\n\n"
        if other_schemes:
            response += f"💡 आप इनसे भी लाभान्वित हो सकते हैं: {', '.join(other_schemes)}.\n\n"
        response += "⚠️ *सूचना: सहायकAI केवल मार्गदर्शन प्रदान करता है। अंतिम पात्रता संबंधित सरकारी प्राधिकरण द्वारा निर्धारित की जाती है।*"
        return response
    else:
        response = f"🇮🇳 **{name}** ({category})\n\n"
        response += f"📌 **Primary Benefits:** {benefits}\n\n"
        response += "📋 **Key Documents Required:**\n"
        response += "• Aadhaar Card (Aadhaar e-KYC linked)\n"
        response += "• Income Certificate issued by competent revenue authority\n"
        response += "• Bank Account Passbook (Aadhaar DBT enabled)\n"
        response += "• Academic marksheets / Domicile proof (as applicable)\n\n"
        response += f"🔗 **Official Portal:** [{portal}]({portal})\n\n"
        if other_schemes:
            response += f"💡 You may also explore: **{', '.join(other_schemes)}**.\n\n"
        response += "⚠️ *Disclaimer: SahayakAI provides informational guidance. Final eligibility and approval are determined by the respective government authority.*"
        return response
