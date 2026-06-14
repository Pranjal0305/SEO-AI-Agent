from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    GROQ_API_KEY: str = ""
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB: str = "seo_agent"

    class Config:
        env_file = ".env"

settings = Settings()
