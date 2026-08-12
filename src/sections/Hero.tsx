import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, FileText } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const subheadingWrapperRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Fluid background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle system for fluid effect
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    // Optimize performance: reduce count on mobile
    const isMobile = window.innerWidth < 1024;
    const particleCount = isMobile ? 25 : 45;
    const colors = ['#4A6FFF', '#5a7fff', '#3a5fef', '#6B8FFF'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 150 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // intersection observer to pause animation when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(canvas);

    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Mouse influence
        if (!isMobile) {
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 300) {
            const force = (300 - dist) / 300;
            particle.vx += (dx / dist) * force * 0.02;
            particle.vy += (dy / dist) * force * 0.02;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Boundary check
        if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius;
        if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius;
        if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius;
        if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius;

        // Draw gradient
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius
        );
        gradient.addColorStop(0, particle.color + '20');
        gradient.addColorStop(0.5, particle.color + '10');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Connect nearby particles
      const connectionDist = isMobile ? 120 : 200;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(74, 111, 255, ${0.1 * (1 - dist / connectionDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const subheadingWrapper = subheadingWrapperRef.current;
    const cta = ctaRef.current;
    if (!section || !heading || !subheading || !subheadingWrapper || !cta) return;

    const ctx = gsap.context(() => {
      // Initial reveal animation
      const tl = gsap.timeline({ delay: 0.3 });

      // Split heading into characters
      const chars = heading.querySelectorAll('.char');
      tl.fromTo(chars,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.03,
          duration: 1,
          ease: 'expo.out',
        }
      );

      tl.fromTo(subheading,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      tl.fromTo(cta.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      );

      // Scroll-triggered exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
        },
      });

      scrollTl.to(heading, {
        scale: 1.5,
        opacity: 0,
        filter: 'blur(20px)',
        ease: 'none',
      });

      scrollTl.to(subheadingWrapper, {
        y: -50,
        opacity: 0,
        ease: 'none',
      }, '<');

      scrollTl.to(cta, {
        y: -30,
        opacity: 0,
        ease: 'none',
      }, '<');
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToWorks = () => {
    const worksSection = document.querySelector('#works');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fluid Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          style={{ perspective: '1000px' }}
        >
          <span className="block overflow-hidden">
            {'Shivarama'.split('').map((char, i) => (
              <span key={`first-${i}`} className="char inline-block">
                {char}
              </span>
            ))}
            <span className="char inline-block text-[#4A6FFF]">.</span>
            {'R'.split('').map((char, i) => (
              <span key={`last-${i}`} className="char inline-block">
                {char}
              </span>
            ))}
          </span>
          {/* <span className="block overflow-hidden">
            {'Developer'.split('').map((char, i) => (
              <span key={i} className="char inline-block text-gradient">
                {char}
              </span>
            ))}
          </span> */}
        </h1>

        <div ref={subheadingWrapperRef}>
          <p
            ref={subheadingRef}
            className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-10"
          >
            Passionate Full Stack Developer crafting production-ready,
            scalable web applications at the intersection of frontend
            elegance & backend performance.
          </p>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToWorks}
            className="group px-8 py-4 bg-[#4A6FFF] text-white font-medium rounded-full hover:bg-[#5a7fff] transition-all duration-300 flex items-center gap-2"
            data-magnetic
          >
            View Selected Works
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>

          <a
            href="/shivaram_cv_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            data-magnetic
          >
            View Resume
            <FileText className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
