# database.py
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker, declarative_base
from decouple import config

DATABASE_URL = config("DATABASE_URL", default="sqlite:///./test.db")

# You can use any database here

#engine is the database connection
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

#Creates the database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
metadata = MetaData()

Base = declarative_base()

#function that gives the API request a database session and closes it after the request is done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)