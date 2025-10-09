from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class EnvConfig(BaseSettings):
    DATABASE_URL: str
    ACCESS_TOKEN_SECRET:str
    ACCESS_TOKEN_EXPIRES_MINUTES: int
    REFRESH_TOKEN_SECRET: str
    REFRESH_TOKEN_EXPIRES_DAYS: int
    ALGORITHM: str

    model_config = SettingsConfigDict(env_file=".env")


@lru_cache
def get_config():
    return EnvConfig()
