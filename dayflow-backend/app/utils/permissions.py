# app/utils/permissions.py

def is_admin(user: dict) -> bool:
    return user.get("role") == "ADMIN"
