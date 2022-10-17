from datetime import date
from typing import List
from pydantic import BaseModel
from schemas.ville import VilleObject
from schemas.batiment import BatimentObject
from schemas.niveauetu import NiveauEtuObject

class PersonnelBase(BaseModel):
    ppr                 : int
    cni                 : str
    nomFr               : str
    prenomFr            : str
    nomAr               : str
    prenomAr            : str
    dateNaiss           : date
    sexe                : str
    civilite            : str
    situationFam        : str
    dateRecrutement     : date
    adressePerso        : str = None
    numCartComm         : int = None
    email               : str = None
    telPerso            : str = None
    telProf             : str = None
    echelle             : int
    actif               : bool
    agentComm           : bool
    detacheDe           : bool
    #detacheVers         : bool
    photo               : str = None
    codeV               : int = None
    codeLocal           : int
    idNE                : int

class PersonnelCreate(PersonnelBase):
    pass

class PersonnelObject(PersonnelBase):
    detacheVers     : bool

    villeObject     : VilleObject = None
    batimentObject  : BatimentObject = {}
    niveauEtuObject : NiveauEtuObject = {}
    
    class Config:
        orm_mode = True

class Personnel(PersonnelObject):

    class Config:
        orm_mode = True


