import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Works', href: '#works' },
    { label: 'Skills', href: '#capabilities' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial animation
    const ctx = gsap.context(() => {
      gsap.fromTo(nav,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.5,
          ease: 'power3.out',
        }
      );
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-2 md:top-4 left-0 right-0 z-50 w-full flex justify-center px-3 md:px-4 transition-all duration-300 pointer-events-none"
      >
        <div
          className={`w-full max-w-[1200px] rounded-full border border-white/10 pointer-events-auto flex items-center justify-between transition-all duration-300 ${isScrolled
            ? 'glass py-2 px-5 md:py-3 md:px-8 shadow-lg shadow-black/50'
            : 'bg-[#050505]/40 backdrop-blur-md py-2.5 px-5 md:py-4 md:px-6'
            }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="text-lg md:text-xl font-bold tracking-tight"
            data-magnetic
          >
            <span className="text-white">Shivarama R</span>
            <span className="text-[#4A6FFF]">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm text-white/70 hover:text-white transition-colors duration-300 line-reveal"
                data-magnetic
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A6FFF] text-white text-sm font-medium rounded-full hover:bg-[#5a7fff] transition-colors duration-300"
            data-magnetic
          >
            Let's Talk
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 h-screen w-[280px] sm:w-[320px] z-50 bg-[#07070c]/95 backdrop-blur-2xl border-l border-white/10 p-8 flex flex-col md:hidden transition-transform duration-300 ease-out shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="text-lg font-semibold tracking-tight text-white">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white/70 hover:text-white p-2 rounded-xl bg-white/5 border border-white/10 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-2xl font-medium text-white/80 hover:text-white transition-all duration-300 py-2 border-b border-white/5"
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(15px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transitionProperty: 'transform, opacity, color',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="mt-6 w-full py-3 bg-[#4A6FFF] text-white text-center font-medium rounded-full hover:bg-[#5a7fff] transition-all duration-300"
            style={{
              transitionDelay: isMobileMenuOpen ? '250ms' : '0ms',
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(15px)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transitionProperty: 'transform, opacity, background-color',
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
