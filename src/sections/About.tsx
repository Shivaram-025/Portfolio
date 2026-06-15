import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Clock, Coffee } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;
    if (!section || !image || !content || !stats) return;

    const ctx = gsap.context(() => {
      // Background color transition
      gsap.to(section, {
        backgroundColor: '#F5F5F7',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      });

      // Image reveal animation
      gsap.fromTo(
        image.querySelector('.image-mask'),
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      gsap.from(content.children, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      // Stats animation
      gsap.from(stats.children, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stats,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Clock, value: '1+', label: 'Year Experience' },
    { icon: Award, value: '4+', label: 'Certifications' },
    { icon: Coffee, value: '3+', label: 'Key Projects' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen py-24 lg:py-32 transition-colors duration-700"
      style={{ backgroundColor: '#050505' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <div ref={imageRef} className="lg:col-span-5 relative">
            <div className="image-mask relative aspect-[3/4] rounded-2xl overflow-hidden">
              <img
                src="/profile-pic.jpeg"
                alt="Shivarama R. - Full Stack Developer"
                className="w-full h-full object-cover grayscale"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#4A6FFF]/30 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#4A6FFF]/10 rounded-full blur-2xl" />
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="lg:col-span-7 lg:pl-8">
            <span className="inline-block text-sm font-medium text-[#4A6FFF] uppercase tracking-wider mb-4">
              About Me
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D1D1F] mb-6 tracking-tight">
              The Developer
            </h2>

            <div className="space-y-4 text-lg text-[#6E6E73] leading-relaxed mb-10">
              <p>
                I am an Information Science and Engineering student at Amruta Institute of Engineering
                and Management Sciences (2023 - 2027) based in Bengaluru, KA. I specialize in building
                highly responsive, full-stack web applications and robust RESTful APIs.
              </p>
              <p>
                My experience spans across designing clean, efficient backend systems with Node.js and
                architecting databases like MySQL, MongoDB, and NeonDB. I am currently expanding my
                knowledge in C# and the .NET ecosystem to apply enterprise-level object-oriented programming principles.
              </p>
              <p>
                Combining strong technical capabilities with soft skills in problem solving and team
                collaboration, I aim to build high-performance, resilient software systems that go beyond
                simple templates to deliver real-world impact.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-3 sm:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-center px-2 py-5 sm:p-6 bg-white rounded-xl shadow-sm border border-black/5 min-w-0"
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A6FFF] mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#6E6E73] font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
