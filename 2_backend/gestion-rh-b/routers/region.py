from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.region import RegionCreate, Region
from sqlalchemy.orm import Session

from dependencies import get_db
from services.regionService import CreateRegion,UpdateRegion,DeleteRegion,GetAllRegions,GetRegion

router = APIRouter(prefix="/region", tags = ["region"])

@router.get("/",response_model=List[Region], status_code=200)
async def get_regions(db:Session = Depends(get_db)):
    all_regions = await GetAllRegions(db=db)
    return all_regions

@router.get("/{codeR}", response_model=Region, status_code=200)
async def get_one_region(codeR:int,db:Session = Depends(get_db)):
    one_region = await GetRegion(db=db, codeR = codeR)
    if one_region:
        return one_region
    raise HTTPException(status_code=404, detail="Region inéxistant !!!")

@router.post("/", response_model=Region, status_code=201)
async def add_region(region : RegionCreate, db:Session = Depends(get_db)):
    new_region = await CreateRegion(db=db, region=region)
    if new_region:
        return new_region
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeR}", response_model=Region, status_code=200)
async def upd_region(codeR:int, region : RegionCreate, db:Session = Depends(get_db)):
    region_to_upd = await UpdateRegion(db=db, region=region, codeR = codeR)
    if region_to_upd:
        return region_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeR}", status_code=200)
async def del_region(codeR:int, db:Session = Depends(get_db)):
    result = await DeleteRegion(db=db, codeR = codeR)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code region {codeR} est inéxistant !!!")
