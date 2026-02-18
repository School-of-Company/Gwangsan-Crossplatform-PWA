import { router } from 'expo-router';
import BagIcon from '~/shared/assets/svg/BagIcon';
import HeadsetIcon from '~/shared/assets/svg/HeadsetIcon';

const handlePress = (where: string) => {
  router.push('/post?type=' + where);
};

interface InformProps {
  dong: string;
  place: string;
  head: string;
}

export default function Inform({ dong, place, head }: InformProps) {
  return (
    <div className="flex flex-col gap-2 bg-white p-7">
      <h2 className="text-titleSmall">{head}</h2>
      <p className="text-body2">{dong + ' ' + place}</p>
      <div className="flex w-full flex-row items-center justify-around pb-10">
        <button
          onClick={() => handlePress('OBJECT')}
          className="flex h-[160px] w-[40%] flex-col items-center justify-between rounded-[12px] bg-white p-6 shadow-[1px_1px_20px_rgba(0,0,0,0.15)] transition-transform active:scale-95">
          <BagIcon />
          <span className="font-cafe24 text-3xl">물건</span>
        </button>
        <button
          onClick={() => handlePress('SERVICE')}
          className="flex h-[160px] w-[40%] flex-col items-center justify-between rounded-[12px] bg-white p-6 shadow-[1px_1px_20px_rgba(0,0,0,0.15)] transition-transform active:scale-95">
          <HeadsetIcon />
          <span className="font-cafe24 text-3xl">서비스</span>
        </button>
      </div>
    </div>
  );
}
