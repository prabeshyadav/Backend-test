from django.core.exceptions import ValidationError
from django.http import Http404

from ninja import NinjaAPI
from ninja_jwt.authentication import JWTAuth

from .schemas import (
    SignUpSchema,
    LoginSchema,
    SignInResponseSchema,
    ContentCreateSchema,
    ContentUpdateSchema,
    ContentPartialUpdateSchema,
    ContentResponseSchema,
    ErrorResponseSchema,
)

from .services import (
    signup_service,
    signin_service,
    create_content_service,
    get_all_contents_service,
    get_content_service,
    update_content_service,
    partial_update_content_service,
    delete_content_service,
)


api = NinjaAPI()


# ==========================================================
# TEST
# ==========================================================

@api.get("/hello")
def hello(request):
    return {"message": "Hello Django Ninja"}


# ==========================================================
# SIGN UP
# ==========================================================

@api.post(
    "/auth/signup",
    response={
        201: ErrorResponseSchema,
        400: ErrorResponseSchema,
        409: ErrorResponseSchema,
    },
)
def signup(request, payload: SignUpSchema):
    try:
        user = signup_service(payload)

        return 201, {
            "message": "User created successfully."
        }

    except ValidationError as e:
        return 400, {
            "message": str(e)
        }

    except ValueError as e:
        return 409, {
            "message": str(e)
        }


# ==========================================================
# SIGN IN
# ==========================================================

@api.post(
    "/auth/signin",
    response={
        200: SignInResponseSchema,
        401: ErrorResponseSchema,
    },
)
def signin(request, payload: LoginSchema):
    try:
        user, tokens = signin_service(payload)

        return {
            "data": {
                "id": user.id,
                "type": "users",
                "attributes": {
                    "token": tokens["access"],
                    "email": user.email,
                    "name": f"{user.first_name} {user.last_name}",
                    "country": user.country,
                    "createdAt": user.created_at,
                    "updatedAt": user.updated_at,
                },
            }
        }

    except ValueError as e:
        return 401, {
            "message": str(e)
        }


# ==========================================================
# CREATE CONTENT
# ==========================================================

@api.post(
    "/contents",
    auth=JWTAuth(),
    response={
        200: ContentResponseSchema,
        401: ErrorResponseSchema,
    },
)
def create_content(request, payload: ContentCreateSchema):

    content = create_content_service(
        request.user,
        payload,
    )

    return {
        "data": {
            "id": content.id,
            "type": "content",
            "attributes": {
                "title": content.title,
                "body": content.body,
                "createdAt": content.created_at,
                "updatedAt": content.updated_at,
            },
        }
    }


# ==========================================================
# LIST CONTENTS
# ==========================================================

@api.get(
    "/contents",
    auth=JWTAuth(),
    response={
        200: dict,
        401: ErrorResponseSchema,
    },
)
def list_contents(request):

    contents = get_all_contents_service()

    return {
        "data": [
            {
                "id": content.id,
                "type": "content",
                "attributes": {
                    "title": content.title,
                    "body": content.body,
                    "createdAt": content.created_at,
                    "updatedAt": content.updated_at,
                },
            }
            for content in contents
        ]
    }


# ==========================================================
# RETRIEVE CONTENT
# ==========================================================

@api.get(
    "/contents/{content_id}",
    auth=JWTAuth(),
    response={
        200: ContentResponseSchema,
        401: ErrorResponseSchema,
        404: ErrorResponseSchema,
    },
)
def retrieve_content(request, content_id: int):
    try:
        content = get_content_service(content_id)

        return {
            "data": {
                "id": content.id,
                "type": "content",
                "attributes": {
                    "title": content.title,
                    "body": content.body,
                    "createdAt": content.created_at,
                    "updatedAt": content.updated_at,
                },
            }
        }

    except Http404:
        return 404, {
            "message": "Content not found."
        }


# ==========================================================
# UPDATE CONTENT
# ==========================================================
@api.put(
    "/contents/{content_id}",
    auth=JWTAuth(),
    response={
        200: ContentResponseSchema,
        401: ErrorResponseSchema,
        403: ErrorResponseSchema,
        404: ErrorResponseSchema,
    },
)
def replace_content(request, content_id: int, payload: ContentUpdateSchema):
    try:
        content = update_content_service(
            request.user,
            content_id,
            payload,
        )

        return {
            "data": {
                "id": content.id,
                "type": "content",
                "attributes": {
                    "title": content.title,
                    "body": content.body,
                    "createdAt": content.created_at,
                    "updatedAt": content.updated_at,
                },
            }
        }

    except PermissionError:
        return 403, {
            "message": "You don't have permission to update this content."
        }

    except Http404:
        return 404, {
            "message": "Content not found."
        }
        
        
        
@api.patch(
    "/contents/{content_id}",
    auth=JWTAuth(),
    response={
        200: ContentResponseSchema,
        401: ErrorResponseSchema,
        403: ErrorResponseSchema,
        404: ErrorResponseSchema,
    },
)
def partial_update_content(
    request,
    content_id: int,
    payload: ContentPartialUpdateSchema,
):
    try:
        content = partial_update_content_service(
            request.user,
            content_id,
            payload,
        )

        return {
            "data": {
                "id": content.id,
                "type": "content",
                "attributes": {
                    "title": content.title,
                    "body": content.body,
                    "createdAt": content.created_at,
                    "updatedAt": content.updated_at,
                },
            }
        }

    except PermissionError:
        return 403, {
            "message": "You don't have permission to update this content."
        }

    except Http404:
        return 404, {
            "message": "Content not found."
        }


# ==========================================================
# DELETE CONTENT
# ==========================================================

@api.delete(
    "/contents/{content_id}",
    auth=JWTAuth(),
    response={
        200: ErrorResponseSchema,
        401: ErrorResponseSchema,
        403: ErrorResponseSchema,
        404: ErrorResponseSchema,
    },
)
def delete_content(request, content_id: int):

    try:
        delete_content_service(
            request.user,
            content_id,
        )

        return {
            "message": "Content deleted successfully."
        }

    except PermissionError:
        return 403, {
            "message": "You don't have permission to delete this content."
        }

    except Http404:
        return 404, {
            "message": "Content not found."
        }