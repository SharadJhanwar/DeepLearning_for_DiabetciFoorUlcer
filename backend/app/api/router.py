from fastapi import APIRouter
from app.api.routes import segmap

api_router = APIRouter()

# Include individual routes
api_router.include_router(segmap.router, tags=["segmentation"])
