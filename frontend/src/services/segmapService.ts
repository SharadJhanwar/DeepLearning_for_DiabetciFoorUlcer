import api from './api';

export interface SegmapResponse {
  mask_base64: string;
  overlay_base64: string;
  success: boolean;
  metadata?: {
    inference_time: number;
    units: string;
  };
  error?: string;
}

export const segmentImage = async (file: File): Promise<SegmapResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<SegmapResponse>('/segmap', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
