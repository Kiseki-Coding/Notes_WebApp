# schemas.py
from pydantic import BaseModel
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    username: str
    email: str | None = None

class UserInDB(UserResponse):
    hashed_password: str




class NoteCreate(BaseModel):
    title: str
    content: str = ""

class NoteUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    archived: bool | None = None

class NoteResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: datetime
    archived: bool