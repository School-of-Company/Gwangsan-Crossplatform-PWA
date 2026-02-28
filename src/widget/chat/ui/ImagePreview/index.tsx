import { memo } from 'react';
import type { ImagePreview as ImagePreviewType } from '../../model/useChatInput';

interface ImagePreviewProps {
  images: ImagePreviewType[];
  onRemoveImage: (imageId: number) => void;
}

const ImagePreviewComponent = ({ images, onRemoveImage }: ImagePreviewProps) => {
  if (images.length === 0) return null;

  return (
    <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
      <div className="flex flex-row gap-2 overflow-x-auto">
        {images.map((image) => (
          <div key={image.imageId} className="relative flex-shrink-0">
            <img
              src={image.localUri}
              alt="preview"
              className="h-16 w-16 rounded-lg object-cover"
            />
            <button
              className="absolute -right-1 -top-1 h-6 w-6 flex items-center justify-center rounded-full bg-red-500"
              onClick={() => onRemoveImage(image.imageId)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ImagePreview = memo(ImagePreviewComponent);
