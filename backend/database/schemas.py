from pydantic import BaseModel


class MessageCreate(BaseModel):
    sender: str
    content: str


class ConversationCreate(BaseModel):
    title: str