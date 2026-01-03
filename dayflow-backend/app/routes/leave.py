# app/routes/leave.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.leave import Leave
from app.schemas.leave import LeaveCreate, LeaveUpdate, LeaveResponse
from app.core.dependencies import get_current_user, require_admin

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# routes below...
