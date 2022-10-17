from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.specdiplome import SpecDiplomeCreate, SpecDiplome
from sqlalchemy.orm import Session

from dependencies import get_db
from services.specdiplomeService import CreateSpecDiplome,UpdateSpecDiplome,DeleteSpecDiplome,GetAllSpecsDiplome,GetRangeSpecsDiplome,GetSpecDiplome
from fastapi_pagination import Page, add_pagination, paginate

router = APIRouter(prefix="/specdiplome", tags = ["specdiplome"])

@router.get("/all/",response_model=List[SpecDiplome], status_code=200)
async def get_all_specsdiplome(db:Session = Depends(get_db)):
    all_specsdiplome = await GetAllSpecsDiplome(db=db)
    return all_specsdiplome

@router.get("/",response_model=Page[SpecDiplome], status_code=200)
async def get_range_specsdiplome(db:Session = Depends(get_db)):
    range_of_specsdiplome = await GetRangeSpecsDiplome(db=db)
    return paginate(range_of_specsdiplome)

@router.get("/{codeSpecDip}", response_model=SpecDiplome, status_code=200)
async def get_one_specdiplome(codeSpecDip:int,db:Session = Depends(get_db)):
    one_specdiplome = await GetSpecDiplome(db=db, codeSpecDip = codeSpecDip)
    if one_specdiplome:
        return one_specdiplome
    raise HTTPException(status_code=404, detail="SpecDiplome inéxistant !!!")

@router.post("/", response_model=SpecDiplome, status_code=201)
async def add_specdiplome(specdiplome : SpecDiplomeCreate, db:Session = Depends(get_db)):
    new_specdiplome = await CreateSpecDiplome(db=db, specdiplome=specdiplome)
    if new_specdiplome:
        return new_specdiplome
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeSpecDip}", response_model=SpecDiplome, status_code=200)
async def upd_specdiplome(codeSpecDip:int, specdiplome : SpecDiplomeCreate, db:Session = Depends(get_db)):
    specdiplome_to_upd = await UpdateSpecDiplome(db=db, specdiplome=specdiplome, codeSpecDip = codeSpecDip)
    if specdiplome_to_upd:
        return specdiplome_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeSpecDip}", status_code=200)
async def del_specdiplome(codeSpecDip:int, db:Session = Depends(get_db)):
    result = await DeleteSpecDiplome(db=db, codeSpecDip = codeSpecDip)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code specdiplome {codeSpecDip} est inéxistant !!!")

add_pagination(router)