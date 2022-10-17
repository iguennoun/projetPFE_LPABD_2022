from config.database import Base
from sqlalchemy import Integer, String, Date, Column, ForeignKey
from sqlalchemy.orm import relationship

class HistoDiplomeModel(Base):
    __tablename__    = "histodiplome"
    idNE             = Column(Integer, ForeignKey("niveauetu.idNE"), primary_key = True,index = True)
    codeSpecDip      = Column(Integer, ForeignKey("specdiplome.codeSpecDip"), primary_key = True,index = True)
    cni              = Column(String(12), ForeignKey("personnel.cni"), primary_key = True,index = True)
    dateObtention    = Column(Date, primary_key = True,index = True)

    secDiplomeObject = relationship("SpecDiplomeModel", back_populates="histoDiplome")
    niveauEtuObject  = relationship("NiveauEtuModel", back_populates="histoDiplome")
    personnel        = relationship("PersonnelModel", back_populates="histoDiplome")