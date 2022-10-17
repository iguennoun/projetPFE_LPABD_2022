from config.database import Base
from sqlalchemy import Integer, String, Date, Column, ForeignKey
from sqlalchemy.orm import relationship

class ActionModel(Base):
    __tablename__   = "action"
    idAct           = Column(Integer, primary_key = True,index = True)
    cni             = Column(String(12), ForeignKey("personnel.cni"))
    description     = Column(String(254))
    dateAct         = Column(Date)

    personnel       = relationship("PersonnelModel", back_populates="actions")