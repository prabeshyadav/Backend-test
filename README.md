# Backend Test Project

A Django REST API project built with **Django Ninja**, JWT authentication, and PostgreSQL. This project provides a content management system with user authentication and authorization.

## 🎯 Features

- **User Authentication**: Email-based authentication with JWT tokens
- **User Management**: Custom user model with email as unique identifier
- **Content Management**: Create, read, update, and delete content
- **API**: RESTful API built with Django Ninja
- **Authorization**: Permission-based access control
- **Docker Support**: Containerized deployment with Docker and Docker Compose

## 📋 Prerequisites

- Python 3.8+
- PostgreSQL (optional, SQLite for development)
- Docker & Docker Compose (optional, for containerized deployment)

## 🚀 Installation

### Local Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd backend-test
```

2. **Create a virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
Create a `.env` file in the project root:
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

5. **Run migrations**
```bash
python manage.py migrate
```

6. **Create a superuser** (optional)
```bash
python manage.py createsuperuser
```

7. **Start the development server**
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

### Docker Setup

1. **Build and run with Docker Compose**
```bash
docker-compose up --build
```

The API will be available at `http://localhost:8000/api/`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Content Management
- `GET /api/contents` - List all contents
- `POST /api/contents` - Create new content
- `GET /api/contents/{id}` - Get specific content
- `PUT /api/contents/{id}` - Update content
- `PATCH /api/contents/{id}` - Partially update content
- `DELETE /api/contents/{id}` - Delete content

### Health Check
- `GET /api/hello` - API health check endpoint

## 🏗️ Project Structure

```
backend-test/
├── config/                 # Django configuration
│   ├── settings.py        # Project settings
│   ├── urls.py            # URL routing
│   ├── wsgi.py            # WSGI configuration
│   └── asgi.py            # ASGI configuration
├── managament/             # Main application
│   ├── models.py          # Database models
│   ├── api.py             # API endpoints
│   ├── auth.py            # Authentication logic
│   ├── permissions.py     # Permission classes
│   ├── schemas.py         # Pydantic schemas
│   ├── services.py        # Business logic
│   ├── managers.py        # Custom model managers
│   ├── views.py           # Views
│   ├── admin.py           # Admin configuration
│   ├── migrations/        # Database migrations
│   └── test/              # Test suite
│       ├── test_auth_api.py
│       ├── test_content_api.py
│       └── test_models.py
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
└── entrypoint.sh          # Docker entrypoint script
```

## 📦 Dependencies

Key dependencies include:
- **Django** 5.2.16 - Web framework
- **Django Ninja** 1.6.2 - Fast API framework for Django
- **django-ninja-jwt** 5.4.4 - JWT authentication
- **Pydantic** 2.13.4 - Data validation
- **PostgreSQL** - Database (optional, SQLite for development)
- **Gunicorn** 26.0.0 - WSGI HTTP Server

For the complete list, see [requirements.txt](requirements.txt).

## 🧪 Testing

Run the test suite:
```bash
python manage.py test
```

Run specific test file:
```bash
python manage.py test managament.tests.test_auth_api
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. 

1. Sign up a new user at `/api/auth/signup`
2. Login at `/api/auth/login` to receive access token
3. Include the token in request headers:
```bash
Authorization: Bearer <your-jwt-token>
```

## 🗄️ Models

### User Model
- Email (unique)
- Country
- Created/Updated timestamps
- Custom authentication using email instead of username

### Content Model
- Owner (ForeignKey to User)
- Title
- Body
- Created/Updated timestamps

## 🛠️ Development

### Making Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Creating Admin Users
```bash
python manage.py createsuperuser
```

### Database Shell
```bash
python manage.py dbshell
```

## 🚢 Deployment

### Using Gunicorn
```bash
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

### Using Docker
```bash
docker-compose up -d
```

## 📝 Environment Variables

- `DEBUG` - Enable debug mode (True/False)
- `SECRET_KEY` - Django secret key
- `ALLOWED_HOSTS` - Comma-separated list of allowed hosts
- `DATABASE_URL` - Database connection URL
- `JWT_SECRET` - JWT secret key (if different from Django SECRET_KEY)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write tests for new features
4. Run tests to ensure everything works
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions, please open an issue in the repository.
