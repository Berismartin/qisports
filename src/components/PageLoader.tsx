import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (isLoading) {
      gsap.killTweensOf([loaderRef.current, logoRef.current, textRef.current]);
      gsap.to(loaderRef.current, { 
        autoAlpha: 1, 
        duration: 0.4, 
        ease: 'power2.inOut' 
      });
      gsap.fromTo(logoRef.current, 
        { scale: 0.8, autoAlpha: 0 }, 
        { scale: 1, autoAlpha: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)', delay: 0.2 }
      );
      gsap.fromTo(textRef.current, 
        { y: 20, autoAlpha: 0 }, 
        { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out', delay: 0.4 }
      );
    } else {
      gsap.killTweensOf([loaderRef.current, logoRef.current, textRef.current]);
      gsap.to(logoRef.current, { 
        scale: 0.8, 
        autoAlpha: 0, 
        duration: 0.4, 
        ease: 'power2.in', 
        delay: 0
      });
      gsap.to(textRef.current, { 
        y: -20, 
        autoAlpha: 0, 
        duration: 0.4, 
        ease: 'power2.in',
        delay: 0.1
      });
      gsap.to(loaderRef.current, { 
        autoAlpha: 0, 
        duration: 0.5,
        ease: 'power2.inOut',
        delay: 0.2 
      });
    }
  }, [isLoading]);

  return (
    <div
      ref={loaderRef}
      className="fixed top-0 left-0 w-full h-full bg-[#1E1E1E] flex flex-col items-center justify-center z-[100]"
      style={{ visibility: 'hidden', opacity: 0 }} // Initial GSAP state
    >
      <img 
        ref={logoRef}
        src="/images/Qi logo Grn.png" 
        alt="QI Sports Logo" 
        className="h-20 mb-6"
      />
      <p ref={textRef} className="text-[#A7C840] text-xl font-semibold tracking-wider">
        Loading...
      </p>
    </div>
  );
};

export default PageLoader; 