import { useState, useCallback, useEffect } from 'react';
import { Header } from '@/shared/ui';
import {
  ItemFormProgressBar,
  createItemFormRequestBody,
  useCreateItem,
} from '~/entity/write/itemForm';
import { ItemFormRenderContent, ItemFormRenderButton } from '~/widget/write/itemForm';
import { router, useLocalSearchParams } from 'expo-router';
import type { ImageUploadState } from '@/shared/ui/ImageUploader';
import { toast } from 'react-toastify';
import { ProductType } from '~/widget/write/model/type';
import { ModeType } from '~/widget/write/model/mode';
import { useEditPost } from '~/entity/post/model/useEditPost';
import { useGetItem } from '~/entity/post';

const ItemFormPage = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [mode, setMode] = useState('');
  const [content, setContent] = useState('');
  const [gwangsan, setGwangsan] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [imageIds, setImageIds] = useState<number[]>([]);
  const [imageUploadState, setImageUploadState] = useState<ImageUploadState | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createItemMutation = useCreateItem();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: postData, isLoading, error } = useGetItem(id);
  const editPostMutation = useEditPost();

  useEffect(() => {
    if (postData) {
      setType(postData.type as ProductType);
      setMode(postData.mode as ModeType);
      setTitle(postData.title);
      setContent(postData.content);
      setGwangsan(postData.gwangsan.toString());

      if (postData.images && postData.images.length > 0) {
        const imageUrls = postData.images.map((img) => img.imageUrl);
        const existingImageIds = postData.images.map((img) => img.imageId);
        setImages(imageUrls);
        setImageIds(existingImageIds);
      }
    }
  }, [postData]);

  const isStep1Valid =
    mode.trim().length > 0 &&
    type.trim().length > 0 &&
    title.trim().length > 0 &&
    content.trim().length > 0;

  const mustHaveImage = type === 'OBJECT' && mode === 'GIVER';

  const imagesReady =
    !imageUploadState ||
    (!imageUploadState.hasUploadingImages && !imageUploadState.hasFailedImages);
  const hasAtLeastOneImage = (images?.length ?? 0) > 0 || (imageIds?.length ?? 0) > 0;

  const isStep2Valid =
    gwangsan.trim().length > 0 && (mustHaveImage ? imagesReady && hasAtLeastOneImage : imagesReady);

  const handleTitleChange = useCallback((v: string) => setTitle(v), []);
  const handleContentChange = useCallback((v: string) => setContent(v), []);
  const handleModeChange = useCallback((v: ModeType) => setMode(v), []);
  const handleTypeChange = useCallback((v: ProductType) => setType(v), []);
  const handleGwangsanChange = useCallback(
    (v: string) => setGwangsan(v.replace(/[^0-9]/g, '')),
    []
  );
  const handleImagesChange = useCallback((v: string[]) => setImages(v), []);
  const handleImageIdsChange = useCallback((ids: number[]) => setImageIds(ids), []);
  const handleImageUploadStateChange = useCallback((state: ImageUploadState) => {
    setImageUploadState(state);
  }, []);

  const handleCompletePress = async () => {
    try {
      if (isSubmitting) return;

      if (imageUploadState?.hasUploadingImages) {
        toast.error('이미지 업로드가 완료될 때까지 기다려주세요.');
        return;
      }

      if (imageUploadState?.hasFailedImages) {
        toast.error('이미지 업로드 실패');
        return;
      }

      setIsSubmitting(true);

      const formData = {
        type,
        mode,
        title,
        content,
        gwangsan,
        images,
      };

      const requestBody = createItemFormRequestBody({
        ...formData,
        imageIds,
      });

      if (id) {
        const editPayload = { ...requestBody, imageIds: requestBody.imageIds ?? [] };
        await editPostMutation.mutateAsync({ data: editPayload, id });
      } else {
        await createItemMutation.mutateAsync(requestBody);
      }

      router.replace({
        pathname: '/main',
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8FC31D] border-t-transparent" />
      </div>
    );
  }

  if (id && (error || !postData)) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white">
        <span className="text-error-500">게시글을 불러오는데 실패했습니다.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header headerTitle="게시글" />
      <ItemFormProgressBar step={step} />
      <div className="flex-1 overflow-y-auto">
        <div className="flex min-h-full flex-col justify-between">
          <ItemFormRenderContent
            step={step}
            title={title}
            content={content}
            gwangsan={gwangsan}
            images={images}
            mode={mode as ModeType}
            type={type as ProductType}
            onTitleChange={handleTitleChange}
            onContentChange={handleContentChange}
            onModeChange={handleModeChange}
            onTypeChange={handleTypeChange}
            onImagesChange={handleImagesChange}
            onGwangsanChange={handleGwangsanChange}
            onImageIdsChange={handleImageIdsChange}
            onImageUploadStateChange={handleImageUploadStateChange}
          />
          <div>
            <ItemFormRenderButton
              step={step}
              isStep1Valid={isStep1Valid}
              isStep2Valid={isStep2Valid}
              onNextStep={setStep}
              onEditPress={() => setStep(1)}
              onCompletePress={handleCompletePress}
              isSubmitting={isSubmitting}
              imageUploadState={imageUploadState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemFormPage;
