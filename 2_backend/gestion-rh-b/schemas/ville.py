from typing import List
from pydantic import BaseModel
from schemas.region import RegionObject

class VilleBase(BaseModel):
    codeV : int
    nomVFr : str
    nomVAr : str
    codeR : int


class VilleCreate(VilleBase):
    pass

class VilleObject(VilleBase):
    regionObject : RegionObject = {}
    
    class Config:
        orm_mode = True

class Ville(VilleObject):
    batiments: List = []

    class Config:
        orm_mode = True