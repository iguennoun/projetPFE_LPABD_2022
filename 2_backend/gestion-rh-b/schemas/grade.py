from typing import List
from pydantic import BaseModel

class GradeBase(BaseModel):
    libelleGFr : str
    libelleGAr : str

class GradeCreate(GradeBase):
    pass

class GradeObject(GradeBase):
    codeG      : int
    class Config:
            orm_mode = True

class Grade(GradeObject):

    class Config:
        orm_mode = True