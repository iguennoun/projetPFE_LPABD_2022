from config.database import Base
from sqlalchemy import String, Integer, Column
from sqlalchemy.orm import relationship

from models.histograde import HistoGradeModel

class GradeModel(Base):
    __tablename__       = "grade"
    codeG           = Column(Integer,primary_key = True,index = True)
    libelleGFr      = Column(String(254), unique=True)
    libelleGAr      = Column(String(254), unique=True)

    histoGrade   = relationship("HistoGradeModel", back_populates="gradeObject")