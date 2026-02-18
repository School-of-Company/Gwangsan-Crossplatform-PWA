import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import logo from '~/shared/assets/png/logo.png';

export default function Header() {
  const r = useRouter();

  const handlePressNotification = useCallback(() => {
    r.push('/notification');
  }, [r]);

  return (
    <header className="sticky top-0 z-50 flex flex-row items-center justify-between border-b border-gray-100 bg-white/80 px-6 py-4 backdrop-blur-md">
      <img
        src={typeof logo === 'string' ? logo : (logo as any).src || (logo as any).uri || ''}
        alt="로고"
        className="h-[19px] w-[101px] object-contain"
      />

      <button
        onClick={handlePressNotification}
        className="rounded-full p-1 transition-colors hover:bg-gray-100 active:bg-gray-200"
        aria-label="알림 확인">
        <Ionicons name="notifications-outline" size={24} color="#000" />
      </button>
    </header>
  );
}
