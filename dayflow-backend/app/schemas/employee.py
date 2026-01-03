# app/schemas/employee.py

from pydantic import BaseModel


class EmployeeUpdate(BaseModel):
    full_name: str | None = None
    phone: str | None = None
    address: str | None = None
    designation: str | None = None
    department: str | None = None


class EmployeeResponse(EmployeeUpdate):
    id: int
    user_id: int

    class Config:
        orm_mode = True
