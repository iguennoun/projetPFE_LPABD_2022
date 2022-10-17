from typing import List
from fastapi import APIRouter,Depends,HTTPException
from schemas.grade import GradeCreate, Grade
from sqlalchemy.orm import Session

from dependencies import get_db
from services.gradeService import CreateGrade,UpdateGrade,DeleteGrade,GetAllGrades,GetGrade

router = APIRouter(prefix="/grade", tags = ["grade"])

@router.get("/",response_model=List[Grade], status_code=200)
async def get_grades(db:Session = Depends(get_db)):
    all_grades = await GetAllGrades(db=db)
    return all_grades

@router.get("/{codeG}", response_model=Grade, status_code=200)
async def get_one_grade(codeG:int,db:Session = Depends(get_db)):
    one_grade = await GetGrade(db=db, codeG = codeG)
    if one_grade:
        return one_grade
    raise HTTPException(status_code=404, detail="Grade inéxistant !!!")

@router.post("/", response_model=Grade, status_code=201)
async def add_grade(grade : GradeCreate, db:Session = Depends(get_db)):
    new_grade = await CreateGrade(db=db, grade=grade)
    if new_grade:
        return new_grade
    raise HTTPException(status_code=400, detail="Erreur de création !!!")

@router.put("/{codeG}", response_model=Grade, status_code=200)
async def upd_grade(codeG:int, grade : GradeCreate, db:Session = Depends(get_db)):
    grade_to_upd = await UpdateGrade(db=db, grade=grade, codeG = codeG)
    if grade_to_upd:
        return grade_to_upd
    raise HTTPException(status_code=400, detail="Erreur de mise à jour !!!")

@router.delete("/{codeG}", status_code=200)
async def del_grade(codeG:int, db:Session = Depends(get_db)):
    result = await DeleteGrade(db=db, codeG = codeG)
    if result:
        return {"msg":"Supprimer"}
    raise HTTPException(status_code=404, detail=f"Le code grade {codeG} est inéxistant !!!")
