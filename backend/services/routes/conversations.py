from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from services.conversation_service import (
    get_conversations,
    get_messages,
)

router = APIRouter(prefix="/conversations", tags=["Conversations"])


@router.get("/")
def list_conversations(db: Session = Depends(get_db)):
    conversations = get_conversations(db)

    return [
        {
            "id": c.id,
            "title": c.title,
            "created_at": c.created_at,
        }
        for c in conversations
    ]


@router.get("/{conversation_id}")
def conversation_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
):
    messages = get_messages(db, conversation_id)

    return [
        {
            "id": m.id,
            "sender": m.sender,
            "message": m.content,
        }
        for m in messages
    ]