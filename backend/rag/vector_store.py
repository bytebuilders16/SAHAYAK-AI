"""
Vector store implementation with ChromaDB support and zero-dependency in-memory fallback.
"""
import os
from .embeddings import get_text_embedding, cosine_similarity

_chroma_client = None
_chroma_collection = None
_use_chroma = False

try:
    import chromadb
    from chromadb.config import Settings
    
    # Initialize lightweight ephemeral/persistent ChromaDB client
    _chroma_client = chromadb.Client(Settings(anonymized_telemetry=False, is_persistent=False))
    _chroma_collection = _chroma_client.get_or_create_collection(name="sahayak_schemes")
    _use_chroma = True
except Exception:
    _use_chroma = False
    _chroma_client = None
    _chroma_collection = None

class MemoryVectorStore:
    def __init__(self):
        self.documents = []  # list of {id, text, metadata, embedding}
        
    def add_document(self, doc_id, text, metadata):
        embedding = get_text_embedding(text)
        self.documents.append({
            "id": doc_id,
            "text": text,
            "metadata": metadata,
            "embedding": embedding
        })
        
    def search(self, query, top_k=3):
        query_vec = get_text_embedding(query)
        scored = []
        q_lower = query.lower()
        
        for doc in self.documents:
            sim = cosine_similarity(query_vec, doc["embedding"])
            # Keyword presence booster for specific scheme names or keywords
            doc_text_lower = doc["text"].lower()
            name_lower = doc["metadata"].get("name", "").lower()
            category_lower = doc["metadata"].get("category", "").lower()
            
            # Boost matches on keywords (scholarship, kisan, health, awas, pension, etc.)
            boost = 0.0
            for term in ["scholarship", "kisan", "farmer", "ayushman", "health", "hospital", "awas", "housing", "ghar", "pension", "old age", "vishwakarma", "mudra", "loan", "sukanya", "beti", "student", "college"]:
                if term in q_lower:
                    if term in name_lower:
                        boost += 0.4
                    elif term in doc_text_lower or term in category_lower:
                        boost += 0.2
                        
            final_score = sim + boost
            scored.append({
                "id": doc["id"],
                "score": round(float(final_score), 4),
                "text": doc["text"],
                "metadata": doc["metadata"]
            })
            
        scored.sort(key=lambda x: x["score"], reverse=True)
        return scored[:top_k]

_memory_store = MemoryVectorStore()

def index_schemes(schemes):
    """
    Populates ChromaDB (if available) and MemoryVectorStore with scheme data.
    """
    global _memory_store
    _memory_store = MemoryVectorStore()
    
    for s in schemes:
        doc_id = s.get("id")
        text_content = (
            f"Scheme: {s.get('name')}. Category: {s.get('category')}. "
            f"Description: {s.get('description')} "
            f"Benefits: {s.get('benefits')} "
            f"Eligibility: {s.get('eligibility')} "
            f"Required Documents: {', '.join(s.get('required_documents', []))}. "
            f"Application Steps: {' '.join(s.get('application_steps', []))}."
        )
        metadata = {
            "id": s.get("id"),
            "name": s.get("name"),
            "category": s.get("category"),
            "benefits": s.get("benefits"),
            "official_url": s.get("official_url")
        }
        
        # Add to memory store
        _memory_store.add_document(doc_id, text_content, metadata)
        
        # Add to ChromaDB if active
        if _use_chroma and _chroma_collection is not None:
            try:
                emb = get_text_embedding(text_content)
                _chroma_collection.upsert(
                    ids=[doc_id],
                    documents=[text_content],
                    metadatas=[metadata],
                    embeddings=[emb]
                )
            except Exception:
                pass

def search_schemes(query, top_k=3):
    """
    Retrieves the most relevant scheme chunks for a given query.
    """
    if _use_chroma and _chroma_collection is not None:
        try:
            emb = get_text_embedding(query)
            res = _chroma_collection.query(
                query_embeddings=[emb],
                n_results=top_k
            )
            if res and res.get("documents") and len(res["documents"][0]) > 0:
                results = []
                for idx in range(len(res["ids"][0])):
                    results.append({
                        "id": res["ids"][0][idx],
                        "text": res["documents"][0][idx],
                        "metadata": res["metadatas"][0][idx],
                        "score": 0.85
                    })
                return results
        except Exception:
            pass
            
    # Fallback to high-accuracy memory store
    return _memory_store.search(query, top_k=top_k)
