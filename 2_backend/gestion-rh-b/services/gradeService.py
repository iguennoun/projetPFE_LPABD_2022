from sqlalchemy.orm import Session
from models.grade import GradeModel
from schemas.grade import GradeCreate

async def CreateGrade(db:Session, grade:GradeCreate):
    grade_db = GradeModel(codeG=grade.codeG, libelleGFr=grade.libelleGFr, libelleGAr=grade.libelleGAr)
    db.add(grade_db)
    db.commit()
    db.refresh(grade_db)
    return grade_db

async def UpdateGrade(db:Session, grade:GradeCreate, codeG:int):
    result = db.query(GradeModel).filter(GradeModel.codeG == codeG).update({GradeModel.libelleGFr:grade.libelleGFr, GradeModel.libelleGAr:grade.libelleGAr}, synchronize_session=False)
    db.commit()
    if result ==1:
        return db.query(GradeModel).filter(GradeModel.codeG == codeG).first()
    return False

async def DeleteGrade(db:Session, codeG:int):
    result = db.query(GradeModel).filter(GradeModel.codeG == codeG).delete()
    if result == 1:
        return True
    return False

async def GetAllGrades(db:Session):
    return db.query(GradeModel).all()

async def GetGrade(db:Session, codeG:int):
    return db.query(GradeModel).filter(GradeModel.codeG == codeG).first()
