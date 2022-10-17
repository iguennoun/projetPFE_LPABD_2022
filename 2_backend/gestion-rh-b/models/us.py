from config.database import Base
from sqlalchemy import String, Integer, Boolean, Column, ForeignKey
from sqlalchemy.orm import relationship

from models.histous import HistoUSModel
from models.historespous import HistoRespoUSModel

class USModel(Base):
    __tablename__   = "us"
    codeUS          = Column(Integer,primary_key = True,index = True)
    libelleUSFr     = Column(String(254), unique=True)
    libelleUSAr     = Column(String(254), unique=True, default=None)
    codeUSParent    = Column(Integer, ForeignKey("us.codeUS"), default=None)
    codeTypeUS      = Column(Integer, ForeignKey("typeus.codeTypeUS"))
    etat            = Column(Boolean, default=True)

    typeUSObject    = relationship("TypeUSModel", back_populates="uss")
    histoUS         = relationship("HistoUSModel", back_populates="usObject")
    histoRespoUS    = relationship("HistoRespoUSModel", back_populates="usObject")
