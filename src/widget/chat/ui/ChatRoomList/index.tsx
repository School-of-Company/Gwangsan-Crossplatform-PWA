import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useChatRooms, ChatRoomItem, useChatSocket, chatRoomKeys } from '@/entity/chat';
import type { RoomId } from '@/shared/types/chatType';

export function ChatRoomList() {
  const router = useRouter();
  const { data: chatRooms, isLoading, refetch, isError } = useChatRooms();

  useChatSocket({
    autoConnect: true,
    chatRoomQueryKey: chatRoomKeys.list(),
  });

  const handleChatRoomPress = useCallback(
    (roomId: RoomId) => {
      router.push(`/chatting/${roomId}`);
    },
    [router]
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <p className="text-base text-red-500">채팅방 목록을 불러올 수 없습니다</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#8FC31D] border-t-transparent" />
      </div>
    );
  }

  if (!chatRooms || chatRooms.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <p className="text-base text-gray-500">아직 채팅방 없습니다</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex justify-end px-4 py-2">
        <button onClick={handleRefresh} className="text-sm text-gray-500 active:text-gray-700">
          새로고침
        </button>
      </div>
      {chatRooms.map((room) => (
        <ChatRoomItem key={room.roomId} room={room} onPress={handleChatRoomPress} />
      ))}
    </div>
  );
}
