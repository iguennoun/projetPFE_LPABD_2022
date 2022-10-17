from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.pays import router as paysRouter
from routers.region import router as regionRouter
from routers.ville import router as villeRouter
from routers.batiment import router as batimentRouter
from routers.typeus import router as typeusRouter
from routers.us import router as usRouter
from routers.fonction import router as fonctionRouter
from routers.grade import router as gradeRouter
from routers.specdiplome import router as specdiplomeRouter
from routers.niveauetu import router as niveauetuRouter
from routers.personnel import router as personnelRouter
from routers.historespous import router as historespousRouter
from routers.histous import router as histousRouter
from routers.histofonction import router as histofonctionRouter
from routers.histograde import router as histogradeRouter
from routers.histodiplome import router as histodiplomeRouter
from routers.action import router as actionRouter
from routers.stat import router as statRouter

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(paysRouter)
app.include_router(regionRouter)
app.include_router(villeRouter)
app.include_router(batimentRouter)
app.include_router(typeusRouter)
app.include_router(usRouter)
app.include_router(fonctionRouter)
app.include_router(gradeRouter)
app.include_router(specdiplomeRouter)
app.include_router(niveauetuRouter)
app.include_router(personnelRouter)
app.include_router(historespousRouter)
app.include_router(histousRouter)
app.include_router(histofonctionRouter)
app.include_router(histogradeRouter)
app.include_router(histodiplomeRouter)
app.include_router(actionRouter)
app.include_router(statRouter)


@app.get("/")
def root():
    return {"message": "Hello to RH Application"}

