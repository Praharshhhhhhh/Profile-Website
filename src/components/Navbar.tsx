import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-[#050505]/60 backdrop-blur-md border-b border-white/5 shadow-lg' : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" onClick={(e) => scrollTo(e, '#')} className="text-white font-bold text-xl tracking-tighter flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-black">P</div>
          <span className="hidden sm:inline-block font-display">Tarsariya.</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-400">
          <a href="#about" onClick={(e) => scrollTo(e, '#about')} className="hover:text-white hover:scale-105 transition-all duration-300">About</a>
          <a href="#skills" onClick={(e) => scrollTo(e, '#skills')} className="hover:text-white hover:scale-105 transition-all duration-300">Skills</a>
          <a href="#projects" onClick={(e) => scrollTo(e, '#projects')} className="hover:text-white hover:scale-105 transition-all duration-300">Projects</a>
          <a href="#experience" onClick={(e) => scrollTo(e, '#experience')} className="hover:text-white hover:scale-105 transition-all duration-300">Experience</a>
          <a href="#codolio" onClick={(e) => scrollTo(e, '#codolio')} className="hover:text-white hover:scale-105 transition-all duration-300">Stats</a>
        </nav>

        <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-colors backdrop-blur-sm relative overflow-hidden group">
          <span className="relative z-10">Contact Me</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </motion.header>
  );
}
