from sqlalchemy.orm import Session
from database.models import Conversation, Message


def create_conversation(db: Session, title: str = "New Chat"):
    conversation = Conversation(title=title)
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    return conversation


def save_message(db: Session, conversation_id: int, sender: str, content: str):
    message = Message(
        conversation_id=conversation_id,
        sender=sender,
        content=content,
    )

    db.add(message)
    db.commit()
    db.refresh(message)

    return message


def get_conversations(db: Session):
    return db.query(Conversation).order_by(Conversation.id.desc()).all()


def get_messages(db: Session, conversation_id: int):
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .all()
    )