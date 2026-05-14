import { motion } from 'motion/react';
import { ExternalLink, Code2, Trophy, Target, Activity } from 'lucide-react';

export function CodolioSection() {
  const username = "24BCE5435"; // Assuming this is the username based on GitHub

  return (
    <section id="codolio" className="py-32 relative z-10 w-full flex justify-center border-t border-white/5">
      <div className="w-full max-w-6xl px-6">
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-display">
            Coding <span className="text-blue-500">Dashboard</span>
          </h2>
          <p className="text-gray-400 text-lg">My competitive programming and problem-solving statistics.</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        <motion.div
          className="w-full bg-[#0a0a0f] border border-white/10 rounded-3xl overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Dashboard Header */}
          <div className="p-8 border-b border-white/10 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Code2 className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Codolio Profile</h3>
                <p className="text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Active Problem Solver
                </p>
              </div>
            </div>
            
            <a 
              href={`https://codolio.com/profile/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              View Full Profile <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Embed Codolio (If iframe works, otherwise fallback to stats placeholder) */}
          <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-[#050505] relative flex items-center justify-center p-4">
               {/* We can use an iframe to embed the actual profile if codolio allows it, or just show a nice placeholder */}
               <iframe 
                 src={`https://codolio.com/profile/${username}`}
                 className="w-full h-full rounded-xl border border-white/5"
                 title="Codolio Profile"
                 sandbox="allow-scripts allow-same-origin"
                 loading="lazy"
               />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
