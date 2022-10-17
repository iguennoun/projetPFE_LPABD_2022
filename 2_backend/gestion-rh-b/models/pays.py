from config.database import Base
from sqlalchemy import String, Integer, Column
from sqlalchemy.orm import relationship

from models.region import RegionModel

class PaysModel(Base):
    __tablename__   = "pays"
    codeP           = Column(Integer,primary_key = True,index = True)
    isoAlpha2       = Column(String(254), unique=True)
    isoAlpha3       = Column(String(254), unique=True, default=None)
    nomPFr          = Column(String(254), unique=True)
    nomPAr          = Column(String(254), unique=True, default=None)

    regions         = relationship("RegionModel", back_populates="paysObject")