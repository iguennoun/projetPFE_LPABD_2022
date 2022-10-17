from datetime import date
from sqlalchemy.orm import Session
from models.historespous import HistoRespoUSModel
from schemas.historespous import HistoRespoUSCreate

async def CreateHistoRespoUS(db:Session, historespous:HistoRespoUSCreate):
    historespous_db = HistoRespoUSModel(codeUS=historespous.codeUS, cni=historespous.cni, dateAffectationRespo=historespous.dateAffectationRespo, dateFinAffectationRespo=historespous.dateFinAffectationRespo, interim=historespous.interim, note=historespous.note)
    db.add(historespous_db)
    db.commit()
    db.refresh(historespous_db)
    return historespous_db

async def UpdateHistoRespoUS(db:Session, historespous:HistoRespoUSCreate, codeUS:int, cni:str, dateAffectationRespo:date):
    result = db.query(HistoRespoUSModel).filter(HistoRespoUSModel.codeUS == codeUS, HistoRespoUSModel.cni == cni, HistoRespoUSModel.dateAffectationRespo == dateAffectationRespo).update({HistoRespoUSModel.dateFinAffectationRespo:historespous.dateFinAffectationRespo, HistoRespoUSModel.interim:historespous.interim, HistoRespoUSModel.note:historespous.note}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(HistoRespoUSModel).filter(HistoRespoUSModel.codeUS == codeUS, HistoRespoUSModel.cni == cni, HistoRespoUSModel.dateAffectationRespo == dateAffectationRespo).first()
    return False

async def DeleteHistoRespoUS(db:Session, codeUS:int, cni:str, dateAffectationRespo:date):
    result = db.query(HistoRespoUSModel).filter(HistoRespoUSModel.codeUS == codeUS, HistoRespoUSModel.cni == cni, HistoRespoUSModel.dateAffectationRespo == dateAffectationRespo).delete()
    if result == 1:
        return True
    return False

async def GetAllHistoRespoUS(db:Session):
    return db.query(HistoRespoUSModel).all()

async def GetHistoRespoUS(db:Session, codeUS:int, cni:str, dateAffectationRespo:date):
    return db.query(HistoRespoUSModel).filter(HistoRespoUSModel.codeUS == codeUS, HistoRespoUSModel.cni == cni, HistoRespoUSModel.dateAffectationRespo == dateAffectationRespo).first()
