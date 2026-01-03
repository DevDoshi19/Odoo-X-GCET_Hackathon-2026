# app/routes/payroll.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.models.payroll import Payroll
from app.schemas.payroll import PayrollCreate, PayrollResponse
from app.services.salary_calculator import calculate_salary
from app.core.dependencies import get_current_user, require_admin

router = APIRouter()

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/{employee_id}", response_model=PayrollResponse)
def create_or_update_payroll(
    employee_id: int,
    payroll: PayrollCreate,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    """
    ADMIN ONLY:
    Create or update payroll for an employee
    """

    existing = db.query(Payroll).filter(
        Payroll.employee_id == employee_id
    ).first()

    salary = calculate_salary(**payroll.dict())

    if existing:
        for key, value in payroll.dict().items():
            setattr(existing, key, value)
        db.commit()
        db.refresh(existing)

        return PayrollResponse(
            **existing.__dict__,
            **salary
        )

    new_payroll = Payroll(
        employee_id=employee_id,
        **payroll.dict()
    )

    db.add(new_payroll)
    db.commit()
    db.refresh(new_payroll)

    return PayrollResponse(
        **new_payroll.__dict__,
        **salary
    )


@router.get("/me", response_model=PayrollResponse)
def get_my_payroll(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    EMPLOYEE:
    View own payroll (read-only)
    """

    payroll = db.query(Payroll).filter(
        Payroll.employee_id == current_user.get("employee_id", 1)
    ).first()

    if not payroll:
        raise HTTPException(status_code=404, detail="Payroll not found")

    salary = calculate_salary(
        payroll.basic_salary,
        payroll.hra,
        payroll.bonus,
        payroll.tax,
        payroll.pf,
    )

    return PayrollResponse(
        **payroll.__dict__,
        **salary
    )
