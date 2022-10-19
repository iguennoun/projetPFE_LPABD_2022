from typing import List
from pydantic import BaseModel

class SpecDiplomeBase(BaseModel):
    intituleSpec   : str

class SpecDiplomeCreate(SpecDiplomeBase):
    pass

class SpecDiplomeObject(SpecDiplomeBase):
    codeSpecDip : int
    class Config:
            orm_mode = True

class SpecDiplome(SpecDiplomeObject):

    class Config:
        orm_mode = True