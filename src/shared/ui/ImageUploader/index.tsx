import { memo, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useUploadImage } from '@/shared/model/useUploadImage';
import { ImageType } from '@/shared/types/imageType';

export interface ImageUploadState {
  readonly totalImages: number;
  readonly uploadingCount: number;
  readonly uploadedCount: number;
  readonly hasUploadingImages: boolean;
  readonly hasFailedImages: boolean;
}

interface Props {
  images?: string[];
  onImagesChange?: (images: string[]) => void;
  onImageIdsChange?: (imageIds: number[]) => void;
  onUploadStateChange?: (state: ImageUploadState) => void;
  readonly?: boolean;
  title?: string;
  maxImages?: number;
}

interface ImageStatus {
  uri: string;
  status: 'uploading' | 'uploaded' | 'failed';
  imageData?: ImageType;
  error?: Error;
}

const ImageUploader = ({
  images = [],
  onImagesChange,
  onImageIdsChange,
  onUploadStateChange,
  title = '사진첨부',
  readonly = false,
  maxImages = 5,
}: Props) => {
  const [imageStatuses, setImageStatuses] = useState<ImageStatus[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadImageMutation = useUploadImage();

  const uploadState = useMemo((): ImageUploadState => {
    const uploadingCount = imageStatuses.filter((status) => status.status === 'uploading').length;
    const uploadedCount = imageStatuses.filter((status) => status.status === 'uploaded').length;
    const failedCount = imageStatuses.filter((status) => status.status === 'failed').length;

    return {
      totalImages: images.length,
      uploadingCount,
      uploadedCount,
      hasUploadingImages: uploadingCount > 0,
      hasFailedImages: failedCount > 0,
    };
  }, [images.length, imageStatuses]);

  useEffect(() => {
    onUploadStateChange?.(uploadState);
  }, [uploadState, onUploadStateChange]);

  const updateImageStatus = useCallback((uri: string, status: Partial<ImageStatus>) => {
    setImageStatuses((prev) =>
      prev.map((item) => (item.uri === uri ? { ...item, ...status } : item))
    );
  }, []);

  const removeImageByUri = useCallback(
    (uri: string) => {
      const imageIndex = images.indexOf(uri);
      if (imageIndex === -1) return;

      const newImages = images.filter((img) => img !== uri);
      onImagesChange?.(newImages);

      setImageStatuses((prev) => prev.filter((item) => item.uri !== uri));

      const uploadedStatuses = imageStatuses.filter(
        (status) => status.uri !== uri && status.status === 'uploaded' && status.imageData
      );
      const imageIds = uploadedStatuses.map((status) => status.imageData!.imageId);
      onImageIdsChange?.(imageIds);
    },
    [images, imageStatuses, onImagesChange, onImageIdsChange]
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (fileInputRef.current) fileInputRef.current.value = '';

      const objectUrl = URL.createObjectURL(file);
      const newImages = [...images, objectUrl];
      onImagesChange?.(newImages);

      const newStatus: ImageStatus = { uri: objectUrl, status: 'uploading' };
      setImageStatuses((prev) => [...prev, newStatus]);

      try {
        const uploadedImage = await uploadImageMutation.mutateAsync(file);

        updateImageStatus(objectUrl, { status: 'uploaded', imageData: uploadedImage });

        const allUploadedStatuses = imageStatuses.filter(
          (s) => s.status === 'uploaded' && s.imageData
        );
        const updatedStatuses = [
          ...allUploadedStatuses,
          { ...newStatus, status: 'uploaded' as const, imageData: uploadedImage },
        ];
        const imageIds = updatedStatuses.map((status) => status.imageData!.imageId);
        onImageIdsChange?.(imageIds);
      } catch (error) {
        console.error(error);
        updateImageStatus(objectUrl, {
          status: 'failed',
          error: error instanceof Error ? error : new Error('업로드 실패'),
        });

        setTimeout(() => {
          removeImageByUri(objectUrl);
        }, 1500);
      }
    },
    [
      images,
      imageStatuses,
      onImagesChange,
      uploadImageMutation,
      updateImageStatus,
      removeImageByUri,
      onImageIdsChange,
    ]
  );

  const removeImage = useCallback(
    (index: number) => {
      if (readonly) return;

      const imageUri = images[index];
      if (!imageUri) return;

      removeImageByUri(imageUri);
    },
    [images, readonly, removeImageByUri]
  );

  const getImageStatus = useCallback(
    (uri: string): ImageStatus | undefined => {
      return imageStatuses.find((status) => status.uri === uri);
    },
    [imageStatuses]
  );

  const canAddMoreImages = useMemo(() => {
    return !readonly && images.length < maxImages && !uploadState.hasUploadingImages;
  }, [readonly, images.length, maxImages, uploadState.hasUploadingImages]);

  return (
    <div>
      <span className="mb-2 block text-lg text-black">{title}</span>
      <div className="flex flex-row flex-wrap items-center gap-3">
        {images.map((uri, idx) => {
          const status = getImageStatus(uri);
          const isUploading = status?.status === 'uploading';
          const isFailed = status?.status === 'failed';

          return (
            <button
              key={`${uri}-${idx}`}
              type="button"
              onClick={() => removeImage(idx)}
              disabled={readonly || isUploading}
              className="relative h-12 w-12">
              <img
                src={uri}
                alt="업로드 이미지"
                className={`h-12 w-12 rounded-full object-cover ${isFailed ? 'opacity-50' : ''}`}
              />
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              )}
              {isFailed && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-red-500/70">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
        {canAddMoreImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="#111" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default memo(ImageUploader);
