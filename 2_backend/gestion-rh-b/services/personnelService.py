from sqlalchemy.orm import Session
from models.personnel import PersonnelModel
from schemas.personnel import PersonnelCreate

async def CreatePersonnel(db:Session, personnel:PersonnelCreate):
    personnel_db = PersonnelModel(ppr=personnel.ppr, cni=personnel.cni,  nomFr=personnel.nomFr, prenomFr=personnel.prenomFr, nomAr=personnel.nomAr, prenomAr=personnel.prenomAr, dateNaiss=personnel.dateNaiss, sexe=personnel.sexe, civilite=personnel.civilite, situationFam=personnel.situationFam, dateRecrutement=personnel.dateRecrutement, adressePerso=personnel.adressePerso, numCartComm=personnel.numCartComm, email=personnel.email, telPerso=personnel.telPerso, telProf=personnel.telProf, echelle=personnel.echelle, actif=personnel.actif, agentComm=personnel.agentComm, detacheDe=personnel.detacheDe, photo=personnel.photo, codeV=personnel.codeV, codeLocal=personnel.codeLocal, idNe=personnel.idNe)
    db.add(personnel_db)
    db.commit()
    db.refresh(personnel_db)
    return personnel_db

async def UpdatePersonnel(db:Session, personnel:PersonnelCreate, cni:str):
    result = db.query(PersonnelModel).filter(PersonnelModel.cni == cni).update({ PersonnelModel.ppr:personnel.ppr, PersonnelModel.nomFr:personnel.nomFr, PersonnelModel.prenomFr:personnel.prenomFr, PersonnelModel.nomAr:personnel.nomAr, PersonnelModel.prenomAr:personnel.prenomAr, PersonnelModel.dateNaiss:personnel.dateNaiss, PersonnelModel.sexe:personnel.sexe, PersonnelModel.civilite:personnel.civilite, PersonnelModel.situationFam:personnel.situationFam, PersonnelModel.dateRecrutement:personnel.dateRecrutement, PersonnelModel.adressePerso:personnel.adressePerso, PersonnelModel.numCartComm:personnel.numCartComm, PersonnelModel.email:personnel.email, PersonnelModel.telPerso:personnel.telPerso, PersonnelModel.telProf:personnel.telProf, PersonnelModel.echelle:personnel.echelle, PersonnelModel.actif:personnel.actif, PersonnelModel.agentComm:personnel.agentComm, PersonnelModel.detacheDe:personnel.detacheDe, PersonnelModel.detacheVers:personnel.detacheVers, PersonnelModel.photo:personnel.photo, PersonnelModel.codeV:personnel.codeV, PersonnelModel.codeLocal:personnel.codeLocal, PersonnelModel.idNe:personnel.idNe}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(PersonnelModel).filter(PersonnelModel.cni == cni).first()
    return False

async def DeletePersonnel(db:Session, cni:str):
    result = db.query(PersonnelModel).filter(PersonnelModel.cni == cni).delete()
    if result == 1:
        return True
    return False

async def GetAllPersonnel(db:Session):
    return db.query(PersonnelModel).all()

async def GetAllAIPersonnel(db:Session, actif:bool):
    return db.query(PersonnelModel).filter(PersonnelModel.actif == actif).all()

async def GetPersonnel(db:Session, cni:str):
    return db.query(PersonnelModel).filter(PersonnelModel.cni == cni).first()

# Filter Functions
async def GetAllPersonnelWithUS(db:Session, codeUS:int):
    statment ="Select p.* from Personnel p, histous hus where p.cni=hus.cni and p.actif=1 and ISNULL(hus.dateFinAffectation) and hus.codeUS="+str(codeUS)
    return db.execute(statement=statment).all()

async def GetAllPersonnelWithTypeUS(db:Session, codeTypeUS:int):
    statment ="Select p.* from Personnel p, histous hus, us where p.cni=hus.cni and hus.codeUS=us.codeUS and p.actif=1 and ISNULL(hus.dateFinAffectation) and us.codeTypeUS="+str(codeTypeUS)
    return db.execute(statement=statment).all()

async def GetAllPersonnelInBatiment(db:Session, codeLocal:int):
    return db.query(PersonnelModel).filter(PersonnelModel.actif == 1, PersonnelModel.codeLocal == codeLocal).all()

async def GetAllPersonnelWithFonction(db:Session, idF:int):
    statment ="Select p.* from Personnel p, histofonction hf where p.cni=hf.cni and p.actif=1 and p.cni = (select hf2.cni from histofonction hf2 where hf2.cni=p.cni AND hf2.idF="+str(idF)+" ORDER BY hf2.dateAffect DESC LIMIT 1) GROUP BY p.ppr ORDER BY p.ppr ASC"
    return db.execute(statement=statment).all()

async def GetAllPersonnelWithGrade(db:Session, codeG:int):
    statment ="Select p.* from Personnel p, histograde hg where p.cni=hg.cni and p.actif=1 and p.cni = (select hg2.cni from histograde hg2 where hg2.cni=p.cni AND hg2.codeG="+str(codeG)+" ORDER BY hg2.datePromo DESC LIMIT 1) GROUP BY p.ppr ORDER BY p.ppr ASC"
    return db.execute(statement=statment).all()

async def GetAllPersonnelWithSpecDiplome(db:Session, codeSpecDip:int):
    statment ="SELECT * FROM `personnel` p, `histodiplome` hd WHERE p.cni=hd.cni AND hd.codeSpecDip="+str(codeSpecDip)
    return db.execute(statement=statment).all()

async def GetAllPersonnelWithNiveauEtu(db:Session, idNE:int):
    return db.query(PersonnelModel).filter(PersonnelModel.actif == 1, PersonnelModel.idNE == idNE).all()


# Stat Functions
async def GetNbrPersonnel(db:Session, actif:bool):
    return db.query(PersonnelModel).filter(PersonnelModel.actif==actif).count()

async def GetNbrPersonnelByGender(db:Session, sexe:str):
    return db.query(PersonnelModel).filter(PersonnelModel.actif == 1 ,PersonnelModel.sexe == sexe).count()

async def GetNbrPersonnelByBatiment(db:Session):
    statment ="Select count(*) as NbrPersonnelByBatiment,b.codeLocal,b.libelleBFr from Personnel p, batiment b where p.codeLocal=b.codeLocal and p.actif=1 GROUP BY b.libelleBFr ORDER BY NbrPersonnelByBatiment DESC"
    return db.execute(statement=statment).all()

async def GetNbrPersonnelByNiveauEtude(db:Session):
    statment ="Select ne.idNE,ne.titreDip,count(*) as NbrPersonnelByNiveauEtu from Personnel p, niveauetu ne where p.idNE=ne.idNE and p.actif=1 GROUP BY ne.titreDip ORDER BY ne.idNE ASC"
    return db.execute(statement=statment).all()

async def GetNbrPersonnelByGrade(db:Session):
    statment ="Select g.codeG,g.libelleGFr,count(*) as NbrPersonnelByGrade from Personnel p, histograde hg, grade g where p.cni=hg.cni and hg.codeG=g.codeG and p.actif=1 and hg.datePromo = (select hg2.datePromo from histograde hg2 where hg2.cni=p.cni ORDER BY hg2.datePromo DESC LIMIT 1) GROUP BY g.libelleGFr ORDER BY g.codeG ASC"
    return db.execute(statement=statment).all()

async def GetNbrPersonnelCloseToRetirement(db:Session):
    ageRetraite = 62
    statment = "select SUM(nbrPCTR) AS nbrPCTR from (SELECT COUNT(*) as nbrPCTR FROM `personnel` p WHERE p.actif=1 GROUP BY dateNaiss HAVING date_add(p.dateNaiss, interval "+str(ageRetraite)+" YEAR) <= DATE_ADD(CURDATE(), INTERVAL 6 MONTH)) AS nbrPCTR"
    return db.execute(statement = statment).first()
