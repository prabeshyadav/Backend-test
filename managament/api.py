from ninja import NinjaAPI
from .services import signup_service, signin_service
from .schemas import  SignUpSchema,LoginSchema
from django.core.exceptions import ValidationError
from ninja import Router




api = NinjaAPI()


@api.get("/hello")
def hello(request):
    return {"message": "Hello Django Ninja"}

@api.post("/signup")
def signup(request, payload):
    return signup_service(payload)

@api.post("/auth/signup")
def signup(request, payload: SignUpSchema):
    try:
        user = signup_service(payload)

        return {
            "message": "User created successfully.",
            "user": {
                "id": user.id,
                "email": user.email,
            },
        }

    except ValidationError as e:
        return 400, {"message": str(e)}

    except ValueError as e:
        return 409, {"message": str(e)}
    
@api.post("/auth/signin")
def signin(request, payload: LoginSchema):
    try:
        user, tokens = signin_service(payload)

        return {
            "message": "User authenticated successfully.",
            "user": {
                "id": user.id,
                "email": user.email,
            },
            "tokens": tokens,
        }

    except ValueError as e:
        return 401, {"message": str(e)}
