from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.niveauetu import NiveauEtuCreate, NiveauEtu
from sqlalchemy.orm import Session

from dependencies import get_db
from services.niveauetuService import CreateNiveauEtu,UpdateNiveauEtu,DeleteNiveauEtu,GetAllNiveauxEtu,GetNiveauEtu

router = APIRouter(prefix="/niveauetu", tags = ["niveauetu"])

@router.get("/",response_model=List[NiveauEtu], status_code=200)
async def get_niveauxetu(db:Session = Depends(get_db)):
    all_niveauxetu = await GetAllNiveauxEtu(db=db)
    return all_niveauxetu

@router.get("/{idNe}", response_model=NiveauEtu, status_code=200)
async def get_one_niveauetu(idNe:int,db:Session = Depends(get_db)):
    one_niveauetu = await GetNiveauEtu(db=db, idNe = idNe)
    if one_niveauetu:
        return one_niveauetu
    raise HTTPException(status_code=404, detail="Niveau étude inéxistant !!!")

@router.post("/", response_model=NiveauEtu, status_code=201)
async def add_niveauetu(niveauetu : NiveauEtuCreate, db:Session = Depends(get_db)):
    new_niveauetu = await CreateNiveauEtu(db=db, niveauetu=niveauetu)
    if new_niveauetu:
        return new_niveauetu
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{idNe}", response_model=NiveauEtu, status_code=200)
async def upd_niveauetu(idNe:int, niveauetu : NiveauEtuCreate, db:Session = Depends(get_db)):
    niveauetu_to_upd = await UpdateNiveauEtu(db=db, niveauetu=niveauetu, idNe = idNe)
    if niveauetu_to_upd:
        return niveauetu_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{idNe}", status_code=200)
async def del_niveauetu(idNe:int, db:Session = Depends(get_db)):
    result = await DeleteNiveauEtu(db=db, idNe = idNe)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code du niveau étude {idNe} est inéxistant !!!")
