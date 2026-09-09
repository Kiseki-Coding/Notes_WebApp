import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.Database.database import Base, engine
from backend.Database import models
from backend.routers import auth, note

Base.metadata.create_all(bind=engine)
app = FastAPI(debug=True)

origins = [
    "http://localhost:5173",
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(note.router, prefix="/notes")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
