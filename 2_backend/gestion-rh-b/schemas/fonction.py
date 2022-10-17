from typing import List
from pydantic import BaseModel

class FonctionBase(BaseModel):
    idF : int
    libelleF : str

class FonctionCreate(FonctionBase):
    pass

class FonctionObject(FonctionBase):
    
    class Config:
            orm_mode = True

class Fonction(FonctionObject):

    class Config:
        orm_mode = True