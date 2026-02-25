import { router } from 'expo-router';

interface Props {
  onBack?: () => void;
  headerTitle: string;
  onTitlePress?: () => void;
  onMenuPress?: () => void;
  showMenuButton?: boolean;
}

export function Header({
  onBack,
  headerTitle,
  onTitlePress,
  onMenuPress,
  showMenuButton = false,
}: Props) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex flex-row items-center justify-between px-3 py-6">
      <button onClick={handleBack} className="flex w-10 items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 6L9.70711 11.2929C9.31658 11.6834 9.31658 12.3166 9.70711 12.7071L15 18"
            stroke="#8F9094"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="relative flex flex-1 flex-row items-center justify-center">
        {onTitlePress ? (
          <button onClick={onTitlePress} className="flex-1">
            <span className="block text-center text-body1 text-black">{headerTitle}</span>
          </button>
        ) : (
          <span className="block flex-1 text-center text-body1 text-black">{headerTitle}</span>
        )}
        {showMenuButton && (
          <button onClick={onMenuPress} className="absolute right-0 p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="1.5" fill="#000" />
              <circle cx="12" cy="12" r="1.5" fill="#000" />
              <circle cx="12" cy="19" r="1.5" fill="#000" />
            </svg>
          </button>
        )}
      </div>
      {!showMenuButton && <div className="size-6" />}
    </div>
  );
}
