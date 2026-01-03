from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.base import Base

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    full_name = Column(String, default="")
    phone = Column(String, default="")
    address = Column(String, default="")
    designation = Column(String, default="")
    department = Column(String, default="")
