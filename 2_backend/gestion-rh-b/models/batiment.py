from config.database import Base
from sqlalchemy import String, Text, Integer, Column, ForeignKey
from sqlalchemy.orm import relationship

from models.personnel import PersonnelModel

class BatimentModel(Base):
    __tablename__       = "batiment"
    codeLocal           = Column(Integer,primary_key = True,index = True, autoincrement=True)
    libelleBFr          = Column(String(254), unique=True)
    libelleBAr          = Column(String(254), unique=True)
    adresse             = Column(Text, unique=True, default=None)
    coordGPS            = Column(String(254), unique=True, default=None)
    codeV               = Column(Integer, ForeignKey("ville.codeV"))

    villeObject         = relationship("VilleModel", back_populates="batiments")
    personnel           = relationship("PersonnelModel", back_populates="batimentObject")