
from fastapi import FastAPI

app = FastAPI(
    title="Food Loss Redistribution Platform",
    description="Connecting surplus food with people in need.",
    version="1.0.0",
)


@app.get("/")
def home():
    return {
        "message": "Welcome to the Food Loss Redistribution Platform!",
        "status": "success",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}