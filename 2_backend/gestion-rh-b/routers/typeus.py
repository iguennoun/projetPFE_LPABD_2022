from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.typeus import TypeUSCreate, TypeUS
from sqlalchemy.orm import Session

from dependencies import get_db
from services.typeusService import CreateTypeUS,UpdateTypeUS,DeleteTypeUS,GetAllTypeUS,GetTypeUS

router = APIRouter(prefix="/typeus", tags = ["typeus"])

@router.get("/",response_model=List[TypeUS], status_code=200)
async def get_typeus(db:Session = Depends(get_db)):
    all_typeus = await GetAllTypeUS(db=db)
    return all_typeus

@router.get("/{codeTypeUS}", response_model=TypeUS, status_code=200)
async def get_one_typeus(codeTypeUS:int,db:Session = Depends(get_db)):
    one_typeus = await GetTypeUS(db=db, codeTypeUS = codeTypeUS)
    if one_typeus:
        return one_typeus
    raise HTTPException(status_code=404, detail="TypeUS inéxistant !!!")

@router.post("/", response_model=TypeUS, status_code=201)
async def add_typeus(typeus : TypeUSCreate, db:Session = Depends(get_db)):
    new_typeus = await CreateTypeUS(db=db, typeus=typeus)
    if new_typeus:
        return new_typeus
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeTypeUS}", response_model=TypeUS, status_code=200)
async def upd_typeus(codeTypeUS:int, typeus : TypeUSCreate, db:Session = Depends(get_db)):
    typeus_to_upd = await UpdateTypeUS(db=db, typeus=typeus, codeTypeUS = codeTypeUS)
    if typeus_to_upd:
        return typeus_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeTypeUS}", status_code=200)
async def del_typeus(codeTypeUS:int, db:Session = Depends(get_db)):
    result = await DeleteTypeUS(db=db, codeTypeUS = codeTypeUS)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code type US {codeTypeUS} est inéxistant !!!")
