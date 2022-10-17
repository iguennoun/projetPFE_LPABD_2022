from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.action import ActionCreate, Action
from sqlalchemy.orm import Session

from dependencies import get_db
from services.actionService import CreateAction,UpdateAction,DeleteAction,GetAllAction,GetAction

router = APIRouter(prefix="/action", tags = ["action"])

@router.get("s_of_personnel/{cni}",response_model=List[Action], status_code=200)
async def get_actions(cni:str, db:Session = Depends(get_db)):
    all_action = await GetAllAction(db=db, cni=cni)
    return all_action

@router.get("/{idAct}", response_model=Action, status_code=200)
async def get_one_action(idAct:int, db:Session = Depends(get_db)):
    one_action = await GetAction(db=db, idAct = idAct)
    if one_action:
        return one_action
    raise HTTPException(status_code=404, detail="Action inéxistante !!!")

@router.post("/", response_model=Action, status_code=201)
async def add_action(action : ActionCreate, db:Session = Depends(get_db)):
    new_action = await CreateAction(db=db, action=action)
    if new_action:
        return new_action
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{idAct}", response_model=Action, status_code=200)
async def upd_action(idAct:int, cni:str, action : ActionCreate, db:Session = Depends(get_db)):
    action_to_upd = await UpdateAction(db=db, action=action, idAct = idAct, cni = cni)
    if action_to_upd:
        return action_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{idAct}", status_code=200)
async def del_action(idAct:int, cni:str, db:Session = Depends(get_db)):
    result = await DeleteAction(db=db, idAct = idAct, cni = cni)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code action {idAct} est inéxistant !!!")
