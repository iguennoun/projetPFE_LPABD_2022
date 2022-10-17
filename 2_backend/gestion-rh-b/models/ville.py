from config.database import Base
from sqlalchemy import String, Integer,Column, ForeignKey
from sqlalchemy.orm import relationship

from models.batiment import BatimentModel
from models.personnel import PersonnelModel

class VilleModel(Base):
    __tablename__   = "ville"
    codeV           = Column(Integer,primary_key = True,index = True)
    nomVFr          = Column(String(254), unique=True)
    nomVAr          = Column(String(254), unique=True)
    codeR           = Column(Integer, ForeignKey("region.codeR"))

    regionObject      = relationship("RegionModel", back_populates="villes")
    
    batiments         = relationship("BatimentModel", back_populates="villeObject")

    personnel         = relationship("PersonnelModel", back_populates="villeObject")