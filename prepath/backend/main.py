from fastapi import FastAPI, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routes.auth import router as auth_router
from routes.roadmap import router as roadmap_router
from sqlalchemy.orm import Session
from database import get_db

# Initialize database
init_db()

app = FastAPI(
    title="PrepPath API",
    description="AI-Powered Interview Preparation Platform",
    version="1.0.0",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "http://localhost:8000",  # Local backend
        "https://preppath.vercel.app",  # Production frontend
        "https://preppath-kshitizxzz.vercel.app",  # Your Vercel domain
        "*"  # Allow all for demo (restrict in production)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(auth_router)
app.include_router(roadmap_router)

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "PrepPath API",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
