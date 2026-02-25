import React, { useRef, useEffect, useState } from 'react';

import image1 from '@/shared/assets/png/mainSlides/slide1.png';
import image2 from '@/shared/assets/png/mainSlides/slide2.png';
import image3 from '@/shared/assets/png/mainSlides/slide3.png';
import image4 from '@/shared/assets/png/mainSlides/slide4.png';
import image5 from '@/shared/assets/png/mainSlides/slide5.png';
import image6 from '@/shared/assets/png/mainSlides/slide6.png';

const images = [image1, image2, image3, image4, image5, image6];

const MainSlideViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.offsetWidth * currentIndex,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 border-b border-gray-400 py-6">
      <div
        ref={containerRef}
        className="scrollbar-hide flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth">
        {images.map((img, idx) => (
          <div key={idx} className="w-full flex-shrink-0 snap-center">
            <img
              src={typeof img === 'string' ? img : (img as any).src || (img as any).uri || ''}
              alt={`슬라이드 ${idx + 1}`}
              className="h-[210px] w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSlideViewer;
