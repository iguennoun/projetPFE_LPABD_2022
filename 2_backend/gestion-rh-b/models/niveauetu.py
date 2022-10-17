from config.database import Base
from sqlalchemy import String, Integer, Column
from sqlalchemy.orm import relationship

from models.histodiplome import HistoDiplomeModel
from schemas.personnel import Personnel

class NiveauEtuModel(Base):
    __tablename__    = "niveauetu"
    idNE             = Column(Integer,primary_key = True,index = True)
    anneeABac        = Column(String(254), unique=True)
    titreDip         = Column(String(254), unique=True)
    niveauDip        = Column(Integer, unique=True)

    histoDiplome     = relationship("HistoDiplomeModel", back_populates="niveauEtuObject")
    personnel        = relationship("PersonnelModel", back_populates="niveauEtuObject")