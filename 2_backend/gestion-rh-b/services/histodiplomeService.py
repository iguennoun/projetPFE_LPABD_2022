from datetime import date
from sqlalchemy.orm import Session
from models.histodiplome import HistoDiplomeModel
from schemas.histodiplome import HistoDiplomeCreate

async def CreateHistoDiplome(db:Session, histodiplome:HistoDiplomeCreate):
    histodiplome_db = HistoDiplomeModel(idNe=histodiplome.idNe, codeSpecDip=histodiplome.codeSpecDip, cni=histodiplome.cni, dateObtention=histodiplome.dateObtention)
    db.add(histodiplome_db)
    db.commit()
    db.refresh(histodiplome_db)
    return histodiplome_db

async def UpdateHistoDiplome(db:Session, histodiplome:HistoDiplomeCreate, idNe:int, codeSpecDip:int, cni:str, dateObtention:date):
    result = db.query(HistoDiplomeModel).filter(HistoDiplomeModel.idNe == idNe, HistoDiplomeModel.codeSpecDip == codeSpecDip, HistoDiplomeModel.cni == cni, HistoDiplomeModel.dateObtention == dateObtention).update({HistoDiplomeModel.dateObtention:histodiplome.dateObtention}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(HistoDiplomeModel).filter(HistoDiplomeModel.idNe == idNe, HistoDiplomeModel.codeSpecDip == codeSpecDip, HistoDiplomeModel.cni == cni, HistoDiplomeModel.dateObtention == dateObtention).first()
    return False

async def DeleteHistoDiplome(db:Session, idNe:int, codeSpecDip:int, cni:str, dateObtention:date):
    result = db.query(HistoDiplomeModel).filter(HistoDiplomeModel.idNe == idNe, HistoDiplomeModel.codeSpecDip == codeSpecDip, HistoDiplomeModel.cni == cni, HistoDiplomeModel.dateObtention == dateObtention).delete()
    if result == 1:
        return True
    return False

async def GetAllHistoDiplome(db:Session):
    return db.query(HistoDiplomeModel).all()

async def GetHistoDiplome(db:Session, idNe:int, codeSpecDip:int, cni:str, dateObtention:date):
    return db.query(HistoDiplomeModel).filter(HistoDiplomeModel.idNe == idNe, HistoDiplomeModel.codeSpecDip == codeSpecDip, HistoDiplomeModel.cni == cni, HistoDiplomeModel.dateObtention == dateObtention).first()
