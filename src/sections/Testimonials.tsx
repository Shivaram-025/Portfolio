import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Harish Kumar',
    role: 'Tech Lead',
    company: 'Yuvamytr',
    quote: "Shivarama's dedication to full-stack engineering and API optimization was key to delivering our platform. His problem solving skills are exceptional.",
    avatar: 'HK',
    rating: 5,
  },
  {
    id: 2,
    name: 'Dr. Archana S.',
    role: 'Professor',
    company: 'AIEMS',
    quote: 'He demonstrated outstanding engineering capabilities in IoT and cloud systems integration while working on his projects. Highly analytical and focused.',
    avatar: 'AS',
    rating: 5,
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Project Partner',
    company: 'NexusCloud Agent',
    quote: 'Collaborating with Shivarama on the Agentic AI models was a great experience. His skills in Langflow and watsonx.ai made the development fast and smooth.',
    avatar: 'PS',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const marquee = marqueeRef.current;
    if (!section || !heading || !marquee) return;

    const ctx = gsap.context(() => {
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

      // Marquee animation
      const marqueeContent = marquee.querySelector('.marquee-content');
      if (marqueeContent) {
        const marqueeWidth = marqueeContent.scrollWidth / 2;
        
        gsap.to(marqueeContent, {
          x: -marqueeWidth,
          duration: 40,
          ease: 'none',
          repeat: -1,
        });

        // Speed up on scroll
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity()) / 1000;
            const speed = Math.min(3, 1 + velocity * 0.5);
            gsap.to(marqueeContent, {
              timeScale: speed,
              duration: 0.3,
            });
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full py-24 lg:py-32 bg-[#050505] overflow-hidden"
    >
      {/* Header */}
      <div ref={headingRef} className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">
        <span className="inline-block text-sm font-medium text-[#4A6FFF] uppercase tracking-wider mb-4">
          Testimonials
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          What Clients Say
        </h2>
      </div>

      {/* Marquee */}
      <div ref={marqueeRef} className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="marquee-content flex gap-6 py-4">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[400px] p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#4A6FFF]/30 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#4A6FFF]/40 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#4A6FFF] text-[#4A6FFF]" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-white/80 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A6FFF] to-[#8B5CF6] flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-white/50 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second row - reverse direction */}
      <div className="relative mt-6">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <div className="marquee-reverse flex gap-6 py-4">
          {[...duplicatedTestimonials].reverse().map((testimonial, index) => (
            <div
              key={`reverse-${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[400px] p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#4A6FFF]/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-[#4A6FFF]/40 mb-4" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#4A6FFF] text-[#4A6FFF]" />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A6FFF] to-[#8B5CF6] flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-medium">{testimonial.name}</div>
                  <div className="text-white/50 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-reverse {
          animation: marquee-reverse 45s linear infinite;
        }
        
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
