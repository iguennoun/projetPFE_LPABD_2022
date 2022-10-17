from datetime import date
from sqlalchemy.orm import Session
from models.histous import HistoUSModel
from schemas.histous import HistoUSCreate

async def CreateHistoUS(db:Session, histous:HistoUSCreate):
    histous_db = HistoUSModel(codeUS=histous.codeUS, cni=histous.cni, dateAffectation=histous.dateAffectation, dateFinAffectation=histous.dateFinAffectation)
    db.add(histous_db)
    db.commit()
    db.refresh(histous_db)
    return histous_db

async def UpdateHistoUS(db:Session, histous:HistoUSCreate, codeUS:int, cni:str, dateAffectation:date):
    result = db.query(HistoUSModel).filter(HistoUSModel.codeUS == codeUS, HistoUSModel.cni == cni, HistoUSModel.dateAffectation == dateAffectation).update({HistoUSModel.dateFinAffectation:histous.dateFinAffectation}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(HistoUSModel).filter(HistoUSModel.codeUS == codeUS, HistoUSModel.cni == cni, HistoUSModel.dateAffectation == dateAffectation).first()
    return False

async def DeleteHistoUS(db:Session, codeUS:int, cni:str, dateAffectation:date):
    result = db.query(HistoUSModel).filter(HistoUSModel.codeUS == codeUS, HistoUSModel.cni == cni, HistoUSModel.dateAffectation == dateAffectation).delete()
    if result == 1:
        return True
    return False

async def GetAllHistoUS(db:Session):
    return db.query(HistoUSModel).all()

async def GetHistoUS(db:Session, codeUS:int, cni:str, dateAffectation:date):
    return db.query(HistoUSModel).filter(HistoUSModel.codeUS == codeUS, HistoUSModel.cni == cni, HistoUSModel.dateAffectation == dateAffectation).first()
