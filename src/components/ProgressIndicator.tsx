import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProgressIndicator = () => {
  const progressRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    const dot = dotRef.current;
    if (!progress || !dot) return;

    // Create scroll progress animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progressValue = self.progress;
        gsap.to(progress, {
          scaleY: progressValue,
          duration: 0.1,
          ease: 'none',
        });
        gsap.to(dot, {
          y: progressValue * 100 + '%',
          duration: 0.1,
          ease: 'none',
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2">
      {/* Progress line background */}
      <div className="relative w-0.5 h-24 bg-white/10 rounded-full overflow-hidden">
        {/* Progress line fill */}
        <div
          ref={progressRef}
          className="absolute top-0 left-0 w-full bg-[#4A6FFF] rounded-full origin-top"
          style={{ height: '100%', transform: 'scaleY(0)' }}
        />
      </div>
      
      {/* Active dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#4A6FFF] rounded-full shadow-[0_0_10px_rgba(74,111,255,0.6)]"
        style={{ transform: 'translateX(-50%) translateY(0%)' }}
      />
    </div>
  );
};

export default ProgressIndicator;
