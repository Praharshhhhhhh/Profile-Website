/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SmoothScroll } from './components/SmoothScroll';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CodolioSection } from './components/CodolioSection';
import { ContactSection } from './components/ContactSection';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { SparklesCore } from './components/ui/sparkles';

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050505] text-slate-200 selection:bg-blue-500/30 font-sans">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <SparklesCore
            id="global-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.5}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={0.1}
          />
        </div>
        <CustomCursor />
        <Navbar />
        
        <main className="relative z-10 flex flex-col items-center w-full overflow-hidden">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <CodolioSection />
          <ContactSection />
        </main>

        <footer className="py-8 text-center text-gray-600 text-sm font-mono relative z-10">
          <p>&copy; {new Date().getFullYear()} Praharsh Tarsariya. All rights reserved.</p>
        </footer>
      </div>
    </SmoothScroll>
  );
}

