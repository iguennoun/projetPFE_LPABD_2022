from typing import List
from pydantic import BaseModel

class SpecDiplomeBase(BaseModel):
    codeSpecDip    : int
    intituleSpec   : str

class SpecDiplomeCreate(SpecDiplomeBase):
    pass

class SpecDiplomeObject(SpecDiplomeBase):
    
    class Config:
            orm_mode = True

class SpecDiplome(SpecDiplomeObject):

    class Config:
        orm_mode = True