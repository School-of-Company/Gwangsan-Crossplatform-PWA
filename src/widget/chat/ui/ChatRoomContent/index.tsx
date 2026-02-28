import React from 'react';
import { MyMessage, OtherMessage } from '~/widget/chat';
import { TradeEmbed } from '~/entity/chat';
import type { ChatMessageResponse, TradeProduct } from '~/entity/chat';

interface ChatRoomContentProps {
  readonly messages: readonly ChatMessageResponse[];
  readonly hasMessages: boolean;
  readonly scrollRef: React.RefObject<HTMLDivElement | null>;
  readonly renderHeader: () => React.JSX.Element;
  readonly onProfilePress: (userId: number) => void;
  readonly onScrollToEnd: () => void;
  readonly tradeEmbedConfig?: {
    readonly shouldShow: boolean;
    readonly product?: TradeProduct | null;
    readonly onTradeAccept?: () => Promise<void>;
    readonly onReservation?: () => void;
    readonly onCancelReservation?: () => void;
    readonly showButtons: boolean;
    readonly isLoading: boolean;
    readonly requestorNickname: string;
  };
  readonly onReviewButtonPress?: () => void;
  readonly showReviewButton?: boolean;
}

export const ChatRoomContent: React.FC<ChatRoomContentProps> = ({
  messages,
  hasMessages,
  scrollRef,
  renderHeader,
  onProfilePress,
  onScrollToEnd: _onScrollToEnd,
  tradeEmbedConfig,
  onReviewButtonPress,
  showReviewButton,
}) => {
  const getCombinedData = () => {
    const combinedData: { type: 'message' | 'trade'; data: any; timestamp: string }[] = [];

    messages.forEach((message) => {
      combinedData.push({
        type: 'message',
        data: message,
        timestamp: message.createdAt,
      });
    });

    if (tradeEmbedConfig?.shouldShow && tradeEmbedConfig.product?.createdAt) {
      combinedData.push({
        type: 'trade',
        data: tradeEmbedConfig,
        timestamp: tradeEmbedConfig.product.createdAt,
      });
    }

    return combinedData.sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  };

  const renderItem = (item: { type: 'message' | 'trade'; data: any }, index: number) => {
    if (item.type === 'message') {
      const message = item.data as ChatMessageResponse;
      if (message.isMine) {
        return <MyMessage key={message.messageId} message={message} />;
      } else {
        return <OtherMessage key={message.messageId} message={message} onProfilePress={onProfilePress} />;
      }
    } else if (item.type === 'trade') {
      const config = item.data;
      return (
        <TradeEmbed
          key={`trade-${index}`}
          product={config.product}
          onTradeAccept={config.onTradeAccept}
          onReservation={config.onReservation}
          onCancelReservation={config.onCancelReservation}
          showButtons={config.showButtons}
          isLoading={config.isLoading}
          requestorNickname={config.requestorNickname}
          alignment={config.showButtons ? 'left' : 'right'}
          onReviewButtonPress={onReviewButtonPress}
          showReviewButton={showReviewButton}
        />
      );
    }
    return null;
  };

  const combinedData = getCombinedData();

  if (hasMessages || (tradeEmbedConfig?.shouldShow && tradeEmbedConfig.product)) {
    return (
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 pb-2">
        {renderHeader()}
        {combinedData.map((item, index) => renderItem(item, index))}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="mt-4 text-center text-gray-500">
        아직 대화가 없습니다.{'\n'}첫 메시지를 보내보세요!
      </p>
    </div>
  );
};
