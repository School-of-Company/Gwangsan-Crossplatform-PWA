import { instance } from '../lib/axios';
import { ImageType } from '../types/imageType';

export const uploadImage = async (input: File | string): Promise<ImageType> => {
  try {
    const formData = new FormData();

    if (input instanceof File) {
      formData.append('file', input, input.name);
    } else {
      const filename = input.split('/').pop() || 'image.jpg';
      const fileType = filename.split('.').pop()?.toLowerCase() || 'jpeg';
      formData.append('file', { uri: input, name: filename, type: `image/${fileType}` } as unknown as Blob);
    }

    const response = await instance.post<ImageType>('/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
