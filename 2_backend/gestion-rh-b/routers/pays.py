from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.pays import PaysCreate, Pays, PaysObject
from sqlalchemy.orm import Session

from dependencies import get_db
from services.paysService import CreatePays,UpdatePays,DeletePays,GetAllPays,GetRangePays,GetPays
from fastapi_pagination import Page, add_pagination, paginate

router = APIRouter(prefix="/pays", tags = ["pays"])

@router.get("/all/",response_model=List[PaysObject], status_code=200)
async def get_all_pays(db:Session = Depends(get_db)):
    all_pays = await GetAllPays(db=db)
    return all_pays

@router.get("/",response_model=Page[Pays], status_code=200)
async def get_range_pays(db:Session = Depends(get_db)):
    range_of_pays = await GetRangePays(db=db)
    return paginate(range_of_pays)

@router.get("/{codeP}", response_model=Pays, status_code=200)
async def get_one_pays(codeP:int,db:Session = Depends(get_db)):
    one_pays = await GetPays(db=db, codeP=codeP)
    if one_pays:
        return one_pays
    raise HTTPException(status_code=404, detail="Pays inéxistant !!!")

@router.post("/", response_model=Pays, status_code=201)
async def add_pays(pays : PaysCreate, db:Session = Depends(get_db)):
    new_pays = await CreatePays(db=db, pays=pays)
    if new_pays:
        return new_pays
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeP}", response_model=Pays, status_code=200)
async def upd_pays(codeP:int, pays : PaysCreate, db:Session = Depends(get_db)):
    pays_to_upd = await UpdatePays(db=db, pays=pays, codeP=codeP)
    if pays_to_upd:
        return pays_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeP}", status_code=200)
async def del_pays(codeP:int, db:Session = Depends(get_db)):
    result = await DeletePays(db=db, codeP=codeP)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code pays {codeP} est inéxistant !!!")

add_pagination(router)