
from typing import List
from pydantic import BaseModel, validator

class PaysBase(BaseModel):
    codeP : int
    isoAlpha2 : str
    isoAlpha3 : str
    nomPFr : str
    nomPAr : str

    @validator('isoAlpha2')
    def isoAlpha2_2_char(cls, v):
        if len(v) != 2:
            raise ValueError("isoAlpha2 doit être plus de 2 caractères")
        return v

    @validator('isoAlpha3')
    def isoAlpha3_3_char(cls, v):
        if len(v) != 3:
            raise ValueError("isoAlpha3 doit être plus de 3 caractères")
        return v
    

class PaysCreate(PaysBase):
    pass

class PaysObject(PaysBase):
    
    class Config:
            orm_mode = True

class Pays(PaysObject):
    regions: List = []

    class Config:
        orm_mode = True