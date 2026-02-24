import { useEffect, useState } from 'react';

interface BottomSheetModalWrapperProps {
  isVisible: boolean;
  onClose: () => void;
  onAnimationComplete?: () => void;
  title: string;
  children: React.ReactNode;
  height?: number;
  hasHeader?: boolean;
}

export function BottomSheetModalWrapper({
  isVisible,
  onClose,
  onAnimationComplete,
  title,
  children,
  height,
  hasHeader = true,
}: BottomSheetModalWrapperProps) {
  const [show, setShow] = useState(isVisible);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setAnimating(false);
    } else if (show) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setShow(false);
        setAnimating(false);
        onAnimationComplete?.();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isVisible, show, onAnimationComplete]);

  if (!show) return null;

  const modalStyle = height ? { height } : { height: '66vh' };

  return (
    <div
      className={`fixed inset-0 z-[1000] flex flex-col justify-end transition-opacity duration-150 ${
        isVisible && !animating ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}>
      <div
        className={`rounded-t-2xl bg-white transition-transform duration-250 ease-out ${
          isVisible && !animating ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex h-full flex-col p-4">
          {hasHeader && (
            <div className="relative mb-4 flex flex-row items-center justify-center py-6">
              <span className="text-body1 text-black">{title}</span>
              <button onClick={onClose} className="absolute right-0 p-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
