from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import Base, engine
from routes.chat import router as chat_router
from routes.upload import router as upload_router
from routes.conversations import router as conversations_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Agael AI Backend")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://your-frontend-domain.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(chat_router)
app.include_router(upload_router)
app.include_router(conversations_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to Agael AI Backend 🚀"
    }