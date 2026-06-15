import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      gsap.from(footer.querySelectorAll('.footer-item'), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Shivaram-025', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/shivarama-r-312a64332', label: 'LinkedIn' },
  ];

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Works', href: '#works' },
    { label: 'Skills', href: '#capabilities' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-16 lg:py-24 bg-[#050505] border-t border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="footer-item lg:col-span-2">
            <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="inline-block mb-6">
              <span className="text-2xl font-bold text-white">Shivarama</span>
              <span className="text-2xl font-bold text-[#4A6FFF]">.</span>
            </a>
            <p className="text-white/60 leading-relaxed max-w-md mb-6">
              Passionate Full Stack Developer crafting production-ready, scalable web applications
              at the intersection of frontend elegance & backend performance.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#4A6FFF] hover:border-[#4A6FFF] hover:text-white transition-all duration-300"
                  aria-label={social.label}
                  data-magnetic
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-item">
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/60 hover:text-white transition-colors duration-300 inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-item">
            <h4 className="text-white font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:shivaramplg@gmail.com"
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  shivaramplg@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919148672650"
                  className="text-white/60 hover:text-white transition-colors duration-300"
                >
                  +91 9148672650
                </a>
              </li>
              <li className="text-white/60">
                Bengaluru, KA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Shivarama R. All rights reserved.
          </p>

        </div>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
        <div className="text-[18vw] font-bold text-white/[0.02] leading-none text-center whitespace-nowrap">
          SHIVARAM
        </div>
      </div>
    </footer>
  );
};

export default Footer;
