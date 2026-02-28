import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { findChatRoom } from '../api/findChatRoom';
import { chatRoomKeys } from './useChatRooms';
import type { FindChatRoomResponse, ChatApiError } from './chatTypes';
import type { ProductId } from '@/shared/types/chatType';

interface UseFindChatRoomParams {
  onSuccess?: (data: FindChatRoomResponse) => void;
  onError?: (error: ChatApiError) => void;
}

export const useFindChatRoom = ({ onSuccess, onError }: UseFindChatRoomParams = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId: ProductId) => findChatRoom(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: chatRoomKeys.list(),
      });

      onSuccess?.(data);
    },
    onError: (error: ChatApiError) => {
      if (error.status === 404) {
        toast.info('채팅방 없음');
      } else {
        toast.error(error.message);
      }

      onError?.(error);
    },
  });

  const findRoom = useCallback(
    (productId: ProductId) => {
      return mutation.mutate(productId);
    },
    [mutation]
  );

  return {
    ...mutation,
    findRoom,
  };
};
