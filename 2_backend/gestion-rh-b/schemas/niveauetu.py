from typing import List
from pydantic import BaseModel

class NiveauEtuBase(BaseModel):
    anneeABac   : str
    titreDip    : str
    niveauDip   : str

class NiveauEtuCreate(NiveauEtuBase):
    pass

class NiveauEtuObject(NiveauEtuBase):
    idNE : int
    class Config:
            orm_mode = True

class NiveauEtu(NiveauEtuObject):

    class Config:
        orm_mode = True