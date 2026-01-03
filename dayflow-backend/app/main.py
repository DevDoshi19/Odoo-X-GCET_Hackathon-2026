from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# Import routers (we will add them step-by-step)
from app.routes import employee
from app.routes import payroll
from app.routes import auth
from app.routes import attendance
from app.routes import leave
from app.db.init_db import init_db

init_db()


app = FastAPI(
    title="Dayflow HRMS API",
    version="1.0.0",
    description="Backend API for Dayflow HRMS"
)

# -----------------------------
# CORS (needed for React)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# ROUTES
# -----------------------------
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

@app.get("/")
def root():
    return {"status": "Dayflow backend running"}


app.include_router(
    employee.router,
    prefix="/api/employees",
    tags=["Employees"]
)


app.include_router(
    payroll.router,
    prefix="/api/payroll",
    tags=["Payroll"]
)
app.include_router(
    attendance.router,
    prefix="/api/attendance",
    tags=["Attendance"]
)
app.include_router(
    leave.router,
    prefix="/api/leaves",
    tags=["Leaves"]
)
