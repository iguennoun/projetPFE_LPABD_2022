from sqlalchemy.orm import Session
from models.typeus import TypeUSModel
from schemas.typeus import TypeUSCreate

async def CreateTypeUS(db:Session, typeus:TypeUSCreate):
    typeus_db = TypeUSModel(libelleTypeUSFr=typeus.libelleTypeUSFr, libelleTypeUSAr=typeus.libelleTypeUSAr)
    db.add(typeus_db)
    db.commit()
    db.refresh(typeus_db)
    return typeus_db

async def UpdateTypeUS(db:Session, typeus:TypeUSCreate, codeTypeUS:int):
    result = db.query(TypeUSModel).filter(TypeUSModel.codeTypeUS == codeTypeUS).update({TypeUSModel.libelleTypeUSFr:typeus.libelleTypeUSFr, TypeUSModel.libelleTypeUSAr:typeus.libelleTypeUSAr}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(TypeUSModel).filter(TypeUSModel.codeTypeUS == codeTypeUS).first()
    return False

async def DeleteTypeUS(db:Session, codeTypeUS:int):
    result = db.query(TypeUSModel).filter(TypeUSModel.codeTypeUS == codeTypeUS).delete()
    if result == 1:
        return True
    return False

async def GetAllTypeUS(db:Session):
    return db.query(TypeUSModel).all()

async def GetTypeUS(db:Session, codeTypeUS:int):
    return db.query(TypeUSModel).filter(TypeUSModel.codeTypeUS == codeTypeUS).first()
