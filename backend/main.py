from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import Base, engine
from database import models

from routes.chat import router as chat_router
from routes.conversations import router as conversation_router
from routes.upload import router as upload_router

app = FastAPI(title="Agael AI Backend")

# Create database tables
Base.metadata.create_all(bind=engine)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(chat_router)
app.include_router(conversation_router)
app.include_router(upload_router)

# Home route
@app.get("/")
def root():
    return {
        "message": "Welcome to Agael AI Backend!"
    }