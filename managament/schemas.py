from datetime import datetime
from typing import Literal

from ninja import Schema


# ==========================================================
# SIGN UP REQUEST
# ==========================================================

class SignUpSchema(Schema):
    first_name: str
    last_name: str
    email: str
    password: str
    country: str | None = None


# ==========================================================
# SIGN IN REQUEST
# ==========================================================

class LoginAuthSchema(Schema):
    email: str
    password: str


class LoginSchema(Schema):
    auth: LoginAuthSchema


# ==========================================================
# SIGN IN RESPONSE
# ==========================================================

class SignInAttributesSchema(Schema):
    token: str
    email: str
    name: str
    country: str | None = None
    createdAt: datetime
    updatedAt: datetime


class SignInDataSchema(Schema):
    id: int
    type: Literal["users"]
    attributes: SignInAttributesSchema


class SignInResponseSchema(Schema):
    data: SignInDataSchema


# ==========================================================
# SIGN OUT RESPONSE
# ==========================================================

class SignOutAttributesSchema(Schema):
    message: str


class SignOutDataSchema(Schema):
    type: Literal["users"]
    attributes: SignOutAttributesSchema


class SignOutResponseSchema(Schema):
    data: SignOutDataSchema


# ==========================================================
# CONTENT REQUEST SCHEMAS
# ==========================================================

# POST /contents
class ContentCreateSchema(Schema):
    title: str
    body: str


# PUT /contents/{id}
class ContentUpdateSchema(Schema):
    title: str
    body: str


# PATCH /contents/{id}
class ContentPartialUpdateSchema(Schema):
    title: str | None = None
    body: str | None = None


# ==========================================================
# CONTENT RESPONSE SCHEMAS
# ==========================================================

class ContentAttributesSchema(Schema):
    title: str
    body: str
    createdAt: datetime
    updatedAt: datetime


class ContentDataSchema(Schema):
    id: int
    type: Literal["content"]
    attributes: ContentAttributesSchema


class ContentResponseSchema(Schema):
    data: ContentDataSchema


# ==========================================================
# ERROR RESPONSE
# ==========================================================

class ErrorResponseSchema(Schema):
    message: str