from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from config.settings import Settings_DB

db_setting  = Settings_DB()
username    = db_setting["USERNAME"]
password    = db_setting["PASSWORD"]
server      = db_setting["SERVER"]
db          = db_setting["DB"]

SQLALCHEMY_DATABASE_URL = f"mysql://{username}:{password}@{server}/{db}"


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()