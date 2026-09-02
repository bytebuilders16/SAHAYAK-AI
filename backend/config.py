import os
from pathlib import Path
from dotenv import load_dotenv

# Base backend directory
BASE_DIR = Path(__file__).resolve().parent

# Load .env file
load_dotenv(BASE_DIR / ".env")

class Config:
    PORT = int(os.getenv("PORT", 5000))
    FLASK_ENV = os.getenv("FLASK_ENV", "development")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
    
    # Path to scheme data
    SCHEMES_FILE = BASE_DIR / "data" / "schemes.json"
    if not SCHEMES_FILE.exists():
        # Fallback to root data folder if needed
        SCHEMES_FILE = BASE_DIR.parent / "data" / "schemes.json"
