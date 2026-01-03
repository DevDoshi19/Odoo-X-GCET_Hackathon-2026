from app.db.session import engine
from app.db.base import Base

from app.models import user, employee, attendance, leave, payroll  # noqa

def init_db():
    Base.metadata.create_all(bind=engine)
