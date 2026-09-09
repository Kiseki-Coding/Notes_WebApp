from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..Auth.service import get_current_user
from ..Database.database import get_db
from ..Database.models import Note, User
from ..Database.schemas import NoteCreate, NoteUpdate, NoteResponse


router = APIRouter(
    tags=["Notes"]
)


@router.post(
    "",
    response_model=NoteResponse,
    status_code=status.HTTP_201_CREATED
)
def create_note(
    note_data: NoteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_note = Note(
        title=note_data.title,
        content=note_data.content
    )

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return new_note

@router.get(
    "",
    response_model=list[NoteResponse]
)
def get_notes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    notes = db.query(Note).order_by(
        Note.updated_at.desc()
    ).all()

    return notes

@router.get(
    "/{note_id}",
    response_model=NoteResponse
)
def get_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    note = db.query(Note).filter(
        Note.id == note_id
    ).first()

    if note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )

    return note

@router.put(
    "/{note_id}",
    response_model=NoteResponse
)
def update_note(
    note_id: int,
    note_data: NoteUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    note = db.query(Note).filter(
        Note.id == note_id
    ).first()

    if note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )

    update_data = note_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(note, field, value)

    db.commit()
    db.refresh(note)

    return note

@router.delete("/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    note = db.query(Note).filter(
        Note.id == note_id
    ).first()

    if note is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )

    db.delete(note)
    db.commit()

    return {
        "message": "Note deleted successfully"
    }