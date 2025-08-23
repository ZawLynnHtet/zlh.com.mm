import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const FloatingCodeFragments = () => {
  const containerRef = useRef(null);

  const codeFragments = [
    {
      id: 1,
      language: "React",
      code: `const Portfolio = () => {
  return (
    <div className="immersive-3d">
      <Experience />
    </div>
  );
};`,
      position: { x: 20, y: 15 },
      rotation: { x: 15, y: 45 },
      color: "from-accent to-brand-gray",
    },
    {
      id: 2,
      language: "TypeScript",
      code: `interface Developer {
  name: string;
  skills: Technology[];
  passion: 'Innovation';
}`,
      position: { x: 70, y: 25 },
      rotation: { x: -10, y: -30 },
      color: "from-blue-400 to-cyan-400",
    },
    {
      id: 3,
      language: "JavaScript",
      code: `const createMagic = async () => {
  const ideas = await fetchInspiration();
  return ideas.map(transform);
};`,
      position: { x: 15, y: 60 },
      rotation: { x: 20, y: 60 },
      color: "from-yellow-400 to-orange-400",
    },
    {
      id: 4,
      language: "CSS",
      code: `.future-web {
  transform: perspective(1000px);
  animation: float 3s ease-in-out;
  backdrop-filter: blur(10px);
}`,
      position: { x: 75, y: 70 },
      rotation: { x: -15, y: -45 },
      color: "from-purple-400 to-pink-400",
    },
    {
      id: 5,
      language: "WebGL",
      code: `gl.uniform3f(
  lightPosition,
  Math.sin(time) * 5,
  Math.cos(time) * 3,
  2.0
);`,
      position: { x: 45, y: 40 },
      rotation: { x: 5, y: 15 },
      color: "from-green-400 to-emerald-400",
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef?.current) return;

      const rect = containerRef?.current?.getBoundingClientRect();
      const x = (e?.clientX - rect?.left) / rect?.width;
      const y = (e?.clientY - rect?.top) / rect?.height;

      const fragments =
        containerRef?.current?.querySelectorAll(".code-fragment");
      fragments?.forEach((fragment, index) => {
        const intensity = (index + 1) * 0.1;
        const translateX = (x - 0.5) * 20 * intensity;
        const translateY = (y - 0.5) * 20 * intensity;

        fragment.style.transform = `translate(${translateX}px, ${translateY}px) ${fragment?.dataset?.rotation}`;
      });
    };

    const container = containerRef?.current;
    if (container) {
      container?.addEventListener("mousemove", handleMouseMove);
      return () => container?.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {codeFragments?.map((fragment, index) => (
        <motion.div
          key={fragment?.id}
          className="code-fragment absolute pointer-events-auto cursor-pointer"
          style={{
            left: `${fragment?.position?.x}%`,
            top: `${fragment?.position?.y}%`,
            transform: `rotateX(${fragment?.rotation?.x}deg) rotateY(${fragment?.rotation?.y}deg)`,
          }}
          data-rotation={`rotateX(${fragment?.rotation?.x}deg) rotateY(${fragment?.rotation?.y}deg)`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.2,
            duration: 0.8,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.05,
            rotateX: fragment?.rotation?.x - 5,
            rotateY: fragment?.rotation?.y - 5,
            transition: { duration: 0.3 },
          }}
        >
          <div
            className={`bg-gradient-to-br ${fragment?.color} p-4 rounded-lg backdrop-blur-sm border border-white/10 shadow-floating max-w-xs`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-white/90">
                {fragment?.language}
              </span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <pre className="text-xs font-mono text-white/80 leading-relaxed overflow-hidden">
              {fragment?.code}
            </pre>
          </div>
        </motion.div>
      ))}
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 })?.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FloatingCodeFragments;
