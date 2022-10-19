from sqlalchemy.orm import Session
from models.niveauetu import NiveauEtuModel
from schemas.niveauetu import NiveauEtuCreate

async def CreateNiveauEtu(db:Session, niveauetu:NiveauEtuCreate):
    niveauetu_db = NiveauEtuModel(anneeABac=niveauetu.anneeABac, titreDip=niveauetu.titreDip, niveauDip=niveauetu.niveauDip)
    db.add(niveauetu_db)
    db.commit()
    db.refresh(niveauetu_db)
    return niveauetu_db

async def UpdateNiveauEtu(db:Session, niveauetu:NiveauEtuCreate, idNE:int):
    result = db.query(NiveauEtuModel).filter(NiveauEtuModel.idNE== idNE).update({NiveauEtuModel.anneeABac:niveauetu.anneeABac, NiveauEtuModel.titreDip:niveauetu.titreDip, NiveauEtuModel.niveauDip:niveauetu.niveauDip}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(NiveauEtuModel).filter(NiveauEtuModel.idNE == idNE).first()
    return False

async def DeleteNiveauEtu(db:Session, idNE:int):
    result = db.query(NiveauEtuModel).filter(NiveauEtuModel.idNE == idNE).delete()
    if result == 1:
        return True
    return False

async def GetAllNiveauxEtu(db:Session):
    return db.query(NiveauEtuModel).all()

async def GetNiveauEtu(db:Session, idNE:int):
    return db.query(NiveauEtuModel).filter(NiveauEtuModel.idNE == idNE).first()
