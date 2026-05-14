"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  sourceUrl: string;
}

interface Colors {
  title?: string;
  description?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

interface CircularProjectsProps {
  projects: Project[];
  autoplay?: boolean;
  colors?: Colors;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularProjects = ({
  projects,
  autoplay = true,
  colors = {},
}: CircularProjectsProps) => {
  // Color config
  const colorTitle = colors.title ?? "#fff";
  const colorDescription = colors.description ?? "#9ca3af";
  const colorArrowBg = colors.arrowBackground ?? "rgba(255,255,255,0.05)";
  const colorArrowFg = colors.arrowForeground ?? "#fff";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "rgba(255,255,255,0.1)";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const projectsLength = useMemo(() => projects.length, [projects]);
  const activeProject = useMemo(
    () => projects[activeIndex],
    [activeIndex, projects]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % projectsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, projectsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, projectsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projectsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [projectsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projectsLength) % projectsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [projectsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isMobile = containerWidth < 768; // Adjust for mobile stacking

    const offset = (index - activeIndex + projectsLength) % projectsLength;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + projectsLength) % projectsLength === index;
    const isRight = (activeIndex + 1) % projectsLength === index;
    
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft && !isMobile) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight && !isMobile) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants
  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full relative mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Images */}
        <div className="relative w-full h-[300px] md:h-[400px]" style={{ perspective: "1000px" }} ref={imageContainerRef}>
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              style={getImageStyle(index)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          ))}
        </div>
        
        {/* Content */}
        <div className="flex flex-col justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="space-y-6"
            >
              <h3
                className="text-3xl md:text-5xl font-bold tracking-tight font-display"
                style={{ color: colorTitle }}
              >
                {activeProject.title}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                 {activeProject.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300 tracking-wider"
                    >
                      {tag}
                    </span>
                 ))}
              </div>

              <motion.p
                style={{ color: colorDescription }}
                className="text-lg leading-relaxed max-w-lg"
              >
                {activeProject.description.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(10px)",
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.22,
                      ease: "easeInOut",
                      delay: 0.025 * i,
                    }}
                    style={{ display: "inline-block", marginRight: "0.25rem" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
              
              <div className="flex gap-4 pt-4">
                 <a 
                    href={activeProject.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 text-white font-medium hover:bg-white/20 transition-all font-mono text-sm"
                  >
                    <Github className="w-4 h-4" /> Source
                  </a>
                  <a 
                    href={activeProject.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/50 bg-blue-500/20 text-white font-medium hover:bg-blue-500/30 transition-all font-mono text-sm"
                  >
                    <ExternalLink className="w-4 h-4" /> Demo
                  </a>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex gap-4 mt-12">
            <button
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors border border-white/10 backdrop-blur-sm"
              aria-label="Previous project"
            >
              <ArrowLeft size={20} color={colorArrowFg} />
            </button>
            <button
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors border border-white/10 backdrop-blur-sm"
              aria-label="Next project"
            >
              <ArrowRight size={20} color={colorArrowFg} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
