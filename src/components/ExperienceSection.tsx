import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    role: "12th Grade Science",
    company: "Ryan International School",
    location: "Surat",
    period: "2023 - 2024",
    description: "Completed higher secondary education focusing on Mathematics, Physics, and Chemistry basics forming a strong foundation for Engineering.",
  },
  {
    role: "B.Tech in Computer Science",
    company: "Vellore Institute of Technology",
    location: "Chennai Campus",
    period: "2024 - 2028",
    description: "Pursuing Bachelor's degree with a focus on core CS fundamentals, data structures, algorithms, and active participation in technical clubs.",
  }
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-display">
            Journey & <span className="text-purple-500">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
        </div>

        <div className="relative border-l border-white/10 pl-8 md:pl-12 space-y-16 ml-4 md:ml-0">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i} 
              className="relative group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              {/* Glowing timeline node */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full border-4 border-[#050505] bg-purple-500 ring-2 ring-purple-500/30 group-hover:ring-purple-500/60 group-hover:scale-125 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-colors backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[40px] rounded-full pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 relative z-10">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-blue-400 font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end gap-1 text-sm text-gray-500 font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base relative z-10">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
