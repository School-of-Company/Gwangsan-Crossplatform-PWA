import { memo } from 'react';
import { formatDate } from '@/shared/lib/formatDate';
import type { ChatRoomListItem } from '../../model/chatTypes';
import type { RoomId } from '@/shared/types/chatType';
import defaultProfile from '@/shared/assets/png/defaultProfile.png';

interface ChatRoomItemProps {
  room: ChatRoomListItem;
  onPress: (roomId: RoomId) => void;
}

const ChatRoomItemComponent = ({ room, onPress }: ChatRoomItemProps) => {
  const handlePress = () => {
    onPress(room.roomId);
  };

  const renderUnreadBadge = () => {
    if (!room.unreadMessageCount || room.unreadMessageCount === 0) return null;
    return (
      <div className="ml-2 min-w-[20px] flex items-center justify-center rounded-full bg-yellow-400 px-1.5 py-0.5">
        <span className="text-xs font-semibold text-white">{room.unreadMessageCount}</span>
      </div>
    );
  };

  const productImage = room.product?.images?.[0]?.imageUrl;

  return (
    <button
      onClick={handlePress}
      className="flex w-full flex-row items-center border-b border-gray-100 px-4 py-3 active:bg-gray-50 text-left">
      <img
        src={productImage || defaultProfile}
        alt="product"
        className="mr-3 h-14 w-14 rounded-lg object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold text-gray-900 truncate">
          {room.product?.title}
        </p>
        <p className="text-sm text-gray-700 truncate">
          {room.member.nickname}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {room.lastMessageType === 'IMAGE' ? '📷 사진을 보냈습니다.' : room.lastMessage}
        </p>
      </div>
      <div className="ml-2 flex flex-col items-end">
        <span className="mb-1 text-xs text-gray-400">{formatDate(room.lastMessageTime)}</span>
        {renderUnreadBadge()}
      </div>
    </button>
  );
};

export const ChatRoomItem = memo(ChatRoomItemComponent);
ChatRoomItem.displayName = 'ChatRoomItem';
