# Dayflow HRMS – FastAPI Backend ⚙️

Backend service for **Dayflow HRMS**, built using **FastAPI** as part of the Odoo Hackathon.

This backend handles:
- Authentication & authorization
- Employee profile management
- Attendance tracking
- Payroll access
- Role-based API protection (Admin / Employee)

The backend is designed to be **modular, scalable, and frontend-agnostic**.

---

## 🚀 Tech Stack

- **FastAPI**
- **SQLAlchemy**
- **SQLite** (development)
- **JWT Authentication**
- **Pydantic**
- **Uvicorn**

---

## 📁 Project Structure

```

dayflow-backend/
├── app/
│   ├── core/           # Security, auth dependencies
│   ├── db/             # Database session & init
│   ├── models/         # SQLAlchemy models
│   ├── routes/         # API routes
│   ├── schemas/        # Pydantic schemas
│   ├── main.py         # FastAPI app entry point
│   └── **init**.py
├── dayflow.db          # SQLite database (dev)
├── requirements.txt
└── README.md

```

---

## 🔐 Authentication Overview

Authentication is handled using **JWT (Bearer Token)**.

### Flow:
1. User signs up
2. User logs in
3. Backend returns JWT access token
4. Token is sent in `Authorization` header for protected APIs

### Example Header:
```

Authorization: Bearer <access_token>

```

> ⚠️ Swagger OAuth popup is **not used** for login.  
> Tokens must be attached manually or via frontend.

---

## 🧪 API Documentation

FastAPI auto-generates Swagger docs.

After running the server, visit:
```

[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

````

---

## 🔗 Core API Endpoints

### 🔑 Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### 👤 Employee
- `GET /api/employees/me`
- `PUT /api/employees/me`

### 📅 Attendance
- `POST /api/attendance/`
- `GET /api/attendance/me`
- `GET /api/attendance/all` (Admin)

### 💰 Payroll
- `GET /api/payroll/me`
- `POST /api/payroll/{employee_id}` (Admin)

---

## ▶️ Running the Backend Locally

### 1️⃣ Create virtual environment
```bash
python -m venv venv
````

Activate it:

**Windows**

```bash
venv\Scripts\activate
```

**Mac / Linux**

```bash
source venv/bin/activate
```

---

### 2️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

---

### 3️⃣ Run the server

```bash
uvicorn app.main:app --reload
```

Backend will be available at:

```
http://127.0.0.1:8000
```

---

## 🧪 Testing Protected APIs

Swagger UI may show 🔒 lock icons.

To test protected routes:

### Option 1: Use `curl`

```bash
curl -X GET "http://127.0.0.1:8000/api/employees/me" \
  -H "Authorization: Bearer <your_token>"
```

### Option 2: Use Postman / Thunder Client

Add header:

```
Authorization: Bearer <your_token>
```

---

## 🗄️ Database

* Uses **SQLite** for development
* Auto-creates tables on startup
* Database file: `dayflow.db`

You can inspect it using:

* DB Browser for SQLite
* SQLite CLI

---

## ⚠️ Notes & Limitations

* SQLite is used for development only
* Frontend integration is planned
* OAuth UI in Swagger is intentionally not used
* Designed for hackathon MVP and future expansion

---

## 🔮 Future Improvements

* PostgreSQL migration
* Alembic migrations
* Refresh tokens
* Admin dashboards
* Deployment (Docker / Cloud)

---

## 👥 Team Collaboration

* Backend and frontend are decoupled
* Clean API contracts
* Easy integration with React frontend
* Ready for team-based development

---

## 📄 License

This project is created for **educational and hackathon purposes**.

---

**Dayflow HRMS Backend — built for real workflows, not mock demos.**
Just tell me 👍
```
