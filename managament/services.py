from django.db import transaction
from django.contrib.auth import authenticate
from .auth import generate_tokens

from .models import User


@transaction.atomic
def signup_service(payload):
    """
    Create a new user account.
    """

    if User.objects.filter(email=payload.email).exists():
        raise ValueError("Email already exists.")

    user = User.objects.create_user(
        first_name=payload.first_name,
        last_name=payload.last_name,
        email=payload.email,
        password=payload.password,
        country=payload.country,
    )

    return user

def signin_service(payload):
    """
    Authenticate a user and return JWT tokens.
    """

    user = authenticate(email=payload.auth.email, password=payload.auth.password)

    if user is None:
        raise ValueError("Invalid email or password.")
    
    tokens = generate_tokens(user)

    return user, tokens