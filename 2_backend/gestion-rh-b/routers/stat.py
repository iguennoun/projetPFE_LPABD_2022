from typing import List
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session

from dependencies import get_db
from services.personnelService import GetNbrPersonnel, GetNbrPersonnelByGender, GetNbrPersonnelByBatiment, GetNbrPersonnelByNiveauEtude, GetNbrPersonnelByGrade, GetNbrPersonnelCloseToRetirement
from services.batimentService import GetNbrBatiment, GetNbrBatimentMarr
from services.usService import GetNbrUS, GetNbrServ, GetNbrSub

router = APIRouter(prefix="/stat", tags = ["stat"])

# Stat Functions
@router.get("/" , status_code=200)
async def get_Stat_Personnel( db:Session = Depends(get_db)):
    nbrPersonnel = await GetNbrPersonnel(db=db, actif=1)
    nbrPersonnelMale =  await GetNbrPersonnelByGender(db=db, sexe="M")
    nbrPersonnelFemale =  await GetNbrPersonnelByGender(db=db, sexe="F")
    nbrPersonnelByBatiment = await GetNbrPersonnelByBatiment(db=db)

    nbrBatiment = await GetNbrBatiment(db=db)
    nbrBatimentMarr = await GetNbrBatimentMarr(db=db, codeV = 192)

    nbrUS = await GetNbrUS(db=db, etat=1)
    nbrUSServ = await GetNbrServ(db=db, etat =1)
    nbrUSSub = await GetNbrSub(db=db, etat=1, codeTypeUS=8)
    
    nbrPersonnelCloseToRetirement = await GetNbrPersonnelCloseToRetirement(db=db)

    nbrPersonnelByNiveauEtude = await GetNbrPersonnelByNiveauEtude(db=db)
    nbrPersonnelByGrade = await GetNbrPersonnelByGrade(db=db)    

    statPersonnel = {
        "nbrPersonnel":nbrPersonnel,
        "nbrPersonnelMale":nbrPersonnelMale,
        "nbrPersonnelFemale":nbrPersonnelFemale,
        "nbrPersonnelByBatiment":nbrPersonnelByBatiment,
        "nbrBatiment":nbrBatiment,
        "nbrBatimentMarr":nbrBatimentMarr,
        "nbrUS":nbrUS,
        "nbrUSServ":nbrUSServ[0],
        "nbrUSSub":nbrUSSub,
        "nbrPersonnelCloseToRetirement": nbrPersonnelCloseToRetirement[0],
        "nbrPersonnelByNiveauEtude": nbrPersonnelByNiveauEtude,
        "nbrPersonnelByGrade":nbrPersonnelByGrade
    }
    if statPersonnel:
        return statPersonnel
    raise HTTPException(status_code=404, detail=f"Erreur de chargement")
# Stat End



