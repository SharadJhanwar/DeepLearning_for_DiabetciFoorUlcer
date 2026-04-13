import { useState } from 'react';
import { segmentImage } from '../services/segmapService';
import type { SegmapResponse } from '../services/segmapService';

export const useSegmentation = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [maskUrl, setMaskUrl] = useState<string | null>(null);
  const [overlayUrl, setOverlayUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<SegmapResponse['metadata']>(null);

  const handleImageSelect = (file: File) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setMaskUrl(null);
    setOverlayUrl(null);
    setError(null);
  };

  const runInference = async () => {
    if (!image) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await segmentImage(image);
      if (result.success && result.mask_base64) {
        setMaskUrl(result.mask_base64);
        setOverlayUrl(result.overlay_base64);
        setMetadata(result.metadata);
      } else {
        setError(result.error || 'Segmentation failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'An error occurred during inference');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreviewUrl(null);
    setMaskUrl(null);
    setOverlayUrl(null);
    setIsLoading(false);
    setError(null);
  };

  return {
    image,
    previewUrl,
    maskUrl,
    overlayUrl,
    isLoading,
    error,
    metadata,
    handleImageSelect,
    runInference,
    reset,
  };
};
