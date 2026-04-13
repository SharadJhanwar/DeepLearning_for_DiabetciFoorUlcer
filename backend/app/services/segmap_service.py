import time
from app.models.segmentation.predictor import get_predictor
from app.utils.image_utils import numpy_to_base64
from app.schemas.segmap_schema import SegmentResponse

class SegmapService:
    def __init__(self):
        self.predictor = get_predictor()

    def process_segmentation(self, image_bytes: bytes) -> SegmentResponse:
        """Runs U-Net inference and returns both the mask and verification overlay."""
        start_time = time.time()
        
        try:
            # 1. Run prediction (returns mask and overlay)
            mask_np, overlay_np = self.predictor.predict(image_bytes)
            
            # 2. Convert both output images back to Base64
            mask_base64 = numpy_to_base64(mask_np)
            overlay_base64 = numpy_to_base64(overlay_np)
            
            inference_time = round(time.time() - start_time, 4)
            
            return SegmentResponse(
                mask_base64=mask_base64,
                overlay_base64=overlay_base64,
                success=True,
                metadata={
                    "inference_time": inference_time,
                    "units": "seconds"
                }
            )
            
        except Exception as e:
            return SegmentResponse(
                mask_base64="",
                overlay_base64="",
                success=False,
                error=str(e)
            )

# Singleton instance
segmap_service = SegmapService()

def get_segmap_service():
    return segmap_service
