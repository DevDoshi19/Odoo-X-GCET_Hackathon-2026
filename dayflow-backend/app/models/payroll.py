# app/models/payroll.py

from sqlalchemy import Column, Integer, Float, String, ForeignKey
from app.db.base import Base

class Payroll(Base):
    """
    Payroll table stores raw salary components for an employee.
    All calculations (gross / net) are handled in the service layer.
    """

    __tablename__ = "payrolls"

    id = Column(Integer, primary_key=True, index=True)

    # Relationship to employee
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)

    # Salary components
    basic_salary = Column(Float, nullable=False)
    hra = Column(Float, default=0.0)
    bonus = Column(Float, default=0.0)

    # Deductions
    tax = Column(Float, default=0.0)
    pf = Column(Float, default=0.0)

    # Metadata
    currency = Column(String, default="INR")
