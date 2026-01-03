# app/schemas/payroll.py

from pydantic import BaseModel

class PayrollCreate(BaseModel):
    basic_salary: float
    hra: float = 0.0
    bonus: float = 0.0
    tax: float = 0.0
    pf: float = 0.0

class PayrollResponse(PayrollCreate):
    id: int
    employee_id: int
    gross_salary: float
    net_salary: float

    class Config:
        orm_mode = True
