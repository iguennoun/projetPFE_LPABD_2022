from config.database import Base
from sqlalchemy import String, Integer, Column
from sqlalchemy.orm import relationship

from models.histodiplome import HistoDiplomeModel

class SpecDiplomeModel(Base):
    __tablename__    = "specdiplome"
    codeSpecDip      = Column(Integer,primary_key = True,index = True)
    intituleSpec     = Column(String(254), unique=True)

    histoDiplome   = relationship("HistoDiplomeModel", back_populates="secDiplomeObject")