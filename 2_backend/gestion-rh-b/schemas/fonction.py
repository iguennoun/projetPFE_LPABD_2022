from typing import List
from pydantic import BaseModel

class FonctionBase(BaseModel):
    libelleF : str

class FonctionCreate(FonctionBase):
    pass

class FonctionObject(FonctionBase):
    idF : int
    class Config:
            orm_mode = True

class Fonction(FonctionObject):

    class Config:
        orm_mode = True