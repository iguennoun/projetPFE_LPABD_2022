from sqlalchemy.orm import Session
from models.batiment import BatimentModel
from schemas.batiment import BatimentCreate

async def CreateBatiment(db:Session, batiment:BatimentCreate):
    batiment_db = BatimentModel(libelleBFr=batiment.libelleBFr, libelleBAr=batiment.libelleBAr, adresse=batiment.adresse, coordGPS=batiment.coordGPS, codeV=batiment.codeV)
    db.add(batiment_db)
    db.commit()
    db.refresh(batiment_db)
    return batiment_db

async def UpdateBatiment(db:Session, batiment:BatimentCreate, codeLocal:int):
    result = db.query(BatimentModel).filter(BatimentModel.codeLocal == codeLocal).update({BatimentModel.libelleBFr:batiment.libelleBFr, BatimentModel.libelleBAr:batiment.libelleBAr, BatimentModel.adresse:batiment.adresse, BatimentModel.coordGPS:batiment.coordGPS, BatimentModel.codeV:batiment.codeV}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(BatimentModel).filter(BatimentModel.codeLocal == codeLocal).first()
    return False

async def DeleteBatiment(db:Session, codeLocal:int):
    result = db.query(BatimentModel).filter(BatimentModel.codeLocal == codeLocal).delete()
    if result == 1:
        return True
    return False

async def GetAllBatiments(db:Session):
    return db.query(BatimentModel).all()

async def GetBatiment(db:Session, codeLocal:int):
    return db.query(BatimentModel).filter(BatimentModel.codeLocal == codeLocal).first()

# Stat Functions
async def GetNbrBatiment(db:Session):
    return db.query(BatimentModel).count()

async def GetNbrBatimentMarr(db:Session, codeV:int):
    return db.query(BatimentModel).filter(BatimentModel.codeV == codeV ).count()