from datetime import date
from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.histograde import HistoGradeCreate, HistoGrade
from sqlalchemy.orm import Session

from dependencies import get_db
from services.histogradeService import CreateHistoGrade,UpdateHistoGrade,DeleteHistoGrade,GetAllHistoGrade,GetHistoGrade

router = APIRouter(prefix="/histograde", tags = ["histograde"])

@router.get("/",response_model=List[HistoGrade], status_code=200)
async def get_histogrades(db:Session = Depends(get_db)):
    all_histograde = await GetAllHistoGrade(db=db)
    return all_histograde

@router.get("/{codeG}/{cni}/{datePromo}", response_model=HistoGrade, status_code=200)
async def get_one_histograde(codeG:int, cni:str, datePromo:date,db:Session = Depends(get_db)):
    one_histograde = await GetHistoGrade(db=db, codeG = codeG, cni = cni, datePromo = datePromo)
    if one_histograde:
        return one_histograde
    raise HTTPException(status_code=404, detail="l'historique du grade inéxistant !!!")

@router.post("/", response_model=HistoGrade, status_code=201)
async def add_histograde(histograde : HistoGradeCreate, db:Session = Depends(get_db)):
    new_histograde = await CreateHistoGrade(db=db, histograde=histograde)
    if new_histograde:
        return new_histograde
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeG}/{cni}/{datePromo}", response_model=HistoGrade, status_code=200)
async def upd_histograde(codeG:int, cni:str, datePromo:date, histograde : HistoGradeCreate, db:Session = Depends(get_db)):
    histograde_to_upd = await UpdateHistoGrade(db=db, histograde=histograde, codeG = codeG, cni = cni, datePromo = datePromo)
    if histograde_to_upd:
        return histograde_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeG}/{cni}/{datePromo}", status_code=200)
async def del_histograde(codeG:int, cni:str, datePromo:date, db:Session = Depends(get_db)):
    result = await DeleteHistoGrade(db=db, codeG = codeG, cni = cni, datePromo = datePromo)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code de l'historique du grade {codeG} {cni} {datePromo} est inéxistant !!!")
