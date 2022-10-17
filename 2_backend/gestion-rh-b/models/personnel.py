from config.database import Base
from sqlalchemy import Integer, String, Date, Boolean, Column, ForeignKey
from sqlalchemy.orm import relationship

from models.historespous import HistoRespoUSModel
from models.histous import HistoUSModel
from models.histofonction import HistoFonctionModel
from models.histograde import HistoGradeModel
from models.histodiplome import HistoDiplomeModel

class PersonnelModel(Base):
    __tablename__         = "personnel"
    ppr                   = Column(Integer, index = True, unique=True, default=None)
    cni                   = Column(String(12), primary_key = True, index = True)
    nomFr                 = Column(String(254))
    prenomFr              = Column(String(254))
    nomAr                 = Column(String(254), default=None)
    prenomAr              = Column(String(254), default=None)
    dateNaiss             = Column(Date, default=None)
    sexe                  = Column(String(1))
    civilite              = Column(String(4))
    situationFam          = Column(String(1))
    dateRecrutement       = Column(Date)
    adressePerso          = Column(String(254))
    numCartComm           = Column(Integer, default=None)
    email                 = Column(String(254), default=None)
    telPerso              = Column(String(20), default=None)
    telProf               = Column(String(20), default=None)
    echelle               = Column(Integer)
    actif                 = Column(Boolean, default=1)
    agentComm             = Column(Boolean, default=0)
    detacheDe             = Column(Boolean, default=0)
    detacheVers           = Column(Boolean, default=0)
    photo                 = Column(String(254), default=None)
    codeV                 = Column(Integer, ForeignKey("ville.codeV"))
    codeLocal             = Column(Integer, ForeignKey("batiment.codeLocal"), default=1)
    idNE                  = Column(Integer, ForeignKey("niveauetu.idNE"))

    villeObject           = relationship("VilleModel", back_populates="personnel")
    batimentObject        = relationship("BatimentModel", back_populates="personnel")
    niveauEtuObject       = relationship("NiveauEtuModel", back_populates="personnel")

    histoRespoUS          = relationship("HistoRespoUSModel", back_populates="personnel")
    histoUS               = relationship("HistoUSModel", back_populates="personnel")
    histoFonction         = relationship("HistoFonctionModel", back_populates="personnel")
    histoGrade            = relationship("HistoGradeModel", back_populates="personnel")
    histoDiplome          = relationship("HistoDiplomeModel", back_populates="personnel")
    
    actions               = relationship("ActionModel", back_populates="personnel")
    # auth
