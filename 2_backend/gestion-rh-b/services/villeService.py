from sqlalchemy.orm import Session
from models.ville import VilleModel
from schemas.ville import VilleCreate

async def CreateVille(db:Session, ville:VilleCreate):
    ville_db = VilleModel(codeV=ville.codeV, nomVFr=ville.nomVFr, nomVAr=ville.nomVAr, codeR=ville.codeR)
    db.add(ville_db)
    db.commit()
    db.refresh(ville_db)
    return ville_db

async def UpdateVille(db:Session, ville:VilleCreate, codeV:int):
    result = db.query(VilleModel).filter(VilleModel.codeV == codeV).update({VilleModel.nomVFr:ville.nomVFr, VilleModel.nomVAr:ville.nomVAr, VilleModel.codeR:ville.codeR}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(VilleModel).filter(VilleModel.codeV == codeV).first()
    return False

async def DeleteVille(db:Session, codeV:int):
    result = db.query(VilleModel).filter(VilleModel.codeV == codeV).delete()
    if result == 1:
        return True
    return False

async def GetAllVilles(db:Session):
    return db.query(VilleModel).order_by(VilleModel.nomVFr).all()

async def GetRangeVilles(db:Session):
    return db.query(VilleModel).all()

async def GetVille(db:Session, codeV:int):
    return db.query(VilleModel).filter(VilleModel.codeV == codeV).first()
