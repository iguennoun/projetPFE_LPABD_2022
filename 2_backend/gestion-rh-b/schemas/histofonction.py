from datetime import date
from pydantic import BaseModel
from schemas.fonction import FonctionObject
from schemas.personnel import PersonnelObject

class HistoFonctionBase(BaseModel):
    idF         : int
    cni         : str
    dateAffect  : date

class HistoFonctionCreate(HistoFonctionBase):
    pass

class HistoFonctionObject(HistoFonctionBase):
    fonctionObject  : FonctionObject = {}
    personnel: PersonnelObject = {}
    
    class Config:
        orm_mode = True

class HistoFonction(HistoFonctionObject):

    class Config:
        orm_mode = True