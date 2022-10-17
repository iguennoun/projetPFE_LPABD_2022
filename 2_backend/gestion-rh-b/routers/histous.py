from datetime import date
from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.histous import HistoUSCreate, HistoUS
from sqlalchemy.orm import Session

from dependencies import get_db
from services.histousService import CreateHistoUS,UpdateHistoUS,DeleteHistoUS,GetAllHistoUS,GetHistoUS

router = APIRouter(prefix="/histous", tags = ["histous"])

@router.get("/",response_model=List[HistoUS], status_code=200)
async def get_histouss(db:Session = Depends(get_db)):
    all_histous = await GetAllHistoUS(db=db)
    return all_histous

@router.get("/{codeUS}/{cni}/{dateAffectation}", response_model=HistoUS, status_code=200)
async def get_one_histous(codeUS:int, cni:str, dateAffectation:date,db:Session = Depends(get_db)):
    one_histous = await GetHistoUS(db=db, codeUS = codeUS, cni = cni, dateAffectation = dateAffectation)
    if one_histous:
        return one_histous
    raise HTTPException(status_code=404, detail="Historique de l' US inéxistant !!!")

@router.post("/", response_model=HistoUS, status_code=201)
async def add_histous(histous : HistoUSCreate, db:Session = Depends(get_db)):
    new_histous = await CreateHistoUS(db=db, histous=histous)
    if new_histous:
        return new_histous
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeUS}/{cni}/{dateAffectation}", response_model=HistoUS, status_code=200)
async def upd_histous(codeUS:int, cni:str, dateAffectation:date, histous : HistoUSCreate, db:Session = Depends(get_db)):
    histous_to_upd = await UpdateHistoUS(db=db, histous=histous, codeUS = codeUS, cni = cni, dateAffectation = dateAffectation)
    if histous_to_upd:
        return histous_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeUS}/{cni}/{dateAffectation}", status_code=200)
async def del_histous(codeUS:int, cni:str, dateAffectation:date, db:Session = Depends(get_db)):
    result = await DeleteHistoUS(db=db, codeUS = codeUS, cni = cni, dateAffectation = dateAffectation)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code historique de l'US {codeUS} {cni} {dateAffectation} est inéxistant !!!")
