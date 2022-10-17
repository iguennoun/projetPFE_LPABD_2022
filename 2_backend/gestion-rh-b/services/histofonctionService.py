from datetime import date
from sqlalchemy.orm import Session
from models.histofonction import HistoFonctionModel
from schemas.histofonction import HistoFonctionCreate

async def CreateHistoFonction(db:Session, histofonction:HistoFonctionCreate):
    histofonction_db = HistoFonctionModel(idF=histofonction.idF, cni=histofonction.cni, dateAffect=histofonction.dateAffect)
    db.add(histofonction_db)
    db.commit()
    db.refresh(histofonction_db)
    return histofonction_db

async def UpdateHistoFonction(db:Session, histofonction:HistoFonctionCreate, idF:int, cni:str, dateAffect:date):
    result = db.query(HistoFonctionModel).filter(HistoFonctionModel.idF ==idF, HistoFonctionModel.cni == cni, HistoFonctionModel.dateAffect == dateAffect).update({HistoFonctionModel.dateAffect:histofonction.dateAffect}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(HistoFonctionModel).filter(HistoFonctionModel.idF ==idF, HistoFonctionModel.cni == cni, HistoFonctionModel.dateAffect == dateAffect).first()
    return False

async def DeleteHistoFonction(db:Session, idF:int, cni:str, dateAffect:date):
    result = db.query(HistoFonctionModel).filter(HistoFonctionModel.idF ==idF, HistoFonctionModel.cni == cni, HistoFonctionModel.dateAffect == dateAffect).delete()
    if result == 1:
        return True
    return False

async def GetAllHistoFonction(db:Session):
    return db.query(HistoFonctionModel).all()

async def GetHistoFonction(db:Session, idF:int, cni:str, dateAffect:date):
    return db.query(HistoFonctionModel).filter(HistoFonctionModel.idF ==idF, HistoFonctionModel.cni == cni, HistoFonctionModel.dateAffect == dateAffect).first()
