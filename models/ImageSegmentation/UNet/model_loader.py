import os
import torch
import gdown
import segmentation_models_pytorch as smp
from app.core.config import settings

# Google Drive File ID for the model weights
FILE_ID = "1Fk9QJ_dqKFrc9veFkyOWlWxheq-XYFdi"

def download_weights():
    """Download the best_model.pth if it doesn't already exist."""
    if not os.path.exists(settings.SEGMENTATION_MODEL_PATH):
        print(f"Weights not found at {settings.SEGMENTATION_MODEL_PATH}. Downloading from Google Drive...")
        
        url = f"https://drive.google.com/uc?id={FILE_ID}"
        gdown.download(url, settings.SEGMENTATION_MODEL_PATH, quiet=False)
        
        print("Download complete.")

def load_segmentation_model():
    """Download (if needed) and initialize the U-Net model with weights."""
    download_weights()
    
    # Initialize the architecture (matches training script)
    model = smp.Unet(
        encoder_name='resnet34', 
        encoder_weights=None, # We load our own weights
        in_channels=3, 
        classes=1, 
        activation=None # We'll handle sigmoid/thresholding in predictor
    )
    
    # Load weights
    try:
        state_dict = torch.load(settings.SEGMENTATION_MODEL_PATH, map_location="cpu", weights_only=True)
        model.load_state_dict(state_dict)
        model.eval()
        print("Segmentation model loaded successfully.")
        return model
    except Exception as e:
        print(f"Error loading model weights: {e}")
        return None
