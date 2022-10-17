from sqlalchemy.orm import Session
from models.pays import PaysModel
from schemas.pays import PaysCreate

async def CreatePays(db:Session, pays:PaysCreate):
    pays_db = PaysModel(codeP=pays.codeP, isoAlpha2=pays.isoAlpha2, isoAlpha3=pays.isoAlpha3, nomPFr=pays.nomPFr, nomPAr=pays.nomPAr)
    db.add(pays_db)
    db.commit()
    db.refresh(pays_db)
    return pays_db

async def UpdatePays(db:Session, pays:PaysCreate, codeP:int):
    result = db.query(PaysModel).filter(PaysModel.codeP == codeP).update({PaysModel.isoAlpha2:pays.isoAlpha2, PaysModel.isoAlpha3:pays.isoAlpha3, PaysModel.nomPFr:pays.nomPFr, PaysModel.nomPAr:pays.nomPAr}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(PaysModel).filter(PaysModel.codeP == codeP).first()
    return False

async def DeletePays(db:Session, codeP:int):
    result = db.query(PaysModel).filter(PaysModel.codeP == codeP).delete()
    if result == 1:
        return True
    return False

async def GetAllPays(db:Session):
    return db.query(PaysModel).order_by(PaysModel.nomPFr).all()

async def GetRangePays(db:Session):
    return db.query(PaysModel).all()

async def GetPays(db:Session, codeP:int):
    return db.query(PaysModel).filter(PaysModel.codeP == codeP).first()