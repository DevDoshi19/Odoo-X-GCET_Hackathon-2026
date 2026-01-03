# app/schemas/attendance.py

from pydantic import BaseModel
from datetime import date

class AttendanceCreate(BaseModel):
    attendance_date: date
    status: str  # PRESENT | ABSENT | HALF_DAY | LEAVE

class AttendanceResponse(AttendanceCreate):
    id: int
    employee_id: int

    class Config:
        orm_mode = True
