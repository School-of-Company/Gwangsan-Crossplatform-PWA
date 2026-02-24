import { useLocalSearchParams } from 'expo-router';
import { usePostAction } from '@/widget/post/model/usePostAction';
import { PostPageContent } from '@/widget/post/ui/PostPageContent';
import ReportModal from '~/entity/post/ui/ReportModal';
import ReviewsModal from '~/entity/post/ui/ReviewsModal';
import { Header } from '~/shared/ui';

export default function PostPageView() {
  const { id, review } = useLocalSearchParams<{ id: string; review?: string }>();

  const {
    data,
    isLoading,
    error,
    isMyPost,
    refreshing,
    isDeleting,
    isReportModalVisible,
    isReviewModalVisible,
    reviewLight,
    reviewContents,
    isChatLoading,
    isTradeRequestLoading,
    modalHandlers,
    reviewHandlers,
    navigationHandlers,
    actionHandlers,
    computedValues,
  } = usePostAction({ id: id!, review });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8FC31D] border-t-transparent" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white">
        <span className="text-error-500">게시글을 불러오는데 실패했습니다.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header headerTitle={computedValues.headerTitle} />

      <PostPageContent
        data={data}
        isMyPost={isMyPost}
        isDeleting={isDeleting}
        isChatLoading={isChatLoading}
        isTradeRequestLoading={isTradeRequestLoading}
        refreshing={refreshing}
        review={review}
        computedValues={computedValues}
        onDeletePress={actionHandlers.onDelete}
        onReportPress={modalHandlers.openReportModal}
        onEditPress={navigationHandlers.goToEdit}
        onChatPress={navigationHandlers.goToChat}
        onTradeRequest={actionHandlers.onTradeRequest}
        onReviewButtonPress={modalHandlers.openReviewModal}
        onRefresh={actionHandlers.onRefresh}
      />

      <ReportModal
        productId={data?.id || 0}
        memberId={data?.member.memberId}
        isVisible={isReportModalVisible}
        onClose={modalHandlers.closeReportModal}
      />

      <ReviewsModal
        isVisible={isReviewModalVisible}
        onClose={modalHandlers.closeReviewModal}
        onSubmit={reviewHandlers.onSubmit}
        light={reviewLight}
        setLight={reviewHandlers.onLightChange}
        contents={reviewContents}
        onContentsChange={reviewHandlers.onContentsChange}
        onAnimationComplete={reviewHandlers.onAnimationComplete}
      />
    </div>
  );
}
