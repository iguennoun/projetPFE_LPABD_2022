from datetime import date
from pydantic import BaseModel
from schemas.us import USObject
from schemas.personnel import PersonnelObject

class HistoRespoUSBase(BaseModel):
    codeUS                    : int
    cni                       : str
    dateAffectionRespo        : date = None
    dateFinAffectationRespo   : date = None
    interim                   : bool
    note                      : str = None


class HistoRespoUSCreate(HistoRespoUSBase):
    pass

class HistoRespoUSObject(HistoRespoUSBase):
    usObject  : USObject = {}
    personnel : PersonnelObject = {}
    
    class Config:
        orm_mode = True

class HistoRespoUS(HistoRespoUSObject):

    class Config:
        orm_mode = True