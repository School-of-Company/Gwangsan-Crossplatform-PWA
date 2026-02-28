import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { createChatRoom } from '../api/createChatRoom';
import { chatRoomKeys } from './useChatRooms';
import type { CreateChatRoomResponse, ChatApiError } from './chatTypes';
import type { ProductId } from '@/shared/types/chatType';

interface UseCreateChatRoomParams {
  onSuccess?: (data: CreateChatRoomResponse) => void;
  onError?: (error: ChatApiError) => void;
}

export const useCreateChatRoom = ({ onSuccess, onError }: UseCreateChatRoomParams = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId: ProductId) => createChatRoom(productId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: chatRoomKeys.list(),
      });

      toast.success('채팅방이 생성되었습니다. 채팅을 시작할 수 있습니다.');

      onSuccess?.(data);
    },
    onError: (error: ChatApiError) => {
      toast.error(error.message || '채팅방 생성 실패');

      onError?.(error);
    },
  });

  const createRoom = useCallback(
    (productId: ProductId) => {
      return mutation.mutate(productId);
    },
    [mutation]
  );

  return {
    ...mutation,
    createRoom,
  };
};
