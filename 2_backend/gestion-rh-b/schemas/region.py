from typing import List
from pydantic import BaseModel
from schemas.pays import PaysObject

class RegionBase(BaseModel):
    codeR      : int
    libelleRFr : str
    libelleRAr : str
    codeP      : int


class RegionCreate(RegionBase):
    pass

class RegionObject(RegionBase):
    paysObject : PaysObject = {}
    
    class Config:
        orm_mode = True

class Region(RegionObject):
    villes: List = []

    class Config:
        orm_mode = True