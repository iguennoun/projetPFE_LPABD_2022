
from typing import List
from pydantic import BaseModel

class TypeUSBase(BaseModel):
    codeTypeUS       : int
    libelleTypeUSFr  : str
    libelleTypeUSAr  : str
    

class TypeUSCreate(TypeUSBase):
    pass

class TypeUSObject(TypeUSBase):
    
    class Config:
            orm_mode = True

class TypeUS(TypeUSObject):
    uss: List = []

    class Config:
        orm_mode = True