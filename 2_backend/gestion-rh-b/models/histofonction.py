from config.database import Base
from sqlalchemy import Integer, String, Date, Column, ForeignKey
from sqlalchemy.orm import relationship

class HistoFonctionModel(Base):
    __tablename__   = "histofonction"
    idF             = Column(Integer, ForeignKey("fonction.idF"), primary_key = True,index = True)
    cni             = Column(String(12), ForeignKey("personnel.cni"), primary_key = True,index = True)
    dateAffect      = Column(Date, primary_key = True,index = True)

    fonctionObject  = relationship("FonctionModel", back_populates="histoFonction")
    personnel       = relationship("PersonnelModel", back_populates="histoFonction")