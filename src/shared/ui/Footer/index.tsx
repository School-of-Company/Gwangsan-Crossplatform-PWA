import { usePathname, useRouter } from 'expo-router';
import HomeIcon from '~/shared/assets/svg/HomeIcon';
import ChatIcon from '~/shared/assets/svg/ChatIcon';
import NoticeIcon from '~/shared/assets/svg/NoticeIcon';
import ProfileIcon from '~/shared/assets/svg/ProfileIcon';
import PlusCircleIcon from '~/shared/assets/svg/PlusCircleIcon';

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const getIconColor = (path: string) => (pathname === path ? '#8FC31D' : '#8F9094');
  const getTextColor = (path: string) => (pathname === path ? 'text-[#8FC31D]' : 'text-gray-500');

  return (
    <nav className="pb-safe-area-inset-bottom fixed bottom-0 z-50 flex w-full flex-row justify-between border-t border-gray-200 bg-white px-6 py-3">
      <button className="flex flex-col items-center gap-1" onClick={() => router.push('/main')}>
        <HomeIcon color={getIconColor('/main')} />
        <span className={`text-xs ${getTextColor('/main')}`}>홈</span>
      </button>

      <button className="flex flex-col items-center gap-1" onClick={() => router.push('/chatting')}>
        <ChatIcon color={getIconColor('/chatting')} />
        <span className={`text-xs ${getTextColor('/chatting')}`}>채팅</span>
      </button>

      <button className="flex items-center" onClick={() => router.push('/write')}>
        <PlusCircleIcon />
      </button>

      <button className="flex flex-col items-center gap-1" onClick={() => router.push('/notice')}>
        <NoticeIcon color={getIconColor('/notice')} />
        <span className={`text-xs ${getTextColor('/notice')}`}>공지</span>
      </button>

      <button className="flex flex-col items-center gap-1" onClick={() => router.push('/profile')}>
        <ProfileIcon color={getIconColor('/profile')} />
        <span className={`text-xs ${getTextColor('/profile')}`}>프로필</span>
      </button>
    </nav>
  );
}
