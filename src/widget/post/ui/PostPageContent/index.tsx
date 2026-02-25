import React from 'react';
import MiniProfile from '~/entity/post/ui/miniProfile';
import { Button } from '~/shared/ui';
import type { PostDetailResponse } from '~/entity/post/api/getItem';
import logoPng from '~/shared/assets/png/logo.png';

interface PostPageContentProps {
  readonly data: PostDetailResponse;
  readonly isMyPost: boolean;
  readonly isDeleting: boolean;
  readonly isChatLoading: boolean;
  readonly isTradeRequestLoading: boolean;
  readonly refreshing: boolean;
  readonly review?: string;
  readonly computedValues: {
    readonly canTrade: boolean;
    readonly isTradeButtonDisabled: boolean;
    readonly tradeButtonText: string;
  };
  readonly onDeletePress: () => void;
  readonly onReportPress: () => void;
  readonly onEditPress: () => void;
  readonly onChatPress: () => void;
  readonly onTradeRequest: () => void;
  readonly onReviewButtonPress: () => void;
  readonly onRefresh: () => void;
}

export const PostPageContent: React.FC<PostPageContentProps> = ({
  data,
  isMyPost,
  isDeleting,
  isChatLoading,
  refreshing,
  review,
  computedValues,
  onDeletePress,
  onReportPress,
  onEditPress,
  onChatPress,
  onTradeRequest,
  onReviewButtonPress,
}) => {
  const logoSrc =
    typeof logoPng === 'string' ? logoPng : (logoPng as any).src || (logoPng as any).uri || '';

  return (
    <div className="flex-1 overflow-y-auto">
      {refreshing && (
        <div className="flex justify-center py-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#8FC31D] border-t-transparent" />
        </div>
      )}
      {data.images && data.images.length > 0 ? (
        <img
          src={data.images[0].imageUrl}
          alt="게시글 이미지"
          className="h-[280px] w-full object-cover"
        />
      ) : (
        <img src={logoSrc} alt="기본 이미지" className="h-[280px] w-full object-cover" />
      )}

      <MiniProfile
        nickname={data.member.nickname}
        placeName={data.member.placeName}
        light={data.member.light}
        memberId={data.member.memberId}
      />

      <div className="flex flex-col gap-6 p-6">
        <p className="text-titleSmall">{data.title}</p>
        <p className="text-body3">{data.gwangsan} 광산</p>
        <p>{data.content}</p>

        <button
          type="button"
          onClick={isMyPost ? onDeletePress : onReportPress}
          disabled={isDeleting}>
          <span className="mb-24 mt-[25px] text-error-500 underline">
            {isMyPost
              ? isDeleting
                ? '삭제 처리 중...'
                : '이 게시글 삭제하기'
              : '이 게시글 신고하기'}
          </span>
        </button>

        <div className="flex w-full flex-row justify-center gap-4">
          {review === '1' ? (
            <Button variant="primary" width="w-full" onClick={onReviewButtonPress}>
              리뷰 작성
            </Button>
          ) : (
            <>
              {!isMyPost && (
                <Button
                  variant="secondary"
                  width="w-1/2"
                  onClick={onChatPress}
                  disabled={isChatLoading}>
                  {isChatLoading ? '채팅방 생성 중...' : '채팅하기'}
                </Button>
              )}
              {isMyPost ? (
                <Button variant="primary" width="w-[100%]" onClick={onEditPress}>
                  수정하기
                </Button>
              ) : (
                <Button
                  variant="primary"
                  width="w-1/2"
                  onClick={onTradeRequest}
                  disabled={computedValues.isTradeButtonDisabled}>
                  {computedValues.tradeButtonText}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
