from config.database import Base
from sqlalchemy import Integer, String, Date, Column, ForeignKey
from sqlalchemy.orm import relationship

class HistoUSModel(Base):
    __tablename__       = "histous"
    codeUS              = Column(Integer, ForeignKey("us.codeUS"), primary_key = True,index = True)
    cni                 = Column(String(12), ForeignKey("personnel.cni"), primary_key = True,index = True)
    dateAffectation     = Column(Date, primary_key = True,index = True)
    dateFinAffectation  = Column(Date)

    usObject            = relationship("USModel", back_populates="histoUS")
    personnel           = relationship("PersonnelModel", back_populates="histoUS")
