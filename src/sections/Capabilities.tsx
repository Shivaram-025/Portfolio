import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: 'JavaScript', level: 90, category: 'Languages' },
  { name: 'Java', level: 80, category: 'Languages' },
  { name: 'Python', level: 75, category: 'Languages' },
  { name: 'C++', level: 80, category: 'Languages' },
  { name: 'C', level: 75, category: 'Languages' },
  { name: 'C# (Basics)', level: 65, category: 'Languages' },
  { name: 'React.js', level: 90, category: 'Frameworks' },
  { name: 'Next.js', level: 85, category: 'Frameworks' },
  { name: 'Node.js', level: 85, category: 'Frameworks' },
  { name: 'Express.js', level: 80, category: 'Frameworks' },
  { name: 'TailwindCSS', level: 90, category: 'Frameworks' },
  { name: '.NET (Basics)', level: 65, category: 'Frameworks' },
  { name: 'MySQL', level: 80, category: 'Databases' },
  { name: 'MongoDB', level: 85, category: 'Databases' },
  { name: 'PostgreSQL (NeonDB)', level: 75, category: 'Databases' },
  { name: 'Git', level: 85, category: 'Tools' },
  { name: 'GitHub', level: 90, category: 'Tools' },
];

const Capabilities = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueesRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const row1Skills = skills.filter((_, i) => i % 3 === 0);
  const row2Skills = skills.filter((_, i) => i % 3 === 1);
  const row3Skills = skills.filter((_, i) => i % 3 === 2);

  const duplicatedRow1 = [...row1Skills, ...row1Skills, ...row1Skills, ...row1Skills];
  const duplicatedRow2 = [...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills];
  const duplicatedRow3 = [...row3Skills, ...row3Skills, ...row3Skills, ...row3Skills];

  // Particle sphere animation
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

    // Create particles in a sphere formation
    const particleCount = 150;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      originalX: number;
      originalY: number;
      originalZ: number;
    }> = [];

    const radius = Math.min(canvas.width, canvas.height) * 0.25;
    const centerX = canvas.width * 0.25;
    const centerY = canvas.height * 0.5;

    // Fibonacci sphere distribution
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      particles.push({
        x: centerX + x * radius,
        y: centerY + y * radius,
        z: z * radius,
        originalX: centerX + x * radius,
        originalY: centerY + y * radius,
        originalZ: z * radius,
      });
    }

    let rotation = 0;
    let isVisible = false;

    // Intersection Observer for visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rotation += 0.003;

      // Sort particles by z for proper depth
      const sortedParticles = [...particles].sort((a, b) => {
        const az = a.originalZ * Math.cos(rotation) - a.originalX * Math.sin(rotation);
        const bz = b.originalZ * Math.cos(rotation) - b.originalX * Math.sin(rotation);
        return bz - az;
      });

      sortedParticles.forEach((particle) => {
        // Rotate around Y axis
        const rotatedX =
          particle.originalX * Math.cos(rotation) +
          particle.originalZ * Math.sin(rotation);
        const rotatedZ =
          particle.originalZ * Math.cos(rotation) -
          particle.originalX * Math.sin(rotation);

        // Perspective projection
        const perspective = 800;
        const scale = perspective / (perspective + rotatedZ);
        const screenX = rotatedX;
        const screenY = particle.originalY;

        // Draw particle
        const size = 2 * scale;
        const alpha = 0.3 + 0.7 * ((scale - 0.5) / 0.5);

        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(0.5, size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 111, 255, ${alpha})`;
        ctx.fill();

        // Draw connections
        sortedParticles.forEach((other) => {
          const otherRotatedX =
            other.originalX * Math.cos(rotation) +
            other.originalZ * Math.sin(rotation);
          const otherScreenX = otherRotatedX;
          const otherScreenY = other.originalY;

          const dx = screenX - otherScreenX;
          const dy = screenY - otherScreenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80 * scale) {
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(otherScreenX, otherScreenY);
            ctx.strokeStyle = `rgba(74, 111, 255, ${0.1 * alpha * (1 - dist / (80 * scale))})`;
            ctx.lineWidth = 0.5 * scale;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
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
    const marqueesContainer = marqueesRef.current;
    if (!section || !heading || !marqueesContainer) return;

    const ctx = gsap.context(() => {
      // Background transition to dark
      gsap.to(section, {
        backgroundColor: '#050505',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      // Heading animation
      gsap.from(heading.children, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Marquee rows entrance
      gsap.from('.marquee-row', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: marqueesContainer,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Continuous Marquee Animations
      const m1 = section.querySelector('.marquee-content-1');
      const m2 = section.querySelector('.marquee-content-2');
      const m3 = section.querySelector('.marquee-content-3');

      if (m1) {
        const w1 = m1.scrollWidth / 2;
        gsap.to(m1, {
          x: -w1,
          duration: 35,
          ease: 'none',
          repeat: -1,
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const v = Math.abs(self.getVelocity()) / 1000;
            const speed = Math.min(3, 1 + v * 0.5);
            gsap.to(m1, {
              timeScale: speed,
              duration: 0.3,
            });
          },
        });
      }

      if (m2) {
        const w2 = m2.scrollWidth / 2;
        gsap.fromTo(m2, {
          x: -w2,
        }, {
          x: 0,
          duration: 35,
          ease: 'none',
          repeat: -1,
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const v = Math.abs(self.getVelocity()) / 1000;
            const speed = Math.min(3, 1 + v * 0.5);
            gsap.to(m2, {
              timeScale: speed,
              duration: 0.3,
            });
          },
        });
      }

      if (m3) {
        const w3 = m3.scrollWidth / 2;
        gsap.to(m3, {
          x: -w3,
          duration: 35,
          ease: 'none',
          repeat: -1,
        });

        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const v = Math.abs(self.getVelocity()) / 1000;
            const speed = Math.min(3, 1 + v * 0.5);
            gsap.to(m3, {
              timeScale: speed,
              duration: 0.3,
            });
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative w-full py-24 lg:py-32 min-h-screen overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: '#F5F5F7' }}
    >
      {/* Particle Sphere Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">
        {/* Header */}
        <div ref={headingRef}>
          <span className="inline-block text-sm font-medium text-[#4A6FFF] uppercase tracking-wider mb-4">
            Expertise
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            The Toolkit
          </h2>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
            A curated collection of technologies and tools I use to bring ideas
            to life. Always learning, always evolving.
          </p>
        </div>
      </div>

      {/* Marquees */}
      <div ref={marqueesRef} className="relative z-10 w-full overflow-hidden">
        {/* Row 1 */}
        <div className="marquee-row relative w-full mb-4 md:mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <div className="marquee-content-1 flex gap-4 md:gap-6 py-2">
            {duplicatedRow1.map((skill, index) => (
              <div
                key={`row1-${skill.name}-${index}`}
                className="flex-shrink-0 flex items-center gap-2 md:gap-4 px-4 py-3 md:px-8 md:py-5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#4A6FFF]/30 transition-all duration-300"
              >
                <span className="text-sm md:text-lg font-semibold text-white">{skill.name}</span>
                <span className="text-[10px] md:text-xs text-white/40 px-2 py-0.5 md:px-3 md:py-1 bg-white/5 rounded-full">
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="marquee-row relative w-full mb-4 md:mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <div className="marquee-content-2 flex gap-4 md:gap-6 py-2">
            {duplicatedRow2.map((skill, index) => (
              <div
                key={`row2-${skill.name}-${index}`}
                className="flex-shrink-0 flex items-center gap-2 md:gap-4 px-4 py-3 md:px-8 md:py-5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#4A6FFF]/30 transition-all duration-300"
              >
                <span className="text-sm md:text-lg font-semibold text-white">{skill.name}</span>
                <span className="text-[10px] md:text-xs text-white/40 px-2 py-0.5 md:px-3 md:py-1 bg-white/5 rounded-full">
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 */}
        <div className="marquee-row relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <div className="marquee-content-3 flex gap-4 md:gap-6 py-2">
            {duplicatedRow3.map((skill, index) => (
              <div
                key={`row3-${skill.name}-${index}`}
                className="flex-shrink-0 flex items-center gap-2 md:gap-4 px-4 py-3 md:px-8 md:py-5 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#4A6FFF]/30 transition-all duration-300"
              >
                <span className="text-sm md:text-lg font-semibold text-white">{skill.name}</span>
                <span className="text-[10px] md:text-xs text-white/40 px-2 py-0.5 md:px-3 md:py-1 bg-white/5 rounded-full">
                  {skill.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
