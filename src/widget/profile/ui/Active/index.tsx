import { useRouter } from 'expo-router';

interface ActiveProps {
  isMe: boolean;
  id: string;
  name?: string;
}
export default function Active({ isMe, id, name }: ActiveProps) {
  const router = useRouter();
  return (
    <div className="mt-3 bg-white px-6 pb-14 pt-8">
      <h3 className="text-titleSmall">리뷰</h3>
      <div className="mt-6 flex flex-row items-center justify-center gap-3">
        <button
          className={`flex items-center justify-center rounded-md border border-main-500 px-6 py-3 ${isMe ? 'w-1/2' : 'w-full'}`}
          onClick={() => router.push(`/reviews/${id}?active=receive`)}>
          <span className="text-main-500">{isMe ? '내가 받은 후기' : name + '님이 받은 후기'}</span>
        </button>
        {isMe && (
          <button
            className="flex w-1/2 items-center justify-center rounded-md border border-main-500 px-6 py-3"
            onClick={() => router.push('/reviews?active=toss')}>
            <span className="text-main-500">내가 작성한 후기</span>
          </button>
        )}
      </div>
    </div>
  );
}
