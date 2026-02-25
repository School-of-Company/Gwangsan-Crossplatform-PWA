import { getLightColor } from '~/shared/lib/handleLightColor';
import { ReviewPostType } from '~/view/reviews/model/reviewPostType';
import { clsx } from 'clsx';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import gwangsanLogo from '~/shared/assets/png/gwangsanLogo.png';

interface ReviewPostProps {
  review: ReviewPostType;
}

export default function ReviewPost({ review }: ReviewPostProps) {
  const R = useRouter();
  const handleClick = useCallback(() => {
    R.push('/cancelTrade/' + review.reviewId);
  }, [R, review]);

  const logoSrc =
    typeof gwangsanLogo === 'string'
      ? gwangsanLogo
      : (gwangsanLogo as any).src || (gwangsanLogo as any).uri || '';

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full flex-row gap-9 border-b border-b-gray-200 px-6 py-3 text-left hover:bg-gray-50">
      {Array.isArray(review.images) && review.images.length > 0 ? (
        review.images.map((image, index) => (
          <img
            key={index}
            src={image.imageUrl}
            alt="리뷰 이미지"
            className="size-24 rounded-lg object-cover"
          />
        ))
      ) : (
        <img src={logoSrc} alt="기본 이미지" className="size-[100px] object-cover" />
      )}
      <div className="flex flex-col gap-[10px] px-6 py-[10px]">
        <div className="relative flex h-4 w-[120px] items-center rounded-xl bg-gray-200">
          <div
            style={{ width: `${review.light}%` }}
            className={clsx('absolute mx-1 h-2 rounded-xl', getLightColor(review.light))}
          />
        </div>
        <span className="mb-1 max-w-[200px] break-words text-label text-[#555555]">
          {review.content}
        </span>
        <span className="text-label">{review.reviewerName}</span>
      </div>
    </button>
  );
}
