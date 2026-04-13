import { useState } from 'react';
import { Download, Info, Eye, Layers } from 'lucide-react';
import { Button } from '../ui/Button';

interface ResultViewerProps {
  maskUrl: string | null;
  overlayUrl: string | null;
  isLoading: boolean;
  metadata?: {
    inference_time: number;
    units: string;
  } | null;
}

export const ResultViewer = ({ maskUrl, overlayUrl, isLoading, metadata }: ResultViewerProps) => {
  const [viewMode, setViewMode] = useState<'mask' | 'overlay'>('overlay');

  if (isLoading) {
    return (
      <div className="h-[400px] bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-500 font-medium">Analyzing wound area...</p>
      </div>
    );
  }

  const currentImageUrl = viewMode === 'mask' ? maskUrl : overlayUrl;

  if (!currentImageUrl) {
    return (
      <div className="h-[400px] bg-slate-50 border border-slate-200 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 text-slate-400">
        <Info size={32} />
        <p className="text-sm">Segmentation results will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('overlay')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-smooth ${
              viewMode === 'overlay' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Eye size={14} /> Verification Overlay
          </button>
          <button
            onClick={() => setViewMode('mask')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-smooth ${
              viewMode === 'mask' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Layers size={14} /> Binary Mask
          </button>
        </div>

        <a href={currentImageUrl} download={`wound_${viewMode}.png`}>
          <Button variant="outline" size="sm">
            <Download size={14} className="mr-2" /> Download
          </Button>
        </a>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner group">
        <img 
          src={currentImageUrl} 
          alt={viewMode === 'mask' ? 'Segmentation Mask' : 'Verification Overlay'} 
          className="w-full h-auto max-h-[400px] object-contain mx-auto" 
        />
        
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
            {viewMode === 'mask' ? 'Binary View' : 'Verification View'}
          </div>
        </div>
      </div>

      {metadata && (
        <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
          <div className="flex items-center gap-2 text-indigo-700">
            <Info size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Inference Metadata</span>
          </div>
          <p className="text-xs text-indigo-600 font-medium">
            Computed in {metadata.inference_time} {metadata.units}
          </p>
        </div>
      )}
    </div>
  );
};
