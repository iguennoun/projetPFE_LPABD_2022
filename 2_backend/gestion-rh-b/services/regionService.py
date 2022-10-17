from sqlalchemy.orm import Session
from models.region import RegionModel
from schemas.region import RegionCreate

async def CreateRegion(db:Session, region:RegionCreate):
    region_db = RegionModel(codeR=region.codeR, libelleRFr=region.libelleRFr, libelleRAr=region.libelleRAr, codeP=region.codeP)
    db.add(region_db)
    db.commit()
    db.refresh(region_db)
    return region_db

async def UpdateRegion(db:Session, region:RegionCreate, codeR:int):
    result = db.query(RegionModel).filter(RegionModel.codeR == codeR).update({RegionModel.libelleRFr:region.libelleRFr, RegionModel.libelleRAr:region.libelleRAr, RegionModel.codeP:region.codeP}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(RegionModel).filter(RegionModel.codeR == codeR).first()
    return False

async def DeleteRegion(db:Session, codeR:int):
    result = db.query(RegionModel).filter(RegionModel.codeR == codeR).delete()
    if result == 1:
        return True
    return False

async def GetAllRegions(db:Session):
    return db.query(RegionModel).all()

async def GetRegion(db:Session, codeR:int):
    return db.query(RegionModel).filter(RegionModel.codeR == codeR).first()
