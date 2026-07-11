from datetime import datetime
from typing import Literal

from ninja import Schema


# ==========================================================
# SIGN UP
# ==========================================================

class SignUpSchema(Schema):
    first_name: str
    last_name: str
    email: str
    password: str
    country: str | None = None


# ==========================================================
# SIGN IN
# ==========================================================

class LoginAuthSchema(Schema):
    email: str
    password: str


class LoginSchema(Schema):
    auth: LoginAuthSchema


class SignInAttributesSchema(Schema):
    token: str
    email: str
    name: str
    country: str | None
    createdAt: datetime
    updatedAt: datetime


class SignInDataSchema(Schema):
    id: int
    type: Literal["users"]
    attributes: SignInAttributesSchema


class SignInResponseSchema(Schema):
    data: SignInDataSchema


# ==========================================================
# SIGN OUT
# ==========================================================

class SignOutAttributesSchema(Schema):
    message: str


class SignOutDataSchema(Schema):
    type: Literal["users"]
    attributes: SignOutAttributesSchema


class SignOutResponseSchema(Schema):
    data: SignOutDataSchema


# ==========================================================
# CONTENT CREATE / UPDATE REQUEST
# ==========================================================

class ContentCreateSchema(Schema):
    title: str
    body: str


class ContentUpdateSchema(Schema):
    title: str
    body: str


# ==========================================================
# CONTENT RESPONSE
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