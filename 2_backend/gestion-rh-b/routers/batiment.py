from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.batiment import BatimentCreate, Batiment
from sqlalchemy.orm import Session

from dependencies import get_db
from services.batimentService import CreateBatiment,UpdateBatiment,DeleteBatiment,GetAllBatiments,GetBatiment

router = APIRouter(prefix="/batiment", tags = ["batiment"])

@router.get("/",response_model=List[Batiment], status_code=200)
async def get_batiments(db:Session = Depends(get_db)):
    all_batiments = await GetAllBatiments(db=db)
    return all_batiments

@router.get("/{codeLocal}", response_model=Batiment, status_code=200)
async def get_one_batiment(codeLocal:int,db:Session = Depends(get_db)):
    one_batiment = await GetBatiment(db=db, codeLocal = codeLocal)
    if one_batiment:
        return one_batiment
    raise HTTPException(status_code=404, detail="Batiment inéxistant !!!")

@router.post("/", response_model=Batiment, status_code=201)
async def add_batiment(batiment : BatimentCreate, db:Session = Depends(get_db)):
    new_batiment = await CreateBatiment(db=db, batiment=batiment)
    if new_batiment:
        return new_batiment
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeLocal}", response_model=Batiment, status_code=200)
async def upd_batiment(codeLocal:int, batiment : BatimentCreate, db:Session = Depends(get_db)):
    batiment_to_upd = await UpdateBatiment(db=db, batiment=batiment, codeLocal = codeLocal)
    if batiment_to_upd:
        return batiment_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeLocal}", status_code=200)
async def del_batiment(codeLocal:int, db:Session = Depends(get_db)):
    result = await DeleteBatiment(db=db, codeLocal = codeLocal)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code batiment {codeLocal} est inéxistant !!!")
