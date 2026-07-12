from django.db import transaction
from django.contrib.auth import authenticate
from .auth import generate_tokens
from django.shortcuts import get_object_or_404

from .models import User, Content


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

def create_content_service(user, payload):
    """
    Create a new content entry for the authenticated user.
    """

    content = Content.objects.create(
        owner=user,
        title=payload.title,
        body=payload.body,
    )

    return content


def get_all_contents_service():
    """
    Retrieve all content entries.
    """
    return Content.objects.select_related("owner").all()



def get_content_service(content_id):
    return get_object_or_404(Content, id=content_id)





def update_content_service(user, content_id, payload):

    content = get_object_or_404(Content, id=content_id)

    if content.owner != user:
        raise PermissionError("Permission denied.")

    content.title = payload.title
    content.body = payload.body

    content.save()

    return content

def partial_update_content_service(user, content_id, payload):

    content = get_object_or_404(Content, id=content_id)

    if content.owner != user:
        raise PermissionError("Permission denied.")

    if payload.title is not None:
        content.title = payload.title

    if payload.body is not None:
        content.body = payload.body

    content.save()

    return content

def delete_content_service(user, content_id):

    content = get_object_or_404(Content, id=content_id)

    if content.owner != user:
        raise PermissionError("Permission denied.")

    content.delete()