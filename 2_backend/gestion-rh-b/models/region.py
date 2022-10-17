from config.database import Base
from sqlalchemy import String, Integer, Column, ForeignKey
from sqlalchemy.orm import relationship

from models.ville import VilleModel

class RegionModel(Base):
    __tablename__   = "region"
    codeR           = Column(Integer,primary_key = True, index = True)
    libelleRFr      = Column(String(254), unique=True)
    libelleRAr      = Column(String(254), unique=True)
    codeP           = Column(Integer, ForeignKey("pays.codeP"))

    paysObject      = relationship("PaysModel", back_populates="regions")
    villes          = relationship("VilleModel", back_populates="regionObject")