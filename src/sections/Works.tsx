import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'NexusCloud Pest Risk Agent',
    category: 'Agentic AI & Smart Farming',
    description: 'Built Agentic AI models for pest risk prediction and smart farming decision support using IBM watsonx.ai, Langflow, and IBM Cloud.',
    image: '/project-nebula.jpg',
    tags: ['IBM watsonx.ai', 'Langflow', 'IBM Cloud'],
    link: '#',
  },
  {
    id: 2,
    title: 'Educational Access & Outcomes',
    category: 'Data Analytics & Web App',
    description: 'Analyzed student data on education access, satisfaction, and outcomes using Power BI, displaying it in a Next.js web application.',
    image: '/project-echo.jpg',
    tags: ['Next.js', 'PowerBI', 'Data Analysis'],
    link: '#',
  },
  {
    id: 3,
    title: 'Air Quality Monitoring System',
    category: 'IoT & Hardware Programming',
    description: 'An IoT-based air monitoring system measuring temperature and humidity with real-time data collection via Arduino/NodeMCU and ThingSpeak.',
    image: '/project-vertex.jpg',
    tags: ['C++', 'Arduino', 'ThingSpeak', 'IoT'],
    link: '#',
  },
];

const Works = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const projectsContainer = projectsRef.current;
    if (!section || !heading || !projectsContainer) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(heading.children, {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Project items animation
      const projectItems = projectsContainer.querySelectorAll('.project-item');
      projectItems.forEach((item, index) => {
        gsap.from(item, {
          y: 60,
          skewY: 3,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        });
      });

      // Kinetic scroll effect
      let currentSkew = 0;
      let targetSkew = 0;

      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          targetSkew = Math.max(-5, Math.min(5, velocity / 500));
        },
      });

      const updateSkew = () => {
        currentSkew += (targetSkew - currentSkew) * 0.1;
        targetSkew *= 0.95;
        
        projectItems.forEach((item) => {
          gsap.set(item, { skewY: currentSkew });
        });
        
        requestAnimationFrame(updateSkew);
      };
      updateSkew();
    }, section);

    return () => ctx.revert();
  }, []);

  // Floating image follow cursor
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    if (hoveredProject !== null) {
      gsap.to(image, {
        x: mousePos.x - 150,
        y: mousePos.y - 100,
        duration: 0.4,
        ease: 'power2.out',
        opacity: 1,
        scale: 1,
      });
    } else {
      gsap.to(image, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
      });
    }
  }, [hoveredProject, mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full py-24 lg:py-32 bg-[#050505]"
      onMouseMove={handleMouseMove}
    >
      {/* Floating image preview */}
      <div
        ref={imageRef}
        className="fixed pointer-events-none z-30 w-[300px] h-[200px] rounded-xl overflow-hidden opacity-0"
        style={{ willChange: 'transform, opacity' }}
      >
        {hoveredProject !== null && (
          <img
            src={projects[hoveredProject].image}
            alt={projects[hoveredProject].title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={headingRef} className="mb-16 lg:mb-24">
          <span className="inline-block text-sm font-medium text-[#4A6FFF] uppercase tracking-wider mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight">
            Selected Works
          </h2>
        </div>

        {/* Projects List */}
        <div ref={projectsRef} className="space-y-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-item group relative border-t border-white/10 py-8 lg:py-12 cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <a
                href={project.link}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8"
              >
                {/* Left: Number & Title */}
                <div className="flex items-baseline gap-6 lg:gap-12">
                  <span className="text-sm text-white/40 font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white group-hover:text-[#4A6FFF] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/50 mt-2 lg:hidden">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Center: Category (desktop) */}
                <div className="hidden lg:block text-white/50 text-sm">
                  {project.category}
                </div>

                {/* Right: Tags & Arrow */}
                <div className="flex items-center gap-6">
                  <div className="hidden sm:flex items-center gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-white/5 text-white/60 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#4A6FFF] group-hover:border-[#4A6FFF] transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </a>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#4A6FFF] group-hover:w-full transition-all duration-500 ease-out" />
            </div>
          ))}
          
          {/* Bottom border */}
          <div className="border-t border-white/10" />
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white/5 transition-all duration-300"
            data-magnetic
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Works;
