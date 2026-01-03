from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Dayflow HRMS"
    SECRET_KEY: str = "CHANGE_THIS_SECRET"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    DATABASE_URL: str = "sqlite:///./dayflow.db"

    class Config:
        env_file = ".env"

settings = Settings()
