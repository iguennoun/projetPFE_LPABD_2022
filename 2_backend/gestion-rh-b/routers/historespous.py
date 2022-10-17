from datetime import date
from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.historespous import HistoRespoUSCreate, HistoRespoUS
from sqlalchemy.orm import Session

from dependencies import get_db
from services.historespousService import CreateHistoRespoUS,UpdateHistoRespoUS,DeleteHistoRespoUS,GetAllHistoRespoUS,GetHistoRespoUS

router = APIRouter(prefix="/historespous", tags = ["historespous"])

@router.get("/",response_model=List[HistoRespoUS], status_code=200)
async def get_historespouss(db:Session = Depends(get_db)):
    all_historespous = await GetAllHistoRespoUS(db=db)
    return all_historespous

@router.get("/{codeUS}/{cni}/{dateAffectationRespo}", response_model=HistoRespoUS, status_code=200)
async def get_one_historespous(codeUS:int, cni:str, dateAffectationRespo:date, db:Session = Depends(get_db)):
    one_historespous = await GetHistoRespoUS(db=db, codeUS = codeUS, cni = cni, dateAffectationRespo = dateAffectationRespo)
    if one_historespous:
        return one_historespous
    raise HTTPException(status_code=404, detail="Historique du Résponsable de l'US inéxistant !!!")

@router.post("/", response_model=HistoRespoUS, status_code=201)
async def add_historespous(historespous : HistoRespoUSCreate, db:Session = Depends(get_db)):
    new_historespous = await CreateHistoRespoUS(db=db, historespous=historespous)
    if new_historespous:
        return new_historespous
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeUS}/{cni}/{dateAffectationRespo}", response_model=HistoRespoUS, status_code=200)
async def upd_historespous(codeUS:int, cni:str, dateAffectationRespo:date, historespous : HistoRespoUSCreate, db:Session = Depends(get_db)):
    historespous_to_upd = await UpdateHistoRespoUS(db=db, historespous=historespous, codeUS = codeUS, cni = cni, dateAffectationRespo = dateAffectationRespo)
    if historespous_to_upd:
        return historespous_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeUS}/{cni}/{dateAffectationRespo}", status_code=200)
async def del_historespous(codeUS:int, cni:str, dateAffectationRespo:date, db:Session = Depends(get_db)):
    result = await DeleteHistoRespoUS(db=db, codeUS = codeUS, cni = cni, dateAffectationRespo = dateAffectationRespo)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"L'historique du résponsable de US {codeUS} {cni} {dateAffectationRespo} est inéxistant !!!")
