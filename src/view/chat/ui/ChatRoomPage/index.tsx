import { useLocalSearchParams } from 'expo-router';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useChatMessages } from '~/widget/chat/model/useChatMessages';
import { useChatAction } from '~/widget/chat/model/useChatActions';
import { useTradeHandlers } from '~/widget/chat/model/useTradeHandlers';
import { useChatUIState } from '~/widget/chat/model/useChatUIState';
import { useChatRoomData } from '~/entity/chat/model/useChatRoomData';
import { ChatRoomHeader } from '@/widget/chat/ui/ChatRoomHeader';
import { ChatRoomContent } from '@/widget/chat/ui/ChatRoomContent';
import { TradeRequestModal } from '@/widget/chat/ui/TradeRequestModal';
import { Header } from '@/shared/ui/Header';
import { ChatInput } from '@/widget/chat';
import type { RoomId } from '@/shared/types/chatType';
import { useTradeRequest } from '~/entity/post/hooks/useTradeRequest';
import { createReview } from '~/entity/post/api/createReview';
import ReviewsModal from '~/entity/post/ui/ReviewsModal';

export default function ChatRoomPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const roomId = Number(id) as RoomId;

  const [isTradeRequestModalVisible, setIsTradeRequestModalVisible] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [reviewLight, setReviewLight] = useState<number>(60);
  const [reviewContents, setReviewContents] = useState('');

  const {
    scrollRef,
    messages,
    otherUserInfo,
    isLoading,
    isError,
    connectionState,
    messageHandlers,
    scrollToEnd,
    markRoomAsRead,
  } = useChatMessages({ roomId });

  const { navigationHandlers, formatLastMessageDate } = useChatAction({
    otherUserInfo,
  });

  const { data: roomData } = useChatRoomData({ roomId });

  const {
    handleTradeAccept,
    handleReservation,
    handleCancelReservation,
    hasTradeRequest,
    shouldShowButtons,
  } = useTradeHandlers({
    roomData: roomData || null,
    otherUserInfo,
  });

  const { tradeEmbedConfig, menuConfig, tradeRequestInfo, componentState } = useChatUIState({
    roomId,
    otherUserInfo,
    hasTradeRequest,
    shouldShowButtons,
    handleTradeAccept,
    handleReservation,
    handleCancelReservation,
  });

  const updatedComponentState = useMemo(
    () => ({
      ...componentState,
      hasMessages: messages.length > 0,
      canSendMessage: connectionState === 'connected',
    }),
    [componentState, messages.length, connectionState]
  );

  useEffect(() => {
    if (roomId) {
      markRoomAsRead(roomId).catch(console.error);
    }
  }, [roomId, markRoomAsRead]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => scrollToEnd(), 100);
    }
  }, [messages.length, scrollToEnd]);

  const { handleTradeRequest: executeTradeRequest, isLoading: isTradeRequestLoading } =
    useTradeRequest({
      productId: tradeRequestInfo.productId || 0,
      sellerId: tradeRequestInfo.sellerId || 0,
    });

  const handleMenuPress = useCallback(() => {
    setIsTradeRequestModalVisible(true);
  }, []);

  const handleTradeRequest = useCallback(async () => {
    try {
      await executeTradeRequest();
      setIsTradeRequestModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  }, [executeTradeRequest]);

  const handleReviewSubmit = useCallback(
    async (light: number, contents: string) => {
      if (!roomData?.product?.id) return;

      try {
        await createReview({
          productId: roomData.product.id,
          content: contents,
          light: light,
        });
        setIsReviewModalVisible(false);
        setReviewLight(60);
        setReviewContents('');
      } catch (error) {
        console.error('리뷰 작성 실패:', error);
      }
    },
    [roomData?.product?.id]
  );

  const handleReviewButtonPress = useCallback(() => {
    setIsReviewModalVisible(true);
  }, []);

  const renderHeader = () => (
    <ChatRoomHeader
      otherUserNickname={otherUserInfo.nickname}
      otherUserId={otherUserInfo.id}
      lastMessageDate={formatLastMessageDate(messages)}
      onProfilePress={navigationHandlers.goToOtherUserProfile}
    />
  );

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#8FC31D] border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-white">
        <p className="text-red-500">Failed to load chat room</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <Header
        headerTitle={updatedComponentState.headerTitle}
        onMenuPress={handleMenuPress}
        showMenuButton={menuConfig.shouldShowMenuButton}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <ChatRoomContent
          messages={messages}
          hasMessages={updatedComponentState.hasMessages}
          scrollRef={scrollRef}
          renderHeader={renderHeader}
          onProfilePress={navigationHandlers.goToProfile}
          onScrollToEnd={scrollToEnd}
          tradeEmbedConfig={tradeEmbedConfig}
          onReviewButtonPress={handleReviewButtonPress}
          showReviewButton={roomData?.product?.isCompleted}
        />

        <ChatInput
          onSendMessage={messageHandlers.sendMessage}
          disabled={!updatedComponentState.canSendMessage}
        />
      </div>

      <TradeRequestModal
        isVisible={isTradeRequestModalVisible}
        onClose={() => setIsTradeRequestModalVisible(false)}
        onTradeRequest={handleTradeRequest}
        isLoading={isTradeRequestLoading}
      />

      <ReviewsModal
        isVisible={isReviewModalVisible}
        onClose={() => setIsReviewModalVisible(false)}
        onSubmit={handleReviewSubmit}
        light={reviewLight}
        setLight={setReviewLight}
        contents={reviewContents}
        onContentsChange={setReviewContents}
        onAnimationComplete={() => {
          setReviewLight(60);
          setReviewContents('');
        }}
      />
    </div>
  );
}
