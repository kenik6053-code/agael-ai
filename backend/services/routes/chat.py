from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database.database import get_db
from services.gemini_service import ask_gemini
from services.conversation_service import (
    create_conversation,
    save_message,
)

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    conversation_id: int | None = None


@router.post("/chat")
def chat(request: ChatRequest, db: Session = Depends(get_db)):

    conversation_id = request.conversation_id

    if conversation_id is None:
        conversation = create_conversation(
            db,
            request.message[:30],
        )
        conversation_id = conversation.id

    save_message(
        db,
        conversation_id,
        "user",
        request.message,
    )

    reply = ask_gemini(request.message)

    save_message(
        db,
        conversation_id,
        "ai",
        reply,
    )

    return {
        "reply": reply,
        "conversation_id": conversation_id,
    }