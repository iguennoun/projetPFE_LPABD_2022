
from datetime import date
from pydantic import BaseModel
from schemas.us import USObject
from schemas.personnel import PersonnelObject

class HistoUSBase(BaseModel):
    codeUS               : int
    cni                  : str
    dateAffection        : date = None
    dateFinAffectation   : date = None

class HistoUSCreate(HistoUSBase):
    pass

class HistoUSObject(HistoUSBase):
    usObject  : USObject = {}
    personnel : PersonnelObject = {}
    
    class Config:
        orm_mode = True

class HistoUS(HistoUSObject):

    class Config:
        orm_mode = True