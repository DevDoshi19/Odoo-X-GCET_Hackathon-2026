from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.db.base import Base

class Leave(Base):
    __tablename__ = "leaves"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)

    leave_type = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)

    reason = Column(String, nullable=True)
    status = Column(String, default="PENDING")
    admin_comment = Column(String, nullable=True)
