from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.ville import VilleCreate, Ville, VilleObject
from sqlalchemy.orm import Session

from dependencies import get_db
from services.villeService import CreateVille,UpdateVille,DeleteVille,GetAllVilles,GetRangeVilles,GetVille
from fastapi_pagination import Page, add_pagination, paginate

router = APIRouter(prefix="/ville", tags = ["ville"])

@router.get("/all/",response_model=List[VilleObject], status_code=200)
async def get__all_villes(db:Session = Depends(get_db)):
    all_villes = await GetAllVilles(db=db)
    return all_villes

@router.get("/",response_model=Page[Ville], status_code=200)
async def get_range_villes(db:Session = Depends(get_db)):
    range_of_villes = await GetRangeVilles(db=db)
    return paginate(range_of_villes)

@router.get("/{codeV}", response_model=Ville, status_code=200)
async def get_one_ville(codeV:int,db:Session = Depends(get_db)):
    one_ville = await GetVille(db=db, codeV = codeV)
    if one_ville:
        return one_ville
    raise HTTPException(status_code=404, detail="Ville inéxistant !!!")

@router.post("/", response_model=Ville, status_code=201)
async def add_ville(ville : VilleCreate, db:Session = Depends(get_db)):
    new_ville = await CreateVille(db=db, ville=ville)
    if new_ville:
        return new_ville
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeV}", response_model=Ville, status_code=200)
async def upd_ville(codeV:int, ville : VilleCreate, db:Session = Depends(get_db)):
    ville_to_upd = await UpdateVille(db=db, ville=ville, codeV = codeV)
    if ville_to_upd:
        return ville_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeV}", status_code=200)
async def del_ville(codeV:int, db:Session = Depends(get_db)):
    result = await DeleteVille(db=db, codeV = codeV)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code ville {codeV} est inéxistant !!!")

add_pagination(router)