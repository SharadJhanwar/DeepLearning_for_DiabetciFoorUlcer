from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, status
from app.schemas.segmap_schema import SegmentResponse
from app.services.segmap_service import get_segmap_service, SegmapService

router = APIRouter()

@router.post("/segmap", response_model=SegmentResponse, status_code=status.HTTP_200_OK)
async def segment_image(
    file: UploadFile = File(...), 
    service: SegmapService = Depends(get_segmap_service)
):
    """
    Endpoint to process an uploaded image and return its segmentation map.
    Returns a SegmentResponse with the mask in Base64 format and performance metadata.
    """
    try:
        image_bytes = await file.read()
        response = service.process_segmentation(image_bytes)
        
        if not response.success:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=response.error
            )
            
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Segmentation failed: {str(e)}"
        )
