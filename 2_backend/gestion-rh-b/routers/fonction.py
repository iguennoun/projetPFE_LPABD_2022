from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.fonction import FonctionCreate, Fonction
from sqlalchemy.orm import Session

from dependencies import get_db
from services.fonctionService import CreateFonction,UpdateFonction,DeleteFonction,GetAllFonctions,GetRangeFonctions,GetFonction
from fastapi_pagination import Page, add_pagination, paginate

router = APIRouter(prefix="/fonction", tags = ["fonction"])

@router.get("/all/",response_model=List[Fonction], status_code=200)
async def get_all_fonctions(db:Session = Depends(get_db)):
    all_fonctions = await GetAllFonctions(db=db)
    return all_fonctions

@router.get("/",response_model=Page[Fonction], status_code=200)
async def get_range_fonctions(db:Session = Depends(get_db)):
    range_of_pays = await GetRangeFonctions(db=db)
    return paginate(range_of_pays)

@router.get("/{idF}", response_model=Fonction, status_code=200)
async def get_one_fonction(idF:int,db:Session = Depends(get_db)):
    one_fonction = await GetFonction(db=db, idF = idF)
    if one_fonction:
        return one_fonction
    raise HTTPException(status_code=404, detail="Fonction inéxistant !!!")

@router.post("/", response_model=Fonction, status_code=201)
async def add_fonction(fonction : FonctionCreate, db:Session = Depends(get_db)):
    new_fonction = await CreateFonction(db=db, fonction=fonction)
    if new_fonction:
        return new_fonction
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{idF}", response_model=Fonction, status_code=200)
async def upd_fonction(idF:int, fonction : FonctionCreate, db:Session = Depends(get_db)):
    fonction_to_upd = await UpdateFonction(db=db, fonction=fonction, idF = idF)
    if fonction_to_upd:
        return fonction_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{idF}", status_code=200)
async def del_fonction(idF:int, db:Session = Depends(get_db)):
    result = await DeleteFonction(db=db, idF = idF)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code de la fonction {idF} est inéxistant !!!")

add_pagination(router)
