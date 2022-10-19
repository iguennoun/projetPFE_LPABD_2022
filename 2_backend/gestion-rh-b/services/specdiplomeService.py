from sqlalchemy.orm import Session
from models.specdiplome import SpecDiplomeModel
from schemas.specdiplome import SpecDiplomeCreate

async def CreateSpecDiplome(db:Session, specdiplome:SpecDiplomeCreate):
    specdiplome_db = SpecDiplomeModel(intituleSpec=specdiplome.intituleSpec)
    db.add(specdiplome_db)
    db.commit()
    db.refresh(specdiplome_db)
    return specdiplome_db

async def UpdateSpecDiplome(db:Session, specdiplome:SpecDiplomeCreate, codeSpecDip:int):
    result = db.query(SpecDiplomeModel).filter(SpecDiplomeModel.codeSpecDip == codeSpecDip).update({SpecDiplomeModel.intituleSpec:specdiplome.intituleSpec}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(SpecDiplomeModel).filter(SpecDiplomeModel.codeSpecDip == codeSpecDip).first()
    return False

async def DeleteSpecDiplome(db:Session, codeSpecDip:int):
    result = db.query(SpecDiplomeModel).filter(SpecDiplomeModel.codeSpecDip == codeSpecDip).delete()
    if result == 1:
        return True
    return False

async def GetAllSpecsDiplome(db:Session):
    return db.query(SpecDiplomeModel).order_by(SpecDiplomeModel.intituleSpec).all()

async def GetRangeSpecsDiplome(db:Session):
    return db.query(SpecDiplomeModel).all()

async def GetSpecDiplome(db:Session, codeSpecDip:int):
    return db.query(SpecDiplomeModel).filter(SpecDiplomeModel.codeSpecDip == codeSpecDip).first()
