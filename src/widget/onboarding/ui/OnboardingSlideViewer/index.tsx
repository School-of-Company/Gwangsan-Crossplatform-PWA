'use client';

import { useRef, useState } from 'react';
import onboardingSlide1 from '~/shared/assets/png/startSlide/onboardingSlide1.png';
import onboardingSlide2 from '~/shared/assets/png/startSlide/onboardingSlide2.png';
import onboardingSlide3 from '~/shared/assets/png/startSlide/onboardingSlide3.png';
import { SlideIndicator } from '@/shared/ui';

const images = [onboardingSlide1, onboardingSlide2, onboardingSlide3];

const OnboardingSlideViewer = () => {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleDotPress = (idx: number) => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: scrollWidth * idx,
        behavior: 'smooth',
      });
      setCurrent(idx);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth } = event.currentTarget;
    const newIndex = Math.round(scrollLeft / clientWidth);
    if (newIndex !== current) {
      setCurrent(newIndex);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((img, idx) => (
          <div key={idx} className="flex min-w-full snap-center justify-center">
            <img
              src={typeof img === 'string' ? img : (img as any).src || (img as any).uri || ''}
              alt={`slide-${idx}`}
              className="h-[65vh] w-full object-contain"
            />
          </div>
        ))}
      </div>
      <SlideIndicator total={images.length} current={current} onPress={handleDotPress} />
    </div>
  );
};

export default OnboardingSlideViewer;
