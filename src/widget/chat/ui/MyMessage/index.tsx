import { memo, type FC } from 'react';
import {
  useImageLoader,
  formatMessageTime,
  renderMessageContent,
  type MessageRenderConfig,
  type ChatMessageResponse,
} from '@/entity/chat';

interface MyMessageProps {
  message: ChatMessageResponse;
}

const MyMessageComponent: FC<MyMessageProps> = ({ message }) => {
  const imageLoader = useImageLoader();

  const messageConfig: MessageRenderConfig = {
    variant: 'sent',
    bgColor: 'bg-orange-400',
    textColor: 'text-white',
    errorIconColor: '#FB923C',
    errorBgColor: 'bg-orange-100',
    errorTextColor: 'text-orange-600',
    loadingBgColor: 'bg-orange-400',
  };

  const content = renderMessageContent(message, imageLoader, messageConfig);

  if (!content) return null;

  return (
    <div className="mb-4 flex flex-col items-end">
      <div className="flex flex-row items-end">
        <span className="mr-2 text-xs text-gray-500">{formatMessageTime(message.createdAt)}</span>
        <div className="max-w-[280px] rounded-xl bg-orange-400 px-4 py-3">{content}</div>
      </div>
    </div>
  );
};

export const MyMessage = memo(MyMessageComponent);
