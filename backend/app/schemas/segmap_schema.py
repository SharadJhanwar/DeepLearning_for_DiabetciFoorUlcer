from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class SegmentResponse(BaseModel):
    mask_base64: str = Field(..., description="The binary segmentation mask in Base64.")
    overlay_base64: str = Field(..., description="The verification overlay (original + greenish tint) in Base64.")
    success: bool = Field(True, description="Indicates if the segmentation was successful.")
    metadata: Optional[Dict[str, Any]] = Field(None, description="Additional info like inference time.")
    error: Optional[str] = Field(None, description="Details about any error.")
