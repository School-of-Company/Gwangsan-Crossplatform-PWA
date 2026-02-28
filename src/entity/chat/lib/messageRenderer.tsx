import type { ChatMessageResponse } from '../model/chatTypes';
import type { UseImageLoaderReturn } from '../model/useImageLoader';

export interface MessageRenderConfig {
  variant: 'sent' | 'received';
  bgColor: string;
  textColor: string;
  errorIconColor: string;
  errorBgColor: string;
  errorTextColor: string;
  loadingBgColor: string;
}

export const formatMessageTime = (createdAt: string): string => {
  const date = new Date(createdAt);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const renderMessageImages = (
  message: ChatMessageResponse,
  imageLoader: UseImageLoaderReturn,
  config: MessageRenderConfig
) => {
  if (message.messageType !== 'IMAGE' || !message.images || message.images.length === 0) {
    return null;
  }

  return (
    <div className="max-w-[250px] flex flex-col">
      {message.images.map((image) => (
        <div key={image.imageId} className="relative mb-1">
          {imageLoader.hasImageError(image.imageId) ? (
            <div
              className={`h-48 w-48 flex flex-col items-center justify-center rounded-lg ${config.errorBgColor}`}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke={config.errorIconColor} strokeWidth="2" />
                <circle cx="8.5" cy="8.5" r="1.5" fill={config.errorIconColor} />
                <path d="M21 15L16 10L5 21" stroke={config.errorIconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className={`mt-1 text-xs ${config.errorTextColor}`}>이미지 로드 실패</span>
            </div>
          ) : (
            <img
              src={image.imageUrl}
              alt="chat image"
              className="h-48 w-48 rounded-lg object-cover"
              onLoad={() => imageLoader.handleImageLoadEnd(image.imageId)}
              onError={() => imageLoader.handleImageError(image.imageId)}
            />
          )}
          {imageLoader.isImageLoading(image.imageId) && (
            <div
              className={`absolute inset-0 flex items-center justify-center rounded-lg ${config.loadingBgColor} bg-opacity-50`}>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          )}
        </div>
      ))}
      {message.content && (
        <span className={`mt-1 text-sm ${config.textColor}`}>{message.content}</span>
      )}
    </div>
  );
};

export const renderMessageText = (message: ChatMessageResponse, config: MessageRenderConfig) => {
  if (message.messageType !== 'TEXT' || !message.content) {
    return null;
  }

  return <span className={`text-base ${config.textColor}`}>{message.content}</span>;
};

export const renderMessageContent = (
  message: ChatMessageResponse,
  imageLoader: UseImageLoaderReturn,
  config: MessageRenderConfig
) => {
  if (message.messageType === 'IMAGE' && message.images && message.images.length > 0) {
    return renderMessageImages(message, imageLoader, config);
  }

  if (message.messageType === 'TEXT' && message.content) {
    return renderMessageText(message, config);
  }

  return null;
};
