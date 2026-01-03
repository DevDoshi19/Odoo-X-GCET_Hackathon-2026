# app/models/attendance.py

from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.db.base import Base
from datetime import date

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)

    attendance_date = Column(Date, default=date.today)
    status = Column(String, default="PRESENT")
