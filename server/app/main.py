from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.auth.auth_route import auth_router


app = FastAPI()

origins = [
    'http://localhost:5173',
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # This is crucial for cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix='/api')

@app.get("/")
def main():
    return {
        "message": "Hello world"
    }