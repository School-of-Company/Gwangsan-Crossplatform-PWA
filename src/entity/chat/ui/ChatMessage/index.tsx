import { memo } from 'react';
import { formatDate } from '@/shared/lib/formatDate';
import type { ChatMessageResponse } from '../../model/chatTypes';

interface ChatMessageProps {
  message: ChatMessageResponse;
}

const ChatMessageComponent = ({ message }: ChatMessageProps) => {
  const isMyMessage = message.isMine;

  const renderContent = () => {
    if (message.messageType === 'IMAGE' && message.images && message.images.length > 0) {
      return (
        <div className={`max-w-[250px] ${isMyMessage ? 'items-end' : 'items-start'} flex flex-col`}>
          {message.images.map((image) => (
            <img
              key={image.imageId}
              src={image.imageUrl}
              alt="chat image"
              className="mb-1 h-48 w-48 rounded-lg object-cover"
            />
          ))}
          {message.content && (
            <span className={`text-sm ${isMyMessage ? 'text-white' : 'text-gray-800'} mt-1`}>
              {message.content}
            </span>
          )}
        </div>
      );
    }

    return (
      <span className={`text-sm ${isMyMessage ? 'text-white' : 'text-gray-800'}`}>
        {message.content}
      </span>
    );
  };

  return (
    <div className={`mb-4 flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
      {!isMyMessage && (
        <span className="mb-1 ml-1 text-xs text-gray-500">{message.senderNickname}</span>
      )}

      <div className="flex max-w-[80%] flex-row items-end">
        {isMyMessage ? (
          <>
            <span className="mb-1 mr-2 text-xs text-gray-400">{formatDate(message.createdAt)}</span>
            <div className="max-w-[250px] rounded-2xl rounded-br-md bg-yellow-400 px-4 py-3">
              {renderContent()}
            </div>
          </>
        ) : (
          <>
            <div className="max-w-[250px] rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3">
              {renderContent()}
            </div>
            <span className="mb-1 ml-2 text-xs text-gray-400">{formatDate(message.createdAt)}</span>
          </>
        )}
      </div>
    </div>
  );
};

export const ChatMessage = memo(ChatMessageComponent);
ChatMessage.displayName = 'ChatMessage';
