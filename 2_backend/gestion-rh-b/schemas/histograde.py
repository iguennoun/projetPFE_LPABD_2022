from datetime import date
from pydantic import BaseModel
from schemas.grade import GradeObject
from schemas.personnel import PersonnelObject

class HistoGradeBase(BaseModel):
    codeG       : int
    cni         : str
    datePromo   : date

class HistoGradeCreate(HistoGradeBase):
    pass

class HistoGradeObject(HistoGradeBase):
    gradeObject : GradeObject = {}
    personnel : PersonnelObject = {}
    
    class Config:
        orm_mode = True

class HistoGrade(HistoGradeObject):

    class Config:
        orm_mode = True