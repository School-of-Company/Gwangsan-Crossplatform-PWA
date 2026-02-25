import { useRouter } from 'expo-router';
import defaultProfilePng from '~/shared/assets/png/defaultProfile.png';

interface MiniProfileProps {
  nickname: string;
  placeName: string;
  light: number;
  memberId: number;
}

export default function MiniProfile({ nickname, placeName, light, memberId }: MiniProfileProps) {
  const router = useRouter();

  const handleProfilePress = () => {
    router.push(`/profile?id=${memberId}`);
  };

  const profileSrc =
    typeof defaultProfilePng === 'string'
      ? defaultProfilePng
      : (defaultProfilePng as any).src || (defaultProfilePng as any).uri || '';

  return (
    <button
      type="button"
      onClick={handleProfilePress}
      className="flex w-full flex-row items-center justify-between border-b border-b-gray-100 px-6 py-3 text-left">
      <div className="flex flex-row gap-3">
        <img
          src={profileSrc}
          alt="프로필"
          className="h-[50px] w-[50px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-[5px]">
          <span className="text-body3">{nickname}</span>
          <span>{placeName}</span>
        </div>
      </div>
      <span className="text-body1">{light + '단계'}</span>
    </button>
  );
}
