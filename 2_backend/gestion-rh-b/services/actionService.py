from sqlalchemy.orm import Session
from models.action import ActionModel
from schemas.action import ActionCreate

async def CreateAction(db:Session, action:ActionCreate):
    action_db = ActionModel(idAct=action.idAct, cni=action.cni, description=action.description, dateAct=action.dateAct)
    db.add(action_db)
    db.commit()
    db.refresh(action_db)
    return action_db

async def UpdateAction(db:Session, action:ActionCreate, idAct:int, cni:str):
    result = db.query(ActionModel).filter(ActionModel.idAct == idAct, ActionModel.cni == cni).update({ActionModel.description:action.description, ActionModel.dateAct:action.dateAct}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(ActionModel).filter(ActionModel.idAct == idAct, ActionModel.cni == cni).first()
    return False

async def DeleteAction(db:Session, idAct:int, cni:str):
    result = db.query(ActionModel).filter(ActionModel.idAct == idAct, ActionModel.cni == cni).delete()
    if result == 1:
        return True
    return False

async def GetAllAction(db:Session, cni:str):
    return db.query(ActionModel).filter(ActionModel.cni == cni).all()

async def GetAction(db:Session,  idAct:int):
    return db.query(ActionModel).filter(ActionModel.idAct == idAct).first()
