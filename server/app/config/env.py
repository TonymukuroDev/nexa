from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class EnvConfig(BaseSettings):
    DATABASE_URL: str

    model_config = SettingsConfigDict(env_file=".env")


@lru_cache
def get_config():
    return EnvConfig()
