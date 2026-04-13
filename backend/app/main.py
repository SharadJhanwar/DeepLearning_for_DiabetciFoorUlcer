from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.core.config import settings

def get_application() -> FastAPI:
    application = FastAPI(
        title=settings.APP_NAME,
        debug=settings.DEBUG,
        version=settings.VERSION
    )

    # Configure CORS - Essential for React <-> FastAPI connection
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include API Routes
    application.include_router(api_router, prefix="/api")

    return application

app = get_application()

@app.get("/")
def read_root():
    return {"status": "online", "project": settings.APP_NAME}
