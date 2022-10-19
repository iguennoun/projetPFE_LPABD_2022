from config.database import Base
from sqlalchemy import String, Integer,Column
from sqlalchemy.orm import relationship

from models.us import USModel

class TypeUSModel(Base):
    __tablename__       = "typeus"
    codeTypeUS          = Column(Integer,primary_key = True,index = True,autoincrement=True)
    libelleTypeUSFr     = Column(String(254), unique=True)
    libelleTypeUSAr     = Column(String(254), unique=True, default=None)

    uss                 = relationship("USModel", back_populates="typeUSObject")