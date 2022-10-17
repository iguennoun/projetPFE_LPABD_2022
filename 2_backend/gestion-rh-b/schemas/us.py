from typing import List
from pydantic import BaseModel
from schemas.typeus import TypeUSObject


class USBase(BaseModel):
    codeUS          : int
    libelleUSFr     : str
    libelleUSAr     : str
    codeUSParent    : int
    codeTypeUS      : int
    etat            : bool


class USCreate(USBase):
    pass

class USObject(USBase):
    typeUSObject       : TypeUSObject = {}

    class Config:
        orm_mode = True

class US(USObject):
    us_s: List = []

    class Config:
        orm_mode = True