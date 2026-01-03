# bootstrap.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# -----------------------------
# FOLDER & FILE STRUCTURE
# -----------------------------
STRUCTURE = {
    "app": {
        "__init__.py": "",
        "main.py": "",
        "core": {
            "__init__.py": "",
            "config.py": "",
            "security.py": "",
            "dependencies.py": "",
        },
        "models": {
            "__init__.py": "",
            "user.py": "",
            "employee.py": "",
            "attendance.py": "",
            "leave.py": "",
            "payroll.py": "",
        },
        "schemas": {
            "__init__.py": "",
            "user.py": "",
            "employee.py": "",
            "attendance.py": "",
            "leave.py": "",
            "payroll.py": "",
        },
        "routes": {
            "__init__.py": "",
            "auth.py": "",
            "employee.py": "",
            "attendance.py": "",
            "leave.py": "",
            "payroll.py": "",
        },
        "services": {
            "__init__.py": "",
            "salary_calculator.py": "",
        },
        "db": {
            "__init__.py": "",
            "session.py": "",
            "base.py": "",
        },
        "utils": {
            "__init__.py": "",
            "permissions.py": "",
        },
    }
}


def create_structure(base_path, structure):
    for name, content in structure.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:
            if not os.path.exists(path):
                with open(path, "w") as f:
                    f.write(content)


# -----------------------------
# CREATE FILES/FOLDERS
# -----------------------------
create_structure(".", STRUCTURE)

# -----------------------------
# FASTAPI APP (TEMP BOOT)
# -----------------------------
app = FastAPI(
    title="Dayflow HRMS API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "Dayflow backend is running",
        "next": "Start adding routes in app/routes/"
    }


# -----------------------------
# RUN MESSAGE
# -----------------------------
if __name__ == "__main__":
    print("\n✅ Backend structure created successfully.")
    print("👉 Next step:")
    print("   uvicorn app.main:app --reload\n")
