import { motion } from 'motion/react';
import { Database, Code2, Globe, Cloud, Brain, Box } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Globe,
    color: "from-emerald-400/20 to-emerald-500/0",
    iconColor: "text-emerald-400",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"]
  },
  {
    title: "Backend & APIs",
    icon: Database,
    color: "from-blue-400/20 to-blue-500/0",
    iconColor: "text-blue-400",
    skills: ["Node.js", "Express", "Python", "RESTful APIs", "GraphQL"]
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "from-purple-400/20 to-purple-500/0",
    iconColor: "text-purple-400",
    skills: ["Docker", "AWS", "GitHub Actions", "Vercel", "Linux"]
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    color: "from-pink-400/20 to-pink-500/0",
    iconColor: "text-pink-400",
    skills: ["TensorFlow", "OpenAI API", "Langchain", "Python ML Stack"]
  },
  {
    title: "Core Languages",
    icon: Code2,
    color: "from-amber-400/20 to-amber-500/0",
    iconColor: "text-amber-400",
    skills: ["C++", "Java", "Python", "JavaScript", "SQL"]
  },
  {
    title: "Tools & Others",
    icon: Box,
    color: "from-cyan-400/20 to-cyan-500/0",
    iconColor: "text-cyan-400",
    skills: ["Git", "VS Code", "Postman", "Figma", "Agile"]
  }
];

export function SkillsSection() {
  const duplicatedCategories = [...skillCategories, ...skillCategories];

  return (
    <section id="skills" className="py-32 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-display">
            Technical <span className="text-blue-500">Arsenal</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
      </div>

      <div className="relative w-full flex py-4">
        <motion.div 
          className="flex gap-6 w-max px-6"
          animate={{ x: ["0%", "calc(-50% - 0.75rem)"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-300 w-[320px] md:w-[380px] shrink-0"
            >
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${category.color} rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#0a0a0f] border border-white/10 flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradients for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
