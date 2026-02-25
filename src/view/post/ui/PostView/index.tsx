import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Header } from '~/shared/ui';
import { handleCategory } from '../../model/handleCategory';
import { Category } from '../../model/category';
import { ModeType } from '~/shared/types/mode';
import { ProductType } from '~/shared/types/type';
import PostList from '~/widget/post/ui/PostList';

export default function PostView() {
  const { type, mode } = useLocalSearchParams<{ type: ProductType; mode?: ModeType }>();

  const getInitialCategory = (): Category => {
    if (mode) {
      if (type === 'OBJECT') {
        return mode === 'GIVER' ? '팔아요' : '필요해요';
      } else {
        return mode === 'GIVER' ? '할 수 있어요' : '해주세요';
      }
    }
    return type === 'OBJECT' ? '팔아요' : '할 수 있어요';
  };

  const [category, setCategory] = useState<Category>(getInitialCategory());

  const categories = handleCategory(type as ProductType) ?? [];
  const selectedIndex = categories.indexOf(category);
  const segments = Math.max(categories.length, 1);
  const segmentPercent = 100 / segments;

  return (
    <div className="flex flex-1 flex-col bg-white">
      <Header headerTitle={type === 'SERVICE' ? '서비스' : '물건'} />
      <div className="relative mx-6 mb-6 mt-5 flex h-[45px] flex-row items-center rounded-[30px] bg-sub2-300 px-2">
        <div
          className="absolute top-[8px] h-8 rounded-[32px] bg-white transition-all duration-300 ease-out"
          style={{
            width: `calc(${segmentPercent}% - 8px)`,
            left: `calc(${selectedIndex * segmentPercent}% + 4px)`,
          }}
        />

        {categories.map((v, index) => (
          <button
            key={v}
            type="button"
            onClick={() => setCategory(v as Category)}
            className="absolute z-10 flex h-8 items-center justify-center rounded-[32px]"
            style={{
              left: `${index * segmentPercent + 1}%`,
              width: `${segmentPercent - 2}%`,
            }}>
            <span className="text-center font-medium">{v}</span>
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto">
        <PostList type={type} category={category} />
      </div>
    </div>
  );
}
