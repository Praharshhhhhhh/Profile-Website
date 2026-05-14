import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, FileText, Send, CheckCircle2, Copy } from 'lucide-react';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pktarsariya@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 relative z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] max-h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-display mb-6">
            Let's build something <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              extraordinary
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether it's a project, job op, or just a chat.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto">
          {/* Contact Methods */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button 
              onClick={handleCopyEmail}
              className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 font-medium">Email Me</p>
                  <p className="text-white font-medium">pktarsariya@gmail.com</p>
                </div>
              </div>
              {copied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />}
            </button>

            <div className="grid grid-cols-2 gap-4">
              <a href="https://github.com/Praharshhhhhhh" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all group">
                <Github className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-300">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/praharsh-tarsariya-b435ba29a/" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-[#0077B5]/20 hover:border-[#0077B5]/50 transition-all group">
                <Linkedin className="w-8 h-8 text-[#0077B5] group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-300">LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
