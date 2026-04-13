from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    APP_NAME: str = "DFU Segmentation API"
    DEBUG: bool = True
    VERSION: str = "1.0.0"
    
    # Model Settings
    SEGMENTATION_MODEL_PATH: str = os.path.join(
        os.path.dirname(os.path.dirname(__file__)), 
        "models", "segmentation", "best_model.pth"
    )
    
    # CORS
    ALLOWED_ORIGINS: list[str] = ["http://localhost:5173"]

settings = Settings()
