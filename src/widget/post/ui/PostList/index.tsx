import Post from '~/shared/ui/Post';
import { ProductType } from '~/shared/types/type';
import { ModeType } from '~/shared/types/mode';
import { useCallback, useState } from 'react';
import { useGetPosts } from '~/shared/model/useGetPosts';
import { returnValue } from '~/view/post/model/handleCategory';
import { Category } from '~/view/post/model/category';

export default function PostList({ category, type }: { category: Category; type: ProductType }) {
  const [refreshing, setRefreshing] = useState(false);
  const currentMode = category ? returnValue(category) : undefined;

  const { data = [], refetch } = useGetPosts(
    currentMode as ModeType | undefined,
    type as ProductType | undefined
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return (
    <div className="w-full">
      {refreshing && (
        <div className="flex justify-center py-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#8FC31D] border-t-transparent" />
        </div>
      )}
      {data.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <span className="text-gray-400">게시글이 없습니다.</span>
        </div>
      ) : (
        data.map((item) => <Post key={item.id} {...item} />)
      )}
    </div>
  );
}
