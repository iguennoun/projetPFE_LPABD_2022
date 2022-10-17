from datetime import date
from sqlalchemy.orm import Session
from models.histograde import HistoGradeModel
from schemas.histograde import HistoGradeCreate

async def CreateHistoGrade(db:Session, histograde:HistoGradeCreate):
    histograde_db = HistoGradeModel(codeG=histograde.codeG, cni=histograde.cni, datePromo=histograde.datePromo)
    db.add(histograde_db)
    db.commit()
    db.refresh(histograde_db)
    return histograde_db

async def UpdateHistoGrade(db:Session, histograde:HistoGradeCreate, codeG:int, cni:str, datePromo:date):
    result = db.query(HistoGradeModel).filter(HistoGradeModel.codeG == codeG, HistoGradeModel.cni == cni, HistoGradeModel.datePromo == datePromo).update({HistoGradeModel.datePromo:histograde.datePromo}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(HistoGradeModel).filter(HistoGradeModel.codeG == codeG, HistoGradeModel.cni == cni, HistoGradeModel.datePromo == datePromo).first()
    return False

async def DeleteHistoGrade(db:Session, codeG:int, cni:str, datePromo:date):
    result = db.query(HistoGradeModel).filter(HistoGradeModel.codeG == codeG, HistoGradeModel.cni == cni, HistoGradeModel.datePromo == datePromo).delete()
    if result == 1:
        return True
    return False

async def GetAllHistoGrade(db:Session):
    return db.query(HistoGradeModel).all()

async def GetHistoGrade(db:Session, codeG:int, cni:str, datePromo:date):
    return db.query(HistoGradeModel).filter(HistoGradeModel.codeG == codeG, HistoGradeModel.cni == cni, HistoGradeModel.datePromo == datePromo).first()
