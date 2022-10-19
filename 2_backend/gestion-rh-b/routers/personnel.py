from datetime import date
from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.personnel import PersonnelCreate, Personnel
from sqlalchemy.orm import Session

from dependencies import get_db
from services.personnelService import CreatePersonnel,UpdatePersonnel,DeletePersonnel,GetAllPersonnel,GetAllAIPersonnel,GetAllPersonnelWithUS,GetAllPersonnelWithTypeUS,GetAllPersonnelInBatiment,GetAllPersonnelWithFonction,GetAllPersonnelWithGrade,GetAllPersonnelWithSpecDiplome,GetAllPersonnelWithNiveauEtu,GetPersonnel

router = APIRouter(prefix="/personnel", tags = ["personnel"])

@router.get("/actif",response_model=List[Personnel], status_code=200)
async def get_actif_personnels(db:Session = Depends(get_db)):
    all_actif_personnel = await GetAllAIPersonnel(db=db, actif=1)
    return all_actif_personnel

@router.get("/inactif",response_model=List[Personnel], status_code=200)
async def get_inactif_personnels(db:Session = Depends(get_db)):
    all_inactif_personnel = await GetAllAIPersonnel(db=db, actif=0)
    return all_inactif_personnel

@router.get("/us/{codeUS}",response_model=List[Personnel], status_code=200)
async def get_personnels_by_us(codeUS:int, db:Session = Depends(get_db)):
    all_personnel_by_us = await GetAllPersonnelWithUS(db=db, codeUS=codeUS)
    return all_personnel_by_us

@router.get("/typeus/{codeTypeUS}",response_model=List[Personnel], status_code=200)
async def get_personnels_by_typeus(codeTypeUS:int ,db:Session = Depends(get_db)):
    all_personnel_by_typeus = await GetAllPersonnelWithTypeUS(db=db, codeTypeUS=codeTypeUS)
    return all_personnel_by_typeus

@router.get("/batiment/{codeLocal}",response_model=List[Personnel], status_code=200)
async def get_personnels_in_batiment(codeLocal:int, db:Session = Depends(get_db)):
    all_personnel_in_batiment = await GetAllPersonnelInBatiment(db=db, codeLocal=codeLocal)
    return all_personnel_in_batiment

@router.get("/fonction/{idF}",response_model=List[Personnel], status_code=200)
async def get_personnels_by_fonction(idF:int, db:Session = Depends(get_db)):
    all_personnel_by_fonction = await GetAllPersonnelWithFonction(db=db, idF=idF)
    return all_personnel_by_fonction

@router.get("/grade/{codeG}",response_model=List[Personnel], status_code=200)
async def get_personnels_by_grade(codeG:int, db:Session = Depends(get_db)):
    all_personnel_by_grade = await GetAllPersonnelWithGrade(db=db, codeG=codeG)
    return all_personnel_by_grade

@router.get("/specdiplome/{codeSpecDip}",response_model=List[Personnel], status_code=200)
async def get_personnels_by_specdiplome(codeSpecDip:int, db:Session = Depends(get_db)):
    all_personnel_by_specdiplome = await GetAllPersonnelWithSpecDiplome(db=db, codeSpecDip=codeSpecDip)
    return all_personnel_by_specdiplome

@router.get("/niveauetu/{idNE}",response_model=List[Personnel], status_code=200)
async def get_personnels_by_niveauetu(idNE:int, db:Session = Depends(get_db)):
    all_personnel_by_niveauetu = await GetAllPersonnelWithNiveauEtu(db=db, idNE=idNE)
    return all_personnel_by_niveauetu

@router.get("/",response_model=List[Personnel], status_code=200)
async def get_personnels(db:Session = Depends(get_db)):
    all_personnel = await GetAllPersonnel(db=db)
    return all_personnel

@router.get("/{cni}", response_model=Personnel, status_code=200)
async def get_one_personnel(cni:str,db:Session = Depends(get_db)):
    one_personnel = await GetPersonnel(db=db, cni = cni)
    if one_personnel:
        return one_personnel
    raise HTTPException(status_code=404, detail="Personnel inéxistant !!!")

@router.post("/", response_model=Personnel, status_code=201)
async def add_personnel(personnel : PersonnelCreate, db:Session = Depends(get_db)):
    new_personnel = await CreatePersonnel(db=db, personnel=personnel)
    if new_personnel:
        return new_personnel
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{cni}", response_model=Personnel, status_code=200)
async def upd_personnel(cni:str, personnel : PersonnelCreate, db:Session = Depends(get_db)):
    personnel_to_upd = await UpdatePersonnel(db=db, personnel=personnel, cni = cni)
    if personnel_to_upd:
        return personnel_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{cni}", status_code=200)
async def del_personnel(cni:str, db:Session = Depends(get_db)):
    result = await DeletePersonnel(db=db, cni = cni)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"La cni : {cni} est inéxistante !!!")


