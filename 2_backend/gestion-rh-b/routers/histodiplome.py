from datetime import date
from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.histodiplome import HistoDiplomeCreate, HistoDiplome
from sqlalchemy.orm import Session

from dependencies import get_db
from services.histodiplomeService import CreateHistoDiplome,UpdateHistoDiplome,DeleteHistoDiplome,GetAllHistoDiplome,GetHistoDiplome

router = APIRouter(prefix="/histodiplome", tags = ["histodiplome"])

@router.get("/",response_model=List[HistoDiplome], status_code=200)
async def get_histodiplomes(db:Session = Depends(get_db)):
    all_histodiplome = await GetAllHistoDiplome(db=db)
    return all_histodiplome

@router.get("/{idNe}/{codeSpecDip}/{cni}/{dateObtention}", response_model=HistoDiplome, status_code=200)
async def get_one_histodiplome(idNe:int, codeSpecDip:int, cni:str, dateObtention:date,db:Session = Depends(get_db)):
    one_histodiplome = await GetHistoDiplome(db=db, idNe = idNe, codeSpecDip = codeSpecDip, cni = cni, dateObtention = dateObtention)
    if one_histodiplome:
        return one_histodiplome
    raise HTTPException(status_code=404, detail="L'historique du Diplome est inéxistant !!!")

@router.post("/", response_model=HistoDiplome, status_code=201)
async def add_histodiplome(histodiplome : HistoDiplomeCreate, db:Session = Depends(get_db)):
    new_histodiplome = await CreateHistoDiplome(db=db, histodiplome=histodiplome)
    if new_histodiplome:
        return new_histodiplome
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{idNe}/{codeSpecDip}/{cni}/{dateObtention}", response_model=HistoDiplome, status_code=200)
async def upd_histodiplome(idNe:int, codeSpecDip:int, cni:str, dateObtention:date, histodiplome : HistoDiplomeCreate, db:Session = Depends(get_db)):
    histodiplome_to_upd = await UpdateHistoDiplome(db=db, histodiplome=histodiplome, idNe = idNe, codeSpecDip = codeSpecDip, cni = cni, dateObtention = dateObtention)
    if histodiplome_to_upd:
        return histodiplome_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{idNe}/{codeSpecDip}/{cni}/{dateObtention}", status_code=200)
async def del_histodiplome(idNe:int, codeSpecDip:int, cni:str, dateObtention:date, db:Session = Depends(get_db)):
    result = await DeleteHistoDiplome(db=db, idNe = idNe, codeSpecDip = codeSpecDip, cni = cni, dateObtention = dateObtention)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code de l'historique diplome : {idNe} {codeSpecDip} {cni} {dateObtention} est inéxistant !!!")
