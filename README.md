# Backend Test Project

A RESTful Content Management API built with **Django**, **Django Ninja**, **JWT Authentication**, **PostgreSQL**, and **Docker**. The project implements secure user authentication, content management, and permission-based authorization following REST API best practices.

---

# 🚀 Live Demo

* **Application:** https://backend-test-3-7ii6.onrender.com/
* **Swagger API Documentation:** https://backend-test-3-7ii6.onrender.com/api/docs
* **OpenAPI Schema:** https://backend-test-3-7ii6.onrender.com/api/openapi.json

---

# 🛠 Tech Stack

* Python 3.12
* Django 5.2
* Django Ninja
* Django Ninja JWT
* PostgreSQL
* Docker & Docker Compose
* Gunicorn
* Render

---

# ✨ Features

* Email-based user authentication
* JWT Authentication
* Custom User model
* Content CRUD operations
* Service Layer architecture
* Permission-based authorization
* Dockerized development environment
* PostgreSQL database
* Interactive Swagger documentation

---

# 🔒 Authorization Rules

* Any authenticated user can create unlimited contents.
* Each content belongs to exactly one user.
* Any authenticated user can view all contents.
* Only the owner of a content can update it.
* Only the owner of a content can delete it.

---

# 📁 Project Structure

```text
backend-test/
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── managament/
│   ├── admin.py
│   ├── api.py
│   ├── auth.py
│   ├── managers.py
│   ├── models.py
│   ├── permissions.py
│   ├── schemas.py
│   ├── services.py
│   ├── migrations/
│   └── ...
│
├── Dockerfile
├── docker-compose.yml
├── entrypoint.sh
├── requirements.txt
├── manage.py
└── README.md
```

---

# 🚀 Installation

## Clone the Repository

```bash
git clone <your-repository-url>
cd backend-test
```

---

## Local Installation

### Create Virtual Environment

```bash
python -m venv venv
```

Linux/macOS

```bash
source venv/bin/activate
```

Windows

```bash
venv\Scripts\activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Create Environment Variables

Create a `.env` file in the project root.

```env
DEBUG=True

SECRET_KEY=your-secret-key

ALLOWED_HOSTS=localhost,127.0.0.1

DATABASE_URL=sqlite:///db.sqlite3
```

---

### Apply Migrations

```bash
python manage.py migrate
```

---

### Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

---

### Run Development Server

```bash
python manage.py runserver
```

API:

```
http://127.0.0.1:8000/api/
```

Swagger:

```
http://127.0.0.1:8000/api/docs
```

---

# 🐳 Docker Setup

Build and run the entire full-stack application (Frontend + Backend + PostgreSQL):

```bash
docker compose up --build
```

Access the services:
* **Frontend Web App:** `http://localhost:5173`
* **Django Backend API:** `http://localhost:8000/api/`
* **Swagger Documentation:** `http://localhost:8000/api/docs`

Run in background:

```bash
docker compose up -d
```

Stop containers:

```bash
docker compose down
```

Apply migrations:

```bash
docker compose exec web python manage.py migrate
```

Create superuser:

```bash
docker compose exec web python manage.py createsuperuser
```

---

# 📚 API Endpoints

## Authentication

| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| POST   | `/api/auth/signup` | Register a new user         |
| POST   | `/api/auth/signin` | Login and receive JWT token |

---

## Contents

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| GET    | `/api/contents`      | List all contents        |
| GET    | `/api/contents/{id}` | Retrieve single content  |
| POST   | `/api/contents`      | Create content           |
| PUT    | `/api/contents/{id}` | Replace content          |
| PATCH  | `/api/contents/{id}` | Partially update content |
| DELETE | `/api/contents/{id}` | Delete content           |

---

## Test Endpoint

| Method | Endpoint     |
| ------ | ------------ |
| GET    | `/api/hello` |

---

# 🔑 Authentication

The API uses JWT Authentication.

### Step 1

Create an account

```
POST /api/auth/signup
```

### Step 2

Sign in

```
POST /api/auth/signin
```

You'll receive a JWT access token.

### Step 3

Include the token in every protected request.

```
Authorization: Bearer <access_token>
```

---

# 📖 API Documentation

Interactive Swagger documentation is available at:

Local

```
http://127.0.0.1:8000/api/docs
```

Production

```
https://backend-test-3-7ii6.onrender.com/api/docs
```

---

# 🗄 Database Models

## User

* First Name
* Last Name
* Email (Unique)
* Country
* Password
* Created At
* Updated At

---

## Content

* Owner (Foreign Key → User)
* Title
* Body
* Created At
* Updated At

---

# ⚙ Environment Variables

| Variable      | Description                      |
| ------------- | -------------------------------- |
| DEBUG         | Enable/Disable Debug Mode        |
| SECRET_KEY    | Django Secret Key                |
| ALLOWED_HOSTS | Allowed Hosts                    |
| DATABASE_URL  | PostgreSQL/SQLite Connection URL |

---

# 🚀 Deployment

The application is deployed on **Render**.

**Application**

https://backend-test-3-7ii6.onrender.com/

**Swagger**

https://backend-test-3-7ii6.onrender.com/api/docs

---

# 📦 Main Dependencies

* Django 5.2
* Django Ninja
* Django Ninja JWT
* PostgreSQL
* Gunicorn
* Pydantic
* Docker

---

# 📝 Notes

* Authentication is email-based.
* JWT is required for all protected endpoints.
* Contents can only be updated or deleted by their owner.
* Any authenticated user can view all contents.
* The project follows a Service Layer architecture to separate business logic from API views.
