import torch
import cv2
import numpy as np
import albumentations as A
from albumentations.pytorch import ToTensorV2
from app.models.segmentation.model_loader import load_segmentation_model
from typing import Tuple

class SegmentationPredictor:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = load_segmentation_model()
        if self.model:
            self.model.to(self.device)
            self.model.eval()
        
        self.transform = A.Compose([
            A.Resize(256, 256),
            A.Normalize(mean=(0.485, 0.456, 0.406), std=(0.229, 0.224, 0.225)),
            ToTensorV2(),
        ])

    def predict(self, image_bytes: bytes) -> Tuple[np.ndarray, np.ndarray]:
        """
        Runs segmentation on the input image bytes.
        Returns:
            - mask_resized: Binary mask (black/white)
            - overlay: Original image with semi-transparent green overlay on the mask area.
        """
        if not self.model:
            raise RuntimeError("Model was not loaded successfully.")

        # 1. Load image
        nparr = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        h, w = image.shape[:2]
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # 2. Preprocess
        transformed = self.transform(image=image_rgb)
        input_tensor = transformed['image'].unsqueeze(0).to(self.device)

        # 3. Inference
        with torch.no_grad():
            output = self.model(input_tensor)
            prob_mask = torch.sigmoid(output).squeeze().cpu().numpy()
            binary_mask_256 = (prob_mask > 0.5).astype(np.uint8) * 255

        # 4. Resize mask back to original dimensions
        mask_resized = cv2.resize(binary_mask_256, (w, h), interpolation=cv2.INTER_NEAREST)

        # 5. Create Verification Overlay
        overlay = image.copy()
        
        # Color for the mask (Green: B=0, G=255, R=0 in BGR)
        mask_color = np.array([0, 255, 0], dtype=np.uint8)
        
        # Create a boolean mask where pixel values are > 0
        bool_mask = mask_resized > 0
        
        if np.any(bool_mask):
            # Apply colored tint only to the mask area
            # We mix the original pixel with the color (alpha=0.6 for original, 0.4 for tint)
            roi = overlay[bool_mask]
            tinted_roi = cv2.addWeighted(roi, 0.6, np.full_like(roi, mask_color), 0.4, 0)
            overlay[bool_mask] = tinted_roi
            
            # Optional: Add a crisp green border around the segmented area
            contours, _ = cv2.findContours(mask_resized, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            cv2.drawContours(overlay, contours, -1, (0, 255, 0), 2)

        return mask_resized, overlay

# Singleton instance
predictor = None

def get_predictor():
    global predictor
    if predictor is None:
        predictor = SegmentationPredictor()
    return predictor
