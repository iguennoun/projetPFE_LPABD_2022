from typing import List
from pydantic import BaseModel
from schemas.ville import VilleObject

class BatimentBase(BaseModel):
    libelleBFr         : str
    libelleBAr         : str
    adresse            : str = None
    coordGPS           : str = None
    codeV              : int


class BatimentCreate(BatimentBase):
    pass

class BatimentObject(BatimentBase):
    codeLocal   : int
    villeObject : VilleObject = {}
    
    class Config:
        orm_mode = True

class Batiment(BatimentObject):
    personnel: List = []

    class Config:
        orm_mode = True