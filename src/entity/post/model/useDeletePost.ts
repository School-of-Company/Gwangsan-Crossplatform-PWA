import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { deletePost } from '../api/deletePost';
import { ProductType } from '~/shared/types/type';
import { ModeType } from '~/shared/types/mode';

interface UseDeletePostParams {
  onSuccess?: () => void;
}

export const useDeletePost = ({ onSuccess }: UseDeletePostParams = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });

      toast.success('게시글이 성공적으로 삭제되었습니다.');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : '게시글 삭제 중 오류가 발생했습니다.');
    },
  });

  const getRedirectPath = useCallback((type: ProductType, mode: ModeType): string => {
    return `/post?type=${type}&mode=${mode}`;
  }, []);

  const handleDeletePost = useCallback(
    (postId: number, type: ProductType, mode: ModeType) => {
      deletePostMutation.mutate(postId, {
        onSuccess: () => {
          const redirectPath = getRedirectPath(type, mode);
          router.replace(redirectPath);
        },
      });
    },
    [deletePostMutation, getRedirectPath, router]
  );

  return {
    deletePost: handleDeletePost,
    isLoading: deletePostMutation.isPending,
    error: deletePostMutation.error,
  };
};
