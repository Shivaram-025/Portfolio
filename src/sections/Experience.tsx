import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, Code, GraduationCap, Heart } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  type: 'work' | 'academic' | 'freelance' | 'volunteer';
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: 'Product Development Intern',
    company: 'Yuvamytr Edtech Solutions Pvt. Ltd.',
    period: 'Sep 2024 - Mar 2026',
    description: [
      'Spearheaded the end-to-end development of highly responsive, full-stack web applications, leveraging React.js and Tailwind CSS for the front-end alongside Node.js and MongoDB for scalable back-end architecture.',
      'Engineered and integrated robust RESTful APIs to facilitate seamless data flow, while conducting rigorous testing and debugging protocols to ensure optimal application performance and a flawless user experience.',
    ],
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'TailwindCSS'],
    type: 'work',
  },
  {
    id: 2,
    role: 'Nexora_2K26 - Team Lead - Hackathon Organizer',
    company: 'Amruta Institute of Engineering and Management Sciences, Bengaluru',
    period: 'Feb 2026 - Apr 2026',
    description: [
      'Organized and coordinated logistics for a college-wide hackathon with 200+ participants, ensuring smooth operation, scheduling, and judge panels.',
      'Coordinated mentor support, tech workshops, and platform infrastructure for participant teams.',
    ],
    skills: ['Event Management', 'Team Leadership', 'Community Building', 'Problem Solving'],
    type: 'volunteer',
  },
  // {
  //   id: 2,
  //   role: 'Freelance Full Stack Developer',
  //   company: 'Self-Employed',
  //   period: 'Jan 2024 - Sep 2025',
  //   description: [
  //     'Architected customized web applications for local businesses using Next.js and Postgres (NeonDB).',
  //     'Created student performance and analytics tracking dashboards with Power BI integration.',
  //     'Established developer Git/GitHub collaboration workflows for client handoffs, ensuring seamless maintainability.',
  //   ],
  //   skills: ['Next.js', 'MySQL', 'PostgreSQL', 'Power BI', 'Git'],
  //   type: 'freelance',
  // },
  // {
  //   id: 3,
  //   role: 'Core Tech Lead & Web Developer',
  //   company: 'Amruta Coding Club',
  //   period: 'Sep 2023 - Dec 2024',
  //   description: [
  //     'Pioneered technical workshops and code-alongs on data structures, backend logic, and web hosting, reaching 100+ active student developers.',
  //     'Maintained the club website using React and Node.js, managing standard pull-request reviews and release versioning.',
  //     'Led dev squads for annual college hackathon submissions, winning best technical design runner-up.',
  //   ],
  //   skills: ['JavaScript', 'React.js', 'Node.js', 'Git', 'Technical Mentorship'],
  //   type: 'academic',
  // },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const timeline = timelineRef.current;
    if (!section || !sticky || !timeline) return;

    const mm = gsap.matchMedia(section);

    mm.add({
      isDesktop: '(min-width: 1024px)',
      isMobile: '(max-width: 1023px)',
    }, (context) => {
      const isDesktop = (context.conditions as any)?.isDesktop;

      if (isDesktop) {
        // Sticky column contents fade in
        gsap.from(sticky.children, {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sticky,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        // Animate the vertical line height
        gsap.to('.timeline-progress-line', {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          },
        });

        // Timeline items fade in from side
        const items = timeline.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
          gsap.from(item, {
            opacity: 0,
            x: 50,
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
      } else {
        // Mobile view: simple fade-in animations without heavy scrub or translation skew/shifts
        const items = timeline.querySelectorAll('.timeline-item');
        items.forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          });
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full py-24 lg:py-32 bg-[#050505] overflow-hidden"
    >
      {/* Background soft glow effects */}
      <div className="absolute top-1/4 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#4A6FFF]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#4A6FFF]/3 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Sticky Column */}
          <div ref={stickyRef} className="lg:col-span-4 lg:sticky lg:top-32 lg:h-fit">
            <span className="inline-block text-sm font-medium text-[#4A6FFF] uppercase tracking-wider mb-4">
              Journey
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
              Experience
            </h2>
            <p className="text-white/60 leading-relaxed max-w-sm">
              A timeline of my professional developer internships, and academic technology leadership roles.
            </p>
          </div>

          {/* Right Timeline Column */}
          <div
            ref={timelineRef}
            className="lg:col-span-8 relative pl-6 sm:pl-10 ml-2 sm:ml-4 py-4 space-y-12"
          >
            {/* Vertical timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10">
              <div
                className="timeline-progress-line w-full bg-gradient-to-b from-[#4A6FFF] to-[#4A6FFF]/10 origin-top h-0"
                style={{ willChange: 'height' }}
              />
            </div>

            {experiences.map((exp) => {
              const Icon =
                exp.type === 'work'
                  ? Briefcase
                  : exp.type === 'academic'
                    ? GraduationCap
                    : exp.type === 'volunteer'
                      ? Heart
                      : Code;
              return (
                <div key={exp.id} className="timeline-item relative group">
                  {/* Timeline point */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#050505] border-2 border-white/20 flex items-center justify-center group-hover:border-[#4A6FFF] group-hover:bg-[#4A6FFF]/10 transition-all duration-300 z-10">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/40 group-hover:bg-[#4A6FFF] transition-all duration-300" />
                  </div>

                  {/* Card Container */}
                  <div className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/15 hover:bg-white/[0.02] transition-all duration-500 shadow-xl overflow-hidden">
                    {/* Glowing corner on hover */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#4A6FFF]/0 to-[#4A6FFF]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#4A6FFF] font-semibold tracking-wider uppercase bg-[#4A6FFF]/10 px-2.5 py-1 rounded-full mb-3">
                          <Icon className="w-3.5 h-3.5" />
                          {exp.type}
                        </span>
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#4A6FFF] transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <p className="text-white/60 font-medium mt-1">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/40 bg-white/5 border border-white/5 px-3 py-1.5 rounded-xl h-fit w-fit flex-shrink-0">
                        <Calendar className="w-4 h-4 text-white/50" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {exp.description.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-white/70 text-[15px] leading-relaxed"
                        >
                          <span className="text-[#4A6FFF] mt-1.5 flex-shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs text-white/50 bg-white/5 border border-white/5 px-3 py-1 rounded-full font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
