from config.database import SessionLocal

#To open session to the database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()