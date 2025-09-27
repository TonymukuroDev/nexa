from fastapi import FastAPI
from .core.auth.auth_route import auth_router


app = FastAPI()

app.include_router(auth_router, prefix='/api')

@app.get("/")
def main():
    return {
        "message": "Hello world"
    }