from datetime import date
from pydantic import BaseModel
from schemas.niveauetu import NiveauEtuObject
from schemas.specdiplome import SpecDiplomeObject
from schemas.personnel import PersonnelObject

class HistoDiplomeBase(BaseModel):
    idNE            : int
    codeSpecDip     : int
    cni             : str
    dateObtention   : date 


class HistoDiplomeCreate(HistoDiplomeBase):
    pass

class HistoDiplomeObject(HistoDiplomeBase):
    niveauEtuObject : NiveauEtuObject = {}
    specDiplomeObject : SpecDiplomeObject = {}
    personnel : PersonnelObject = {}
    
    class Config:
        orm_mode = True

class HistoDiplome(HistoDiplomeObject):

    class Config:
        orm_mode = True