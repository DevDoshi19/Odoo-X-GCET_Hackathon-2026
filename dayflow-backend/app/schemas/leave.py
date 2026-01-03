# app/schemas/leave.py

from pydantic import BaseModel
from datetime import date

class LeaveCreate(BaseModel):
    leave_type: str
    start_date: date
    end_date: date
    reason: str | None = None

class LeaveUpdate(BaseModel):
    status: str                 # APPROVED | REJECTED
    admin_comment: str | None = None

class LeaveResponse(LeaveCreate):
    id: int
    employee_id: int
    status: str
    admin_comment: str | None

    class Config:
        orm_mode = True
