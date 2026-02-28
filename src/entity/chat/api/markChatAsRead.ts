import { toast } from 'react-toastify';
import { instance } from '@/shared/lib/axios';
import type { RoomId, MessageId } from '@/shared/types/chatType';
import type { ChatApiError } from '../model/chatTypes';
import { getErrorMessage } from '~/shared/lib/errorHandler';

interface MarkChatAsReadRequest {
  roomId: RoomId;
  lastMessageId: MessageId;
}

export const markChatAsRead = async (roomId: RoomId, lastMessageId: MessageId): Promise<void> => {
  try {
    const requestBody: MarkChatAsReadRequest = {
      roomId,
      lastMessageId,
    };

    await instance.patch('/chat/read', requestBody);
  } catch (e) {
    const error = e as ChatApiError;

    toast.error(error.message || '읽음 처리 실패');

    throw new Error(getErrorMessage(error));
  }
};
