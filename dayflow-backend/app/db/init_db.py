# app/db/init_db.py

from app.db.session import engine
from app.db.base import Base

# Import all models here
from app.models import user, employee, attendance, leave, payroll  # noqa

def init_db():
    """
    Creates all tables in the database.
    Called once when the app starts (or manually).
    """
    Base.metadata.create_all(bind=engine)
