# 🌸 DayFlow – Human Resource Management System

> **Every workday, perfectly aligned.**

DayFlow is a Human Resource Management System designed to simplify and digitize common HR operations such as employee management, attendance tracking, leave management, departments, reports, payroll visibility, and employee profiles.

## ✨ Features

* 🔐 User authentication and login
* 🛡️ Protected routes and token-based authentication
* 👥 Employee management
* 📊 HR dashboard
* 🕐 Attendance management
* 🌴 Leave management
* 🏢 Department management
* 📈 Reports
* 👤 Employee profile
* 💰 Payroll / salary information
* 🚪 Logout functionality
* 🔄 React frontend connected to Django REST APIs

## 👩‍💻 User Roles

### Admin / HR

* Manage employees
* View attendance
* Manage leave requests
* View departments
* Access reports
* View employee information

### Employee

* View personal profile
* View attendance
* Manage/view leave information
* View available HR information

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Axios
* HTML
* CSS
* JavaScript

### Backend

* Python
* Django
* Django REST Framework
* Django Token Authentication

### Database

* SQLite

## 🏗️ Project Structure

```text
dayflow-with-odoo/
│
├── backend/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── dayflow/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── manage.py
├── db.sqlite3
└── README.md
```

## 🔌 API Endpoints

| Endpoint            | Purpose               |
| ------------------- | --------------------- |
| `/api/login/`       | User authentication   |
| `/api/employees/`   | Employee management   |
| `/api/attendance/`  | Attendance records    |
| `/api/leaves/`      | Leave management      |
| `/api/departments/` | Department management |

## 🚀 How to Run

### Backend

Open a terminal in the project folder and activate the virtual environment:

```bash
.venv\Scripts\activate
```

Run the Django server:

```bash
python manage.py runserver
```

Backend will run at:

```text
http://127.0.0.1:8000/
```

### Frontend

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies if required:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173/
```

## 🔐 Authentication

DayFlow uses Django authentication with token-based authentication.

After successful login, the authentication token is stored on the frontend and protected routes check for the token before allowing access to HRMS pages.

## 🎯 Project Goal

The goal of DayFlow is to provide a centralized and user-friendly HR platform where employees and HR administrators can manage essential HR activities from a single application.

## 👩‍💻 Developer

**Bhavana H A**

DayFlow HRMS – Odoo Hackathon Project
