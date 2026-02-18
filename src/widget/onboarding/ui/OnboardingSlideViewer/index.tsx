import { useRef, useState } from 'react';
import onboardingSlide1 from '~/shared/assets/png/startSlide/onboardingSlide1.png';
import onboardingSlide2 from '~/shared/assets/png/startSlide/onboardingSlide2.png';
import onboardingSlide3 from '~/shared/assets/png/startSlide/onboardingSlide3.png';
import { SlideIndicator } from '@/shared/ui';

const images = [onboardingSlide1, onboardingSlide2, onboardingSlide3];

const OnboardingSlideViewer = () => {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth === 0) return;
    const newIndex = Math.round(scrollLeft / clientWidth);
    if (newIndex !== current) {
      setCurrent(newIndex);
    }
  };

  const handleDotPress = (idx: number) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({
      left: clientWidth * idx,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center gap-3">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex h-full w-full snap-x snap-mandatory overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {images.map((img: any, idx) => (
          <div
            key={idx}
            className="flex h-full w-full flex-shrink-0 snap-center items-center justify-center overflow-hidden">
            <img
              src={img.uri || img.src || img}
              alt={`slide-${idx}`}
              className="h-[65dvh] w-full object-contain"
            />
          </div>
        ))}
      </div>
      <div className="pb-4">
        <SlideIndicator total={images.length} current={current} onPress={handleDotPress} />
      </div>
    </div>
  );
};

export default OnboardingSlideViewer;
