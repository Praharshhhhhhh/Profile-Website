import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { ArrowRight, Github, Code2, Terminal, Cpu } from 'lucide-react';

export function HeroSection() {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

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
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center" ref={textContainerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm font-medium text-blue-200 tracking-wide">Available for new opportunities</span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-2 font-display"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Praharsh Tarsariya
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-4xl text-gray-300 font-medium tracking-tight mb-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Building Intelligent Digital Experiences
        </motion.h2>

        <motion.p
          className="text-lg md:text-2xl text-gray-400 font-light tracking-wide mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          CS Undergraduate • Full Stack Developer • AI Enthusiast
        </motion.p>


        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a href="#projects" onClick={(e) => scrollTo(e, '#projects')} className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2 overflow-hidden">
            <span className="relative z-10">View Projects</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="#contact" onClick={(e) => scrollTo(e, '#contact')} className="px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-semibold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
            Contact Me
          </a>
        </motion.div>

        {/* Floating tech badges */}
        <motion.div 
          className="absolute left-[5%] md:-left-12 top-[10%] animate-bounce"
          style={{ animationDuration: '4s' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.15)] text-blue-400">
            <Code2 className="w-8 h-8" />
          </div>
        </motion.div>

        <motion.div 
          className="absolute right-[5%] md:-right-12 top-[15%] animate-bounce"
          style={{ animationDuration: '5s' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] text-purple-400">
            <Github className="w-8 h-8" />
          </div>
        </motion.div>

        <motion.div 
          className="absolute left-[10%] md:left-10 bottom-[15%] animate-bounce"
          style={{ animationDuration: '4.5s' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(34,197,94,0.15)] text-green-400">
            <Terminal className="w-8 h-8" />
          </div>
        </motion.div>

        <motion.div 
          className="absolute right-[10%] md:right-10 bottom-[5%] animate-bounce"
          style={{ animationDuration: '5.5s' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6 }}
        >
          <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(234,179,8,0.15)] text-yellow-400">
            <Cpu className="w-8 h-8" />
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/50 to-white/0 animate-pulse" />
        <span className="text-xs tracking-[0.3em] uppercase text-gray-500 font-medium">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
