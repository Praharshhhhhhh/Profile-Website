import { motion } from 'motion/react';
import { Terminal, Cpu, Layout, Lightbulb } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-display">
            About <span className="text-blue-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Terminal Style Intro */}
          <div className="bg-[#0c0c10] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs font-mono text-gray-500">guest@praharsh:~</span>
            </div>
            <div className="p-6 md:p-8 font-mono text-sm md:text-base space-y-4 text-gray-400">
              <div className="flex gap-4">
                <span className="text-green-400 shrink-0">~ $</span>
                <span className="text-white">whoami</span>
              </div>
              <p className="pl-8 leading-relaxed">
                Hi, I'm <span className="text-blue-400 font-bold">Praharsh Tarsariya</span>. I am a CS engineering student with a strong passion for full-stack web development and software engineering.
              </p>
              <div className="flex gap-4">
                <span className="text-green-400 shrink-0">~ $</span>
                <span className="text-white">cat interests.txt</span>
              </div>
              <p className="pl-8 leading-relaxed">
                I enjoy transforming ideas into real-world applications. My focus lies in building scalable products, problem-solving, and continuously diving into new technologies like AI and machine learning.
              </p>
              <div className="flex gap-4 items-center">
                <span className="text-green-400 shrink-0">~ $</span>
                <span className="w-2 h-4 bg-white/70 animate-pulse block" />
              </div>
            </div>
          </div>

          {/* Cards Layout */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
             {[
               { icon: Layout, title: 'Full Stack', desc: 'Building end-to-end modern web applications.', color: 'text-blue-400', bg: 'bg-blue-500/10' },
               { icon: Cpu, title: 'AI Enthusiast', desc: 'Exploring machine learning and intelligent systems.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
               { icon: Terminal, title: 'Software Eng', desc: 'Writing clean, scalable, and efficient code.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
               { icon: Lightbulb, title: 'Problem Solver', desc: 'Tackling complex architectural challenges.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
             ].map((item, i) => (
               <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group relative overflow-hidden">
                 <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-[40px] ${item.bg} group-hover:scale-150 transition-transform duration-500`} />
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#0a0a0f] border border-white/5 relative z-10`}>
                   <item.icon className={`w-6 h-6 ${item.color}`} />
                 </div>
                 <h3 className="text-white font-bold mb-2 relative z-10">{item.title}</h3>
                 <p className="text-sm text-gray-400 relative z-10">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
