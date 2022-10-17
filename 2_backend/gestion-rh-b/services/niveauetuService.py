from sqlalchemy.orm import Session
from models.niveauetu import NiveauEtuModel
from schemas.niveauetu import NiveauEtuCreate

async def CreateNiveauEtu(db:Session, niveauetu:NiveauEtuCreate):
    niveauetu_db = NiveauEtuModel(idNe=niveauetu.idNe, anneeABac=niveauetu.anneeABac, titreDip=niveauetu.titreDip, niveauDip=niveauetu.niveauDip)
    db.add(niveauetu_db)
    db.commit()
    db.refresh(niveauetu_db)
    return niveauetu_db

async def UpdateNiveauEtu(db:Session, niveauetu:NiveauEtuCreate, idNe:int):
    result = db.query(NiveauEtuModel).filter(NiveauEtuModel.idNe == idNe).update({NiveauEtuModel.anneeABac:niveauetu.anneeABac, NiveauEtuModel.titreDip:niveauetu.titreDip, NiveauEtuModel.niveauDip:niveauetu.niveauDip}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(NiveauEtuModel).filter(NiveauEtuModel.idNe == idNe).first()
    return False

async def DeleteNiveauEtu(db:Session, idNe:int):
    result = db.query(NiveauEtuModel).filter(NiveauEtuModel.idNe == idNe).delete()
    if result == 1:
        return True
    return False

async def GetAllNiveauxEtu(db:Session):
    return db.query(NiveauEtuModel).all()

async def GetNiveauEtu(db:Session, idNe:int):
    return db.query(NiveauEtuModel).filter(NiveauEtuModel.idNe == idNe).first()
