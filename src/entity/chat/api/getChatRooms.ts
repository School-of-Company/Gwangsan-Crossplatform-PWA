import { toast } from 'react-toastify';
import { instance } from '@/shared/lib/axios';
import type { ChatRoomListItem, ChatApiError } from '../model/chatTypes';
import { getErrorMessage } from '~/shared/lib/errorHandler';

export const getChatRooms = async (): Promise<ChatRoomListItem[]> => {
  try {
    const response = await instance.get('/chat/rooms');
    return response.data;
  } catch (e) {
    const error = e as ChatApiError;

    toast.error(error.message || '채팅방 목록 조회 실패');

    throw new Error(getErrorMessage(error));
  }
};
