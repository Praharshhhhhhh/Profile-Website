import { motion } from 'motion/react';
import { CircularProjects } from './ui/circular-projects';

const projects = [
  {
    title: "RepoLens Intel",
    description: "Analyze and gain insights from GitHub repositories effortlessly.",
    tags: ["Next.js","typeScript", "AI", "Groq API"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "https://repolens-intel.vercel.app",
    sourceUrl: "https://github.com/Praharshhhhhhh/REPOLENS"
  },
  {
    title: "Portfolio Website",
    description: "A cinematic developer portfolio showcasing my work and experience.",
    tags: ["React", "Typescript", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "praharsh-tarsariya.vercel.app",
    sourceUrl: "#"
  },
  {
    title: "Hand Gesture Control Robot",
    description: "Computer vision application to control physical robots using hand gestures.",
    tags: ["Python", "OpenCV", "Robotics"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "#",
    sourceUrl: "https://github.com/Praharshhhhhhh/Hand-Geusture-Control-Car"
  },
  {
    title: "Line Following Car",
    description: "An autonomous vehicle designed to follow a visual line using embedded systems and sensors.",
    tags: ["Embedded Systems", "Hardware", "C++"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
    demoUrl: "#",
    sourceUrl: "https://github.com/Praharshhhhhhh/Line-Following-Car"
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32 relative z-10 w-full flex justify-center">
      <div className="w-full max-w-6xl px-6">
        <div className="mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-display">
            Selected <span className="text-blue-500">Works</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        <CircularProjects projects={projects} autoplay={true} />
      </div>
    </section>
  );
}
