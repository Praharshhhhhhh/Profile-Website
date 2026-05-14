'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

gsap.registerPlugin(ScrollTrigger);

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const subtitleRefs = useRef<HTMLDivElement[]>([]);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2; // Actually 3 sections total (0, 1, 2)
  
  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
    locations: number[];
  }>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
    locations: []
  });

  // Initialize Three.js
  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;
      if (!canvasRef.current) return;
      
      // Scene setup
      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      // Camera
      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      // Renderer
      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      // Post-processing
      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.85
      );
      refs.composer.addPass(bloomPass);

      // Create scene elements
      createStarField();
      createNebula();
      createMountains();
      createAtmosphere();
      getLocation();

      // Start animation
      animate();
      
      // Mark as ready after Three.js is initialized
      setIsReady(true);
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      const starCount = 5000;
      
      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Color variation
          const color = new THREE.Color();
          const colorChoice = Math.random();
          if (colorChoice < 0.7) {
            color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
          } else if (colorChoice < 0.9) {
            color.setHSL(0.08, 0.5, 0.8);
          } else {
            color.setHSL(0.6, 0.5, 0.8);
          }
          
          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;

          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            
            void main() {
              vColor = color;
              vec3 pos = position;
              
              // Slow rotation based on depth
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x0033ff) },
          color2: { value: new THREE.Color(0xff0066) },
          opacity: { value: 0.3 }
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      nebula.rotation.x = 0;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      
      const layers = [
        { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
        { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
      ];

      layers.forEach((layer, index) => {
        const points = [];
        const segments = 50;
        
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height + 
                   Math.sin(i * 0.05) * layer.height * 0.5 +
                   Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }
        
        points.push(new THREE.Vector2(5000, -300));
        points.push(new THREE.Vector2(-5000, -300));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance
        mountain.userData = { baseZ: layer.distance, index };
        refs.scene.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const createAtmosphere = () => {
      const { current: refs } = threeRefs;
      if (!refs.scene) return;
      
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          uniform float time;
          
          void main() {
            float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
            
            float pulse = sin(time * 2.0) * 0.1 + 0.9;
            atmosphere *= pulse;
            
            gl_FragColor = vec4(atmosphere, intensity * 0.25);
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene.add(atmosphere);
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;

      // Update stars
      refs.stars.forEach((starField) => {
        if ((starField.material as THREE.ShaderMaterial).uniforms) {
          (starField.material as THREE.ShaderMaterial).uniforms.time.value = time;
        }
      });

      // Update nebula
      if (refs.nebula && (refs.nebula.material as THREE.ShaderMaterial).uniforms) {
        (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value = time * 0.5;
      }

      // Smooth camera movement with easing
      if (refs.camera && refs.targetCameraX !== undefined && refs.targetCameraY !== undefined && refs.targetCameraZ !== undefined) {
        const smoothingFactor = 0.05; // Lower = smoother but slower
        
        // Calculate smooth position with easing
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;
        
        // Add subtle floating motion
        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;
        
        // Apply final position
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      // Parallax mountains with subtle animation
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + (Math.cos(time * 0.15) * 1 * parallaxFactor);
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    initThree();

    // Handle resize
    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      const { current: refs } = threeRefs;
      
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      // Dispose Three.js resources
      refs.stars.forEach(starField => {
        starField.geometry.dispose();
        if (Array.isArray(starField.material)) {
          starField.material.forEach(m => m.dispose());
        } else {
          starField.material.dispose();
        }
      });

      refs.mountains.forEach(mountain => {
        mountain.geometry.dispose();
        if (Array.isArray(mountain.material)) {
          mountain.material.forEach(m => m.dispose());
        } else {
          mountain.material.dispose();
        }
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        if (Array.isArray(refs.nebula.material)) {
          refs.nebula.material.forEach(m => m.dispose());
        } else {
          refs.nebula.material.dispose();
        }
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  const getLocation = () => {
    const { current: refs } = threeRefs;
    const locations: number[] = [];
    refs.mountains.forEach( (mountain, i) => {
      locations[i] = mountain.position.z
    })
    refs.locations = locations
  }

  // GSAP Animations - Run after component is ready
  useEffect(() => {
    if (!isReady) return;
    
    // Set initial states to prevent flash
    gsap.set([menuRef.current, ...titleRefs.current.filter(Boolean), ...subtitleRefs.current.filter(Boolean), scrollProgressRef.current], {
      visibility: 'visible'
    });

    const tl = gsap.timeline();

    // Animate menu
    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }

    // Animate scroll indicator
    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
      }, "-=0.5");
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Scroll handling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          // Calculate maxScroll avoiding division by zero
          const maxScroll = Math.max(documentHeight - windowHeight, 1);
          const progress = Math.min(scrollY / maxScroll, 1);
          
          setScrollProgress(progress);
          const newSection = Math.floor(progress * totalSections);
          setCurrentSection(newSection);

          const { current: refs } = threeRefs;
          
          // Calculate smooth progress through all sections
          const totalProgress = progress * totalSections;
          const sectionProgress = totalProgress % 1;
          
          // Define camera positions for each section
          const cameraPositions = [
            { x: 0, y: 30, z: 300 },    // Section 0 - HORIZON
            { x: 0, y: 40, z: -50 },     // Section 1 - COSMOS
            { x: 0, y: 50, z: -700 }       // Section 2 - INFINITY
          ];
          
          // Get current and next positions
          const currentPos = cameraPositions[newSection] || cameraPositions[0];
          const nextPos = cameraPositions[newSection + 1] || currentPos;
          
          // Set target positions (actual smoothing happens in animate loop)
          refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
          refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
          refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;
          
          // Smooth parallax for mountains
          refs.mountains.forEach((mountain, i) => {
            const speed = 1 + i * 0.9;
            const targetZ = mountain.userData.baseZ + scrollY * speed * 0.5;
            
            if (refs.nebula) {
                refs.nebula.position.z = (targetZ + progress * speed * 0.01) - 100
            }
            
            // Use the same smoothing approach
            mountain.userData.targetZ = targetZ;
            const location = mountain.position.z
            if (progress > 0.7) {
              mountain.position.z = 600000;
            }
            if (progress < 0.7) {
              mountain.position.z = refs.locations[i] || targetZ;
            }
          });
          if (refs.nebula && refs.mountains[3]) {
            refs.nebula.position.z = refs.mountains[3].position.z
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once to initialize
    setTimeout(handleScroll, 100); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titles: Record<number, React.ReactNode> = {
    0: <><span className="block">PRAHARSH</span><span className="block text-blue-400">TARSARIYA</span></>,
    1: 'BUILD',
    2: 'INNOVATE'
  };
  
  const subtitles = {
    0: {
      line1: 'Full Stack Engineer & Problem Solver,',
      line2: 'building digital horizons through code.'
    },
    1: {
      line1: 'Transforming ideas into interactive',
      line2: 'and scalable real-world applications.'
    },
    2: {
      line1: 'Continuously learning, engaging,',
      line2: 'and improving in the tech field.'
    }
  };

  return (
    <div ref={containerRef} className="hero-container cosmos-style relative w-full h-[300vh]">
      <canvas ref={canvasRef} className="hero-canvas fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />
      
      {/* Side menu */}
      <div ref={menuRef} className="side-menu fixed left-[2rem] top-1/2 -translate-y-1/2 flex flex-col items-center gap-[2rem] z-50 mix-blend-difference hidden md:flex" style={{ visibility: 'hidden' }}>
        <div className="menu-icon flex flex-col gap-[5px] cursor-pointer">
          <span className="w-[30px] h-[2px] bg-white transition-all"></span>
          <span className="w-[30px] h-[2px] bg-white transition-all"></span>
          <span className="w-[30px] h-[2px] bg-white transition-all"></span>
        </div>
        <div className="vertical-text text-white tracking-[0.3em] text-xs [writing-mode:vertical-rl] rotate-180">PORTFOLIO</div>
      </div>

      {/* Main content - First section is part of the normal flow at top */}
      <div className="hero-content cosmos-content h-screen flex flex-col justify-center items-center relative z-10 sticky top-0 px-4">
        <h1 
          ref={el => { if (el) titleRefs.current[0] = el; }} 
          className="hero-title text-4xl sm:text-6xl md:text-[110px] leading-[1] md:leading-[0.85] font-bold tracking-tighter text-white transition-opacity duration-500 text-center"
          style={{ opacity: currentSection === 0 ? 1 : 0 }}
        >
          {titles[0]}
        </h1>
        
        <div 
          ref={el => { if (el) subtitleRefs.current[0] = el; }} 
          className="hero-subtitle cosmos-subtitle mt-8 text-center text-gray-300 text-sm sm:text-lg md:text-2xl font-light tracking-wide max-w-2xl transition-opacity duration-500 w-full"
          style={{ opacity: currentSection === 0 ? 1 : 0, position: 'absolute', top: '70%' }}
        >
          <p className="subtitle-line">{subtitles[0].line1}</p>
          <p className="subtitle-line">{subtitles[0].line2}</p>
        </div>

        <h1 
          ref={el => { if (el) titleRefs.current[1] = el; }} 
          className="hero-title text-5xl sm:text-7xl md:text-[110px] leading-[1] md:leading-[0.85] font-bold tracking-tighter text-white transition-opacity duration-500 text-center"
          style={{ opacity: currentSection === 1 ? 1 : 0, position: 'absolute' }}
        >
          {titles[1]}
        </h1>
        
        <div 
          ref={el => { if (el) subtitleRefs.current[1] = el; }} 
          className="hero-subtitle cosmos-subtitle mt-8 text-center text-gray-300 text-sm sm:text-lg md:text-2xl font-light tracking-wide max-w-2xl transition-opacity duration-500 w-full"
          style={{ opacity: currentSection === 1 ? 1 : 0, position: 'absolute', top: '70%' }}
        >
          <p className="subtitle-line">{subtitles[1].line1}</p>
          <p className="subtitle-line">{subtitles[1].line2}</p>
        </div>

        <h1 
          ref={el => { if (el) titleRefs.current[2] = el; }} 
          className="hero-title text-5xl sm:text-7xl md:text-[110px] leading-[1] md:leading-[0.85] font-bold tracking-tighter text-white transition-opacity duration-500 text-center"
          style={{ opacity: currentSection === 2 ? 1 : 0, position: 'absolute' }}
        >
          {titles[2]}
        </h1>
        
        <div 
          ref={el => { if (el) subtitleRefs.current[2] = el; }} 
          className="hero-subtitle cosmos-subtitle mt-8 text-center text-gray-300 text-sm sm:text-lg md:text-2xl font-light tracking-wide max-w-2xl transition-opacity duration-500 w-full"
          style={{ opacity: currentSection === 2 ? 1 : 0, position: 'absolute', top: '70%' }}
        >
          <p className="subtitle-line">{subtitles[2].line1}</p>
          <p className="subtitle-line">{subtitles[2].line2}</p>
        </div>
      </div>

      {/* Scroll sections overlay to make scrolling work */}
      <div className="scroll-sections absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <section key={i} className="content-section h-screen w-full"></section>
        ))}
      </div>

      {/* Scroll progress indicator */}
      <div ref={scrollProgressRef} className="scroll-progress fixed right-4 md:right-[2rem] bottom-[2rem] md:bottom-[4rem] flex flex-col items-end gap-2 z-50 mix-blend-difference" style={{ visibility: 'hidden' }}>
        <div className="scroll-text text-white text-[10px] md:text-xs font-mono tracking-widest">SCROLL</div>
        <div className="progress-track w-[2px] h-[100px] bg-white/20 relative overflow-hidden">
          <div 
            className="progress-fill absolute top-0 w-full bg-white transition-all duration-300 pointer-events-none" 
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="section-counter text-white font-mono text-sm">
          {String(currentSection + 1).padStart(2, '0')} / {String(totalSections + 1).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};
