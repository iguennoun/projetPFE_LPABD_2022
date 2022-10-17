from sqlalchemy.orm import Session
from models.us import USModel
from schemas.us import USCreate

async def CreateUS(db:Session, us:USCreate):
    us_db = USModel(codeUS=us.codeUS, libelleUSFr=us.libelleUSFr, libelleUSAr=us.libelleUSAr, codeUSParent=us.codeUSParent, codeTypeUS=us.codeTypeUS, etat=us.etat)
    db.add(us_db)
    db.commit()
    db.refresh(us_db)
    return us_db

async def UpdateUS(db:Session, us:USCreate, codeUS:int):
    result = db.query(USModel).filter(USModel.codeUS == codeUS).update({USModel.libelleUSFr:us.libelleUSFr, USModel.libelleUSAr:us.libelleUSAr, USModel.codeUSParent:us.codeUSParent, USModel.codeTypeUS:us.codeTypeUS, USModel.etat:us.etat}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(USModel).filter(USModel.codeUS == codeUS).first()
    return False

async def DeleteUS(db:Session, codeUS:int):
    result = db.query(USModel).filter(USModel.codeUS == codeUS).delete()
    if result == 1:
        return True
    return False

async def GetAllUS(db:Session):
    return db.query(USModel).filter(USModel.etat == 1).all()

async def GetUS(db:Session, codeUS:int):
    return db.query(USModel).filter(USModel.codeUS == codeUS).first()

# Stat Functions
async def GetNbrUS(db:Session, etat:bool):
    return db.query(USModel).filter(USModel.etat == etat).count()

async def GetNbrServ(db:Session, etat:bool):
   statment ="Select count(*) as NbrUSServ from us , typeus tu where us.codeTypeUS=tu.codeTypeUS and us.etat=1 and tu.libelleTypeUSFr like '%service%'"
   return db.execute(statement=statment).first()

async def GetNbrSub(db:Session, etat:bool, codeTypeUS):
   return db.query(USModel).filter(USModel.etat == etat, USModel.codeTypeUS == codeTypeUS).count()
