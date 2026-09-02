from .vector_store import search_schemes
from services.gemini_service import call_gemini, generate_grounded_fallback

def ask_sahayak_rag(query, user_profile=None):
    """
    RAG Pipeline:
    1. Retrieve top-k schemes from vector store.
    2. Format prompt with retrieved context and citizen info.
    3. Generate response using Gemini API or grounded fallback.
    """
    retrieved_docs = search_schemes(query, top_k=3)
    
    # Build context string
    context_blocks = []
    citations = []
    for doc in retrieved_docs:
        meta = doc.get("metadata", {})
        context_blocks.append(
            f"Scheme Name: {meta.get('name')}\n"
            f"Category: {meta.get('category')}\n"
            f"Details: {doc.get('text')}\n"
            f"Official Link: {meta.get('official_url')}\n"
        )
        citations.append({
            "id": doc.get("id"),
            "name": meta.get("name"),
            "category": meta.get("category"),
            "url": meta.get("official_url")
        })
        
    context_str = "\n---\n".join(context_blocks)
    
    profile_info = ""
    if user_profile:
        profile_info = (
            f"Citizen Context: Age={user_profile.get('age')}, "
            f"State={user_profile.get('state')}, "
            f"Income=₹{user_profile.get('annual_income')}, "
            f"Occupation={user_profile.get('occupation')}, "
            f"Category={user_profile.get('category')}."
        )
        
    system_prompt = (
        "You are Sahayak Bot, an empathetic and authoritative AI assistant for Indian citizens "
        "navigating government welfare schemes. "
        "Rules:\n"
        "1. Prioritize the retrieved government scheme information provided in CONTEXT.\n"
        "2. Explain benefits and criteria in simple, clear language without bureaucratic jargon.\n"
        "3. Explicitly state the required documents checklist and official portal links.\n"
        "4. If the user asks in Hindi or Hinglish, answer politely in Hindi or Hinglish accordingly.\n"
        "5. Always include a disclaimer that final eligibility is sanctioned by government authorities."
    )
    
    user_prompt = (
        f"USER QUESTION: {query}\n\n"
        f"{profile_info}\n\n"
        f"VERIFIED SCHEME CONTEXT:\n{context_str}\n\n"
        "Please provide a structured, helpful answer addressing eligibility, benefits, and required documents."
    )
    
    # Attempt Gemini generation
    gemini_reply = call_gemini(user_prompt, system_instruction=system_prompt)
    
    if gemini_reply:
        answer = gemini_reply
        source_mode = "gemini-rag"
    else:
        answer = generate_grounded_fallback(query, retrieved_docs)
        source_mode = "grounded-fallback"
        
    return {
        "query": query,
        "answer": answer,
        "source_mode": source_mode,
        "citations": citations
    }
