import React from 'react';

interface ChatRoomHeaderProps {
  readonly otherUserNickname: string;
  readonly otherUserId?: number;
  readonly lastMessageDate: string;
  readonly onProfilePress: () => void;
}

export const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({
  otherUserNickname,
  otherUserId,
  lastMessageDate,
  onProfilePress,
}) => {
  return (
    <div className="bg-white">
      <div className="flex flex-col items-center py-8">
        <div className="flex flex-row items-center justify-center">
          <button onClick={onProfilePress} disabled={!otherUserId}>
            <span className="mb-2 block text-xl font-bold text-gray-900">{otherUserNickname}</span>
          </button>
        </div>
        <span className="text-sm text-gray-500">{lastMessageDate}</span>
      </div>
    </div>
  );
};
