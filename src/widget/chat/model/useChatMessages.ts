import { useCallback, useRef } from 'react';
import { useChatMessages as useChatMessagesEntity } from '~/entity/chat';
import { useChatSocket } from '~/entity/chat/model/useChatSocket';
import { extractOtherUserInfo, ensureMessagesArray } from '~/shared/lib/userUtils';
import type { RoomId } from '~/shared/types/chatType';
import type { ChatMessageResponse } from '~/entity/chat';

interface UseChatMessagesParams {
  readonly roomId: RoomId;
}

interface UseChatMessagesReturn {
  readonly scrollRef: React.RefObject<HTMLDivElement | null>;
  readonly messages: ChatMessageResponse[];
  readonly otherUserInfo: { nickname: string; id?: number };
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly connectionState: string;
  readonly messageHandlers: {
    readonly sendMessage: (content: string | null, imageIds: number[]) => void;
  };
  readonly scrollToEnd: (animated?: boolean) => void;
  readonly markRoomAsRead: (roomId: RoomId) => Promise<void>;
}

export const useChatMessages = ({ roomId }: UseChatMessagesParams): UseChatMessagesReturn => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { data: messages, isLoading, isError } = useChatMessagesEntity(roomId);
  const { sendMessage, markRoomAsRead, connectionState } = useChatSocket({
    currentRoomId: roomId,
    chatRoomQueryKey: ['chatRooms', 'list'],
    chatMessageQueryKey: ['chatMessages', roomId],
  });

  const safeMessages = ensureMessagesArray(messages);
  const otherUserInfo = extractOtherUserInfo(safeMessages);

  const scrollToEnd = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const messageHandlers = {
    sendMessage: useCallback(
      (content: string | null, imageIds: number[]) => {
        if (connectionState !== 'connected') return;

        if (imageIds.length > 0) {
          sendMessage(roomId, ' ', 'IMAGE', imageIds);
        } else if (content) {
          sendMessage(roomId, content, 'TEXT', []);
        }
      },
      [roomId, sendMessage, connectionState]
    ),
  };

  return {
    scrollRef,
    messages: safeMessages,
    otherUserInfo,
    isLoading,
    isError,
    connectionState,
    messageHandlers,
    scrollToEnd,
    markRoomAsRead,
  };
};
