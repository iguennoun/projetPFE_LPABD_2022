from sqlalchemy.orm import Session
from models.fonction import FonctionModel
from schemas.fonction import FonctionCreate

async def CreateFonction(db:Session, fonction:FonctionCreate):
    fonction_db = FonctionModel(idF=fonction.idF, libelleF=fonction.libelleF)
    db.add(fonction_db)
    db.commit()
    db.refresh(fonction_db)
    return fonction_db

async def UpdateFonction(db:Session, fonction:FonctionCreate, idF:int):
    result = db.query(FonctionModel).filter(FonctionModel.idF == idF).update({FonctionModel.libelleF:fonction.libelleF}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(FonctionModel).filter(FonctionModel.idF == idF).first()
    return False

async def DeleteFonction(db:Session, idF:int):
    result = db.query(FonctionModel).filter(FonctionModel.idF == idF).delete()
    if result == 1:
        return True
    return False

async def GetAllFonctions(db:Session):
    return db.query(FonctionModel).order_by(FonctionModel.libelleF).all()

async def GetRangeFonctions(db:Session):
    return db.query(FonctionModel).all()

async def GetFonction(db:Session, idF:int):
    return db.query(FonctionModel).filter(FonctionModel.idF == idF).first()
