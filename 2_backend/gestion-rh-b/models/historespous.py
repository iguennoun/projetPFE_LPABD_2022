from config.database import Base
from sqlalchemy import Integer, String, Date, Boolean, Column, ForeignKey
from sqlalchemy.orm import relationship

class HistoRespoUSModel(Base):
    __tablename__            = "historespous"
    codeUS                   = Column(Integer, ForeignKey("us.codeUS"), primary_key = True,index = True)
    cni                      = Column(String(12), ForeignKey("personnel.cni"), primary_key = True,index = True)
    dateAffectationRespo     = Column(Date, primary_key = True, index = True)
    dateFinAffectationRespo  = Column(Date, default=None)
    interim                  = Column(Boolean, default=0)
    note                     = Column(String(254), default=None)

    usObject                 = relationship("USModel", back_populates="histoRespoUS")
    personnel                = relationship("PersonnelModel", back_populates="histoRespoUS")
