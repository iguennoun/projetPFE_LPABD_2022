from config.database import Base
from sqlalchemy import String, Integer,Column
from sqlalchemy.orm import relationship

from models.histofonction import HistoFonctionModel

class FonctionModel(Base):
    __tablename__       = "fonction"
    idF                 = Column(Integer,primary_key = True,index = True)
    libelleF            = Column(String(254), unique=True)

    histoFonction       = relationship("HistoFonctionModel", back_populates="fonctionObject")