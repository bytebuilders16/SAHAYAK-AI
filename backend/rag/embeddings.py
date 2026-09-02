"""
Embedding module for SahayakAI RAG.
Attempts sentence-transformers if available; otherwise falls back to a clean,
lightweight hashed semantic term vectorizer so the app always functions smoothly.
"""
import math
import re
from collections import Counter

_has_sentence_transformers = False
_st_model = None

_has_sentence_transformers = False
_st_model = None

def init_sentence_transformers():
    global _has_sentence_transformers, _st_model
    if _st_model is not None:
        return _st_model
    try:
        from sentence_transformers import SentenceTransformer
        _st_model = SentenceTransformer('all-MiniLM-L6-v2')
        _has_sentence_transformers = True
        return _st_model
    except Exception:
        _has_sentence_transformers = False
        return None

def tokenize(text):
    text = text.lower()
    # Support basic Latin + Devanagari script tokens
    return re.findall(r"[\w\u0900-\u097F]+", text)

def get_text_embedding(text):
    """
    Returns an embedding vector for a given text string.
    If SentenceTransformer is available, uses it.
    Otherwise produces a normalized 128-dimensional hashed TF representation.
    """
    if _has_sentence_transformers and _st_model is not None:
        try:
            return _st_model.encode(text).tolist()
        except Exception:
            pass
            
    # Lightweight hash-based embedding fallback (dim=128)
    dim = 128
    vec = [0.0] * dim
    tokens = tokenize(text)
    if not tokens:
        return vec
        
    counts = Counter(tokens)
    for token, cnt in counts.items():
        # Hash token into 128 buckets
        bucket = hash(token) % dim
        vec[bucket] += cnt * (1.0 + math.log(len(token)))
        
    # L2 normalize
    norm = math.sqrt(sum(x * x for x in vec))
    if norm > 0:
        vec = [x / norm for x in vec]
    return vec

def cosine_similarity(vec1, vec2):
    if not vec1 or not vec2:
        return 0.0
    dot = sum(a * b for a, b in zip(vec1, vec2))
    norm1 = math.sqrt(sum(a * a for a in vec1))
    norm2 = math.sqrt(sum(b * b for b in vec2))
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return dot / (norm1 * norm2)
