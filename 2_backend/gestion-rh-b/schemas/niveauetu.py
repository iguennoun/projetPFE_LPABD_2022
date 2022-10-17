from typing import List
from pydantic import BaseModel

class NiveauEtuBase(BaseModel):
    idNE        : int
    anneeABac   : str
    titreDip    : str
    niveauDip   : str

class NiveauEtuCreate(NiveauEtuBase):
    pass

class NiveauEtuObject(NiveauEtuBase):
    
    class Config:
            orm_mode = True

class NiveauEtu(NiveauEtuObject):

    class Config:
        orm_mode = True