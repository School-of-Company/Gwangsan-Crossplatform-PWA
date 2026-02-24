import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../api/uploadImage';
import { ImageType } from '../types/imageType';
import { toast } from 'react-toastify';

export const useUploadImage = () => {
  return useMutation<ImageType, Error, File | string>({
    mutationFn: (input: File | string) => uploadImage(input),
    onSuccess: () => {
      toast.success('이미지가 성공적으로 업로드되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message || '이미지 업로드 중 오류가 발생했습니다.');
    },
  });
};
