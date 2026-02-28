import { useState, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { useUploadImage } from '@/shared/model/useUploadImage';

export interface ImagePreview {
  imageId: number;
  imageUrl: string;
  localUri: string;
}

interface UseChatInputProps {
  onSendMessage: (content: string | null, imageIds: number[]) => void;
  disabled?: boolean;
}

export const useChatInput = ({ onSendMessage, disabled = false }: UseChatInputProps) => {
  const [textMessage, setTextMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadImageMutation = useUploadImage();

  const canSend =
    (textMessage.trim().length > 0 || selectedImages.length > 0) &&
    !disabled &&
    !isUploading &&
    !isSending;

  const updateMessage = useCallback((text: string) => {
    setTextMessage(text);
  }, []);

  const uploadImage = useCallback(
    async (imageUri: string) => {
      try {
        return await uploadImageMutation.mutateAsync(imageUri);
      } catch (error) {
        console.error(error);
        toast.error('이미지 업로드 중 오류가 발생했습니다.');
        throw error;
      }
    },
    [uploadImageMutation]
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      try {
        const localUri = URL.createObjectURL(file);
        const uploadedImage = await uploadImage(localUri);

        const newImagePreview: ImagePreview = {
          imageId: uploadedImage.imageId,
          imageUrl: uploadedImage.imageUrl,
          localUri,
        };

        setSelectedImages((prev) => [...prev, newImagePreview]);
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [uploadImage]
  );

  const handleImagePicker = useCallback(() => {
    if (disabled || isUploading || selectedImages.length >= 5) return;
    fileInputRef.current?.click();
  }, [disabled, isUploading, selectedImages.length]);

  const removeImage = useCallback((imageId: number) => {
    setSelectedImages((prev) => prev.filter((img) => img.imageId !== imageId));
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!canSend) return;

    setIsSending(true);

    try {
      const content = textMessage.trim() || null;
      const imageIds = selectedImages.map((img) => img.imageId);

      onSendMessage(content, imageIds);

      setTextMessage('');
      setSelectedImages([]);
    } finally {
      setIsSending(false);
    }
  }, [canSend, textMessage, selectedImages, onSendMessage]);

  const resetInput = useCallback(() => {
    setTextMessage('');
    setSelectedImages([]);
    setIsUploading(false);
    setIsSending(false);
  }, []);

  return {
    textMessage,
    selectedImages,
    isUploading,
    isSending,
    canSend,
    fileInputRef,

    updateMessage,
    handleImagePicker,
    handleFileChange,
    removeImage,
    handleSendMessage,
    resetInput,
  };
};
