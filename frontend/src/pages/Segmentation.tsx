import { useSegmentation } from '../hooks/useSegmentation';
import { Card } from '../components/ui/Card';
import { UploadImage } from '../components/segmentation/UploadImage';
import { ResultViewer } from '../components/segmentation/ResultViewer';
import { AlertCircle } from 'lucide-react';

const Segmentation = () => {
  const {
    previewUrl,
    maskUrl,
    overlayUrl,
    isLoading,
    error,
    metadata,
    handleImageSelect,
    runInference,
    reset
  } = useSegmentation();

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Input Image" description="Upload a photo of the ulcer area for analysis.">
          <UploadImage
            onImageSelect={handleImageSelect}
            previewUrl={previewUrl}
            onClear={reset}
            isLoading={isLoading}
            runInference={runInference}
          />
        </Card>

        <Card title="Segmentation Result" description="The predicted boundary of the diabetic foot ulcer.">
          <ResultViewer
            maskUrl={maskUrl}
            overlayUrl={overlayUrl}
            isLoading={isLoading}
            metadata={metadata}
          />
        </Card>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-2">Instructions</h4>
        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
          <li>Ensure the image is clear and well-lit.</li>
          <li>The wound should be centered in the frame.</li>
          <li>Avoid using flash to reduce glare.</li>
        </ul>
      </div>
    </div>
  );
};

export default Segmentation;
