from fastapi import APIRouter, Depends

from ..Auth.service import get_current_active_user
from ..Database.schemas import UserResponse
from ..Database.models import User

router = APIRouter()

@router.get("/users/me/", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user
