import { memo, type FC } from 'react';
import {
  useImageLoader,
  formatMessageTime,
  renderMessageContent,
  type MessageRenderConfig,
  type ChatMessageResponse,
} from '@/entity/chat';

interface OtherMessageProps {
  message: ChatMessageResponse;
  onProfilePress?: (userId: number) => void;
}

const OtherMessageComponent: FC<OtherMessageProps> = ({ message, onProfilePress }) => {
  const imageLoader = useImageLoader();

  const messageConfig: MessageRenderConfig = {
    variant: 'received',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-900',
    errorIconColor: '#9CA3AF',
    errorBgColor: 'bg-gray-100',
    errorTextColor: 'text-gray-600',
    loadingBgColor: 'bg-gray-500',
  };

  const content = renderMessageContent(message, imageLoader, messageConfig);

  if (!content) return null;

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress(message.senderId);
    }
  };

  return (
    <div className="mb-4 flex flex-col items-start">
      <div className="flex flex-row items-start">
        <button
          className="mr-2 h-8 w-8 flex items-center justify-center rounded-full bg-gray-300"
          onClick={handleProfilePress}
          disabled={!onProfilePress}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="8" r="4" stroke="#9CA3AF" strokeWidth="2" />
          </svg>
        </button>
        <div className="flex-1">
          <button onClick={handleProfilePress} disabled={!onProfilePress} className="text-left">
            <span className="mb-1 block text-xs text-gray-600">{message.senderNickname}</span>
          </button>
          <div className="flex flex-row items-end">
            <div className="max-w-[280px] rounded-xl bg-gray-100 px-4 py-3">{content}</div>
            <span className="ml-2 text-xs text-gray-500">
              {formatMessageTime(message.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OtherMessage = memo(OtherMessageComponent);
