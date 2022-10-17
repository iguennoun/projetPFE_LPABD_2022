from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.us import USCreate, US
from sqlalchemy.orm import Session

from dependencies import get_db
from services.usService import CreateUS,UpdateUS,DeleteUS,GetAllUS,GetUS

router = APIRouter(prefix="/us", tags = ["us"])

@router.get("/",response_model=List[US], status_code=200)
async def get_us(db:Session = Depends(get_db)):
    all_us = await GetAllUS(db=db)
    return all_us

@router.get("/{codeUS}", response_model=US, status_code=200)
async def get_one_us(codeUS:int,db:Session = Depends(get_db)):
    one_us = await GetUS(db=db, codeUS = codeUS)
    if one_us:
        return one_us
    raise HTTPException(status_code=404, detail="US inéxistant !!!")

@router.post("/", response_model=US, status_code=201)
async def add_us(us : USCreate, db:Session = Depends(get_db)):
    new_us = await CreateUS(db=db, us=us)
    if new_us:
        return new_us
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeUS}", response_model=US, status_code=200)
async def upd_us(codeUS:int, us : USCreate, db:Session = Depends(get_db)):
    us_to_upd = await UpdateUS(db=db, us=us, codeUS = codeUS)
    if us_to_upd:
        return us_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeUS}", status_code=200)
async def del_us(codeUS:int, db:Session = Depends(get_db)):
    result = await DeleteUS(db=db, codeUS = codeUS)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code US {codeUS} est inéxistant !!!")
