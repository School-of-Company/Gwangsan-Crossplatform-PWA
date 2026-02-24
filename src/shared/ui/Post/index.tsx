import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { PostType } from '~/shared/types/postType';
import iconPng from '~/shared/assets/png/icon.png';

export default function Post({ id, title, gwangsan, imageUrls = [], images = [] }: PostType) {
  const router = useRouter();

  const handlePress = useCallback(() => {
    if (id < 0) return;
    router.push(`/post/${id}`);
  }, [router, id]);

  const firstImage =
    imageUrls?.[0]?.imageUrl ??
    (Array.isArray(images) && images.length > 0
      ? typeof images[0] === 'string'
        ? images[0]
        : images[0]?.imageUrl
      : null);
  const additionalImagesCount =
    (imageUrls?.length && imageUrls.length > 0
      ? imageUrls.length
      : Array.isArray(images)
        ? images.length
        : 0) - 1;
  const isTemporary = id < 0;

  const placeholderSrc =
    typeof iconPng === 'string' ? iconPng : (iconPng as any).src || (iconPng as any).uri || '';

  return (
    <button
      type="button"
      onClick={handlePress}
      disabled={isTemporary}
      className={`flex w-full flex-row items-center gap-6 px-6 py-4 text-left transition-colors ${isTemporary ? 'cursor-default' : 'hover:bg-gray-50 active:bg-gray-100'}`}>
      <div className="relative flex-shrink-0">
        <img
          src={firstImage || placeholderSrc}
          alt={title}
          className={`h-20 w-20 rounded-xl object-cover ${isTemporary ? 'opacity-70' : ''}`}
        />
        {additionalImagesCount > 0 && (
          <div className="absolute bottom-1 right-1 rounded-md bg-black/50 px-2 py-1">
            <span className="text-xs text-white">+{additionalImagesCount}</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className={`text-lg font-semibold ${isTemporary ? 'opacity-70' : ''}`}>{title}</p>
        <p className={`text-sm text-gray-600 ${isTemporary ? 'opacity-70' : ''}`}>
          {gwangsan} 광산
        </p>
        {isTemporary && <p className="mt-1 text-xs text-gray-400">업로드 중...</p>}
      </div>
    </button>
  );
}
