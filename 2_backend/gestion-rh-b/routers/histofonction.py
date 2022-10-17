from datetime import date
from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.histofonction import HistoFonctionCreate, HistoFonction
from sqlalchemy.orm import Session

from dependencies import get_db
from services.histofonctionService import CreateHistoFonction,UpdateHistoFonction,DeleteHistoFonction,GetAllHistoFonction,GetHistoFonction

router = APIRouter(prefix="/histofonction", tags = ["histofonction"])

@router.get("/",response_model=List[HistoFonction], status_code=200)
async def get_histofonctions(db:Session = Depends(get_db)):
    all_histofonction = await GetAllHistoFonction(db=db)
    return all_histofonction

@router.get("/{idF}/{cni}/{dateAffect}", response_model=HistoFonction, status_code=200)
async def get_one_histofonction(idF:int, cni:str, dateAffect:date,db:Session = Depends(get_db)):
    one_histofonction = await GetHistoFonction(db=db, idF = idF, cni = cni, dateAffect = dateAffect)
    if one_histofonction:
        return one_histofonction
    raise HTTPException(status_code=404, detail="Historique de Fonction inéxistant !!!")

@router.post("/", response_model=HistoFonction, status_code=201)
async def add_histofonction(histofonction : HistoFonctionCreate, db:Session = Depends(get_db)):
    new_histofonction = await CreateHistoFonction(db=db, histofonction=histofonction)
    if new_histofonction:
        return new_histofonction
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{idF}/{cni}/{dateAffect}", response_model=HistoFonction, status_code=200)
async def upd_histofonction(idF:int, cni:str, dateAffect:date, histofonction : HistoFonctionCreate, db:Session = Depends(get_db)):
    histofonction_to_upd = await UpdateHistoFonction(db=db, histofonction=histofonction, idF = idF, cni = cni, dateAffect = dateAffect)
    if histofonction_to_upd:
        return histofonction_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{idF}/{cni}/{dateAffect}", status_code=200)
async def del_histofonction(idF:int, cni:str, dateAffect:date, db:Session = Depends(get_db)):
    result = await DeleteHistoFonction(db=db, idF = idF, cni = cni, dateAffect = dateAffect)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code historique de fonction : {idF} {cni} {dateAffect} est inéxistant !!!")
