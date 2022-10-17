from datetime import date
from pydantic import BaseModel
from schemas.personnel import PersonnelObject

class ActionBase(BaseModel):
    idAct       : int
    cni         : str
    description : str
    dateAct     : date

class ActionCreate(ActionBase):
    pass

class ActionObject(ActionBase):
    personnelObject : PersonnelObject = {}
    
    class Config:
        orm_mode = True

class Action(ActionObject):

    class Config:
        orm_mode = True