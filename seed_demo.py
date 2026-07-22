import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from managament.models import User, Content

def seed():
    print("🌱 Seeding demo user and content...")
    email = "demo@lumina.io"
    user = User.objects.filter(email=email).first()
    if not user:
        user = User.objects.create_user(
            email=email,
            password="DemoPassword123!",
            first_name="Alex",
            last_name="Rivers",
            country="United States"
        )
        print("✅ Demo user created: demo@lumina.io / DemoPassword123!")
    else:
        print("ℹ️ Demo user already exists.")

    demo_articles = [
        {
            "title": "Welcome to Lumina Content Management System",
            "body": "Lumina CMS is a high-performance content platform built with Django Ninja REST APIs, JWT authentication, and a modern glassmorphic Vite single-page application interface."
        },
        {
            "title": "Building Scalable REST APIs with Django Ninja & Pydantic",
            "body": "Django Ninja combines Django's robust ORM with FastAPI-like Pydantic data schemas, providing type validation, instant OpenAPI documentation, and high execution speed."
        },
        {
            "title": "State-of-the-Art JWT Authentication & Session Guards",
            "body": "Security is built in. Each request is verified with Bearer JWT tokens, ensuring strict owner-based CRUD permissions across all content resources."
        }
    ]

    for item in demo_articles:
        if not Content.objects.filter(title=item["title"]).exists():
            Content.objects.create(
                owner=user,
                title=item["title"],
                body=item["body"]
            )
            print(f"✅ Created article: {item['title']}")

    print("🎉 Seeding complete!")

if __name__ == "__main__":
    seed()
