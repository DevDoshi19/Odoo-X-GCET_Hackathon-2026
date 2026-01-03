# app/routes/attendance.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.attendance import Attendance
from app.schemas.attendance import AttendanceCreate, AttendanceResponse
from app.core.dependencies import get_current_user, require_admin

router = APIRouter()

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=AttendanceResponse)
def mark_attendance(
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    EMPLOYEE:
    Mark own attendance
    """

    new_record = Attendance(
        employee_id=current_user.get("employee_id", 1),
        attendance_date=attendance.attendance_date,
        status=attendance.status,
    )

    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    return new_record


@router.get("/me", response_model=list[AttendanceResponse])
def get_my_attendance(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    EMPLOYEE:
    View own attendance
    """

    return db.query(Attendance).filter(
        Attendance.employee_id == current_user.get("employee_id", 1)
    ).all()


@router.get("/all", response_model=list[AttendanceResponse])
def get_all_attendance(
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    """
    ADMIN:
    View attendance of all employees
    """

    return db.query(Attendance).all()
