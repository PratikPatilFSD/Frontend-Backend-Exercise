# SchoolCoreOS – Frontend-Backend Exercise

## Overview

This project is a full-stack application built using:

* **Frontend:** React.js
* **Backend:** Node.js + Express
* **Database:** PostgreSQL

It provides:

* User authentication (JWT)
* Institute & Role selection
* Context-based access (Institute + Role)
* Dashboard with role-based navigation
* Dark/Light theme support

---

# Tech Stack

### Frontend

* React.js
* React Router DOM
* JavaScript (ES6)

### Backend

* Node.js
* Express.js
* PostgreSQL
* JWT (jsonwebtoken)
* bcrypt
* dotenv

---

# ⚙️ How to Run Project

---

## Run Backend

### 1. Go to backend folder

```
cd backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

### 4. Run server

```
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

## Run Frontend

### 1. Go to frontend folder

```
cd frontend
```

### 2. Install dependencies

```
npm install
```

### 3. Start application

```
npm start
```

Frontend will run on:

```
http://localhost:3000
```

---

# Authentication Flow

```
Login
 ↓
Get Institutes & Roles
 ↓
Select Institute
 ↓
Select Role
 ↓
Dashboard
```

---

# API Endpoints

## Auth APIs

### 1. Login

```
POST /auth/login
```

### 2. Get Institutes & Roles

```
GET /auth/my-institutes-roles
Headers:
Authorization: Bearer <pre_token>
```

### 3. Select Context

```
POST /auth/select-context
Headers:
Authorization: Bearer <pre_token>
Body:
{
  tenant_id,
  institute_id,
  role_id
}
```

### 4. Get Current User

```
GET /auth/me
Headers:
Authorization: Bearer <access_token>
```

### 5. Logout

```
POST /auth/logout
```

---

# Login Credentials (Demo Users)

```
Email: a@scos.com
Password: Admin@123   → No institute

Email: b@scos.com
Password: Admin@123   → Single role (direct dashboard)

Email: c@scos.com
Password: Admin@123   → One institute, multiple roles

Email: d@scos.com
Password: Admin@123   → Multiple institutes & roles
```

---

# Application Logic

* No Institute → Alert shown
* Single Role → Direct login
* Single Institute → Skip institute page
* Multiple → Show selection screens

---

# Theme Support

* Dark/Light mode toggle
* Stored in localStorage
* Applied across all pages

---

# Features

* Secure JWT authentication
* Dynamic institute-role mapping
* Clean UI/UX
* Responsive design
* Search functionality
* Backend-driven logic

---

# Author

Pratik Patil
