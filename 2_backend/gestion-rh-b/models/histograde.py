from config.database import Base
from sqlalchemy import Integer, String, Date, Column, ForeignKey
from sqlalchemy.orm import relationship

class HistoGradeModel(Base):
    __tablename__   = "histograde"
    codeG           = Column(Integer, ForeignKey("grade.codeG"), primary_key = True,index = True)
    cni             = Column(String(12), ForeignKey("personnel.cni"), primary_key = True,index = True)
    datePromo       = Column(Date, primary_key = True,index = True)

    gradeObject     = relationship("GradeModel", back_populates="histoGrade")
    personnel       = relationship("PersonnelModel", back_populates="histoGrade")