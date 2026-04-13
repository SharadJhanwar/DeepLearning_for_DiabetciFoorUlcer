import React, { useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface UploadImageProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
  onClear: () => void;
  isLoading: boolean;
  runInference: () => void;
}

export const UploadImage = ({ 
  onImageSelect, 
  previewUrl, 
  onClear, 
  isLoading, 
  runInference 
}: UploadImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {!previewUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center gap-4 bg-slate-50 hover:bg-slate-100 transition-smooth cursor-pointer"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400">
            <Upload size={24} />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG or JPEG (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-auto max-h-[400px] object-contain mx-auto" 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
              Change
            </Button>
            <Button variant="secondary" size="sm" onClick={onClear}>
              <X size={16} />
            </Button>
          </div>
        </div>
      )}

      {previewUrl && (
        <Button
          className="w-full"
          onClick={runInference}
          isLoading={isLoading}
        >
          <ImageIcon size={18} className="mr-2" />
          Run Segmentation
        </Button>
      )}
    </div>
  );
};
