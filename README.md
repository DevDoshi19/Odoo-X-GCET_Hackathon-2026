# Dayflow HRMS 🚀  
*A Human Resource Management System built for the Odoo Hackathon*

---

## 📌 Overview

**Dayflow HRMS** is a modern Human Resource Management System designed to manage core HR operations such as:

- Employee onboarding & profiles  
- Attendance management  
- Payroll structure & visibility  
- Role-based access (Admin / Employee)  

This project is developed as part of an **Odoo Hackathon** with a strong focus on:
- Clean architecture
- Real-world workflows
- Scalable frontend–backend separation

---

## 🏗️ Project Structure

The project is divided into **two independent applications**:

```

dayflow-hrms/
├── backend/        # FastAPI backend
│   └── dayflow-backend/
├── frontend/       # React + MUI frontend
│   └── dayflow-frontend/
└── README.md

```

Both applications can be run independently and communicate via HTTP APIs.

---

## 🧠 Tech Stack

### 🔹 Frontend
- **React**
- **Material UI (MUI)**
- **MUI X DataGrid**
- React Router
- Local state management (hooks)

### 🔹 Backend
- **FastAPI**
- SQLAlchemy
- SQLite (development)
- JWT Authentication
- Pydantic schemas

---

## 🎨 Frontend Highlights

The frontend focuses on **UX-rich dashboards** and **realistic HR flows**.

### Example Implemented Screens
- **Attendance Management Dashboard**
  - Status filters (Present, Absent, Half-day, Leave)
  - Analytics cards
  - Search & export UI
  - DataGrid with actions

- **Multi-step Employee Registration**
  - Personal details
  - Employment details
  - Account & security setup
  - Validation & password strength
  - Admin / Employee role selection

> ⚠️ **Current State:**  
> Some frontend flows (like registration) are currently using **mock data / localStorage** due to hackathon time constraints.  
> These will be fully connected to the FastAPI backend in future iterations.

---

## 🔐 Backend Highlights

The backend is fully implemented using **FastAPI** with production-style architecture.

### Core Features
- User Signup & Login (JWT-based)
- Role-based authorization
- Auto employee profile creation on signup
- Protected APIs (Employee, Attendance, Payroll)
- Swagger API documentation

### Example Endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/employees/me`
- `PUT /api/employees/me`
- `POST /api/attendance/`
- `GET /api/attendance/me`

📄 API Docs available at:
```

[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

````

---

## 🚀 Running the Project Locally

### 🔹 Backend Setup (FastAPI)

```bash
cd backend/dayflow-backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
````

Backend runs on:

```
http://127.0.0.1:8000
```

---

### 🔹 Frontend Setup (React)

```bash
cd frontend/dayflow-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 Frontend ↔ Backend Integration Status

| Module               | Status          |
| -------------------- | --------------- |
| Authentication       | ✅ Backend ready |
| Employee APIs        | ✅ Backend ready |
| Attendance APIs      | ✅ Backend ready |
| Frontend UI          | ✅ Implemented   |
| Live API integration | ⏳ Planned       |

> Due to limited hackathon time, **frontend and backend are currently decoupled**.
> The architecture is intentionally designed so integration can be completed seamlessly later.

---

## 🛣️ Future Work

* Connect React forms directly to FastAPI endpoints
* Replace mock/localStorage logic with real APIs
* Add admin dashboards
* Improve role-based UI rendering
* Switch database to PostgreSQL
* Deployment (Docker / Cloud)

---

## 🧪 Notes for Judges / Reviewers

* The project demonstrates **real-world HRMS architecture**
* Focus was on **system design, scalability, and UX**
* Backend APIs are production-ready
* Frontend showcases complex UI workflows
* Integration was scoped intentionally for hackathon feasibility

---

## 👥 Team Collaboration

* Backend and frontend developed independently
* Clear API contracts defined
* Clean separation of concerns
* Easy handoff between team members

---

## 📄 License

This project is built for educational and hackathon purposes.

---

## 🙌 Acknowledgements

* Odoo Hackathon Team
* FastAPI & React communities
* Material UI

---

**Dayflow HRMS — Designed for real workflows, not just demos.**
Just tell me.
