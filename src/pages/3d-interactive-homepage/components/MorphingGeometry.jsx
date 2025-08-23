import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MorphingGeometry = () => {
  const [currentShape, setCurrentShape] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const shapes = [
    {
      name: "Structured Thinking",
      description: "Wireframe Cube",
      paths: [
        "M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z",
        "M50 20 L80 35 M80 35 L80 65 M80 65 L50 80 M50 80 L20 65 M20 65 L20 35 M20 35 L50 20",
        "M50 20 L50 80 M20 35 L80 35 M20 65 L80 65",
      ],
      color: "stroke-accent",
      fill: "fill-accent/10",
    },
    {
      name: "Creative Flow",
      description: "Organic Shape",
      paths: ["M30 50 Q20 30 50 25 Q80 30 70 50 Q80 70 50 75 Q20 70 30 50 Z"],
      color: "stroke-trust-builder",
      fill: "fill-trust-builder/10",
    },
    {
      name: "Innovation",
      description: "Neural Network",
      paths: [
        "M50 25 L35 40 M50 25 L65 40 M35 40 L50 55 M65 40 L50 55 M50 55 L35 70 M50 55 L65 70",
        "M25 35 L75 35 M25 50 L75 50 M25 65 L75 65",
      ],
      color: "stroke-conversion-accent",
      fill: "fill-conversion-accent/10",
    },
    {
      name: "Problem Solving",
      description: "Geometric Pattern",
      paths: [
        "M50 20 L70 35 L60 55 L40 55 L30 35 Z",
        "M50 45 L70 60 L60 80 L40 80 L30 60 Z",
      ],
      color: "stroke-cta-golden",
      fill: "fill-cta-golden/10",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentShape((prev) => (prev + 1) % shapes?.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, shapes?.length]);

  const currentShapeData = shapes?.[currentShape];

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] relative">
      {/* Main morphing shape */}
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 100 100"
          className="drop-shadow-2xl"
        >
          {/* Background glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="shapeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Animated paths */}
          {currentShapeData?.paths?.map((path, index) => (
            <motion.path
              key={`${currentShape}-${index}`}
              d={path}
              className={`${currentShapeData?.color} ${currentShapeData?.fill}`}
              strokeWidth="2"
              fill={path?.includes("Z") ? "url(#shapeGradient)" : "none"}
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Center point */}
          <motion.circle
            cx="50"
            cy="50"
            r="2"
            className="fill-accent"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Floating particles around shape */}
        {/* <div className="absolute inset-0">
          {Array.from({ length: 8 })?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 0'
              }}
              animate={{
                rotate: 360,
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                rotate: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25
                }
              }}
              style={{
                transform: `rotate(${i * 45}deg) translateX(120px)`
              }}
            />
          ))}
        </div> */}

        <div className="absolute inset-0">
          {Array.from({ length: 8 })?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transformOrigin: "0 0",
                rotate: i * 45, // ✅ initial angle
                x: 120, // ✅ translateX(120px)
              }}
              animate={{
                rotate: 360, // ✅ animates around center
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                rotate: {
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.25,
                },
              }}
            />
          ))}
        </div>
      </motion.div>
      {/* Shape information */}
      <motion.div
        className="mt-8 text-center"
        key={currentShape}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-headline text-xl font-semibold text-foreground mb-2">
          {currentShapeData?.name}
        </h3>
        <p className="font-ui text-sm text-muted-foreground">
          {currentShapeData?.description}
        </p>
      </motion.div>
      {/* Shape indicators */}
      <div className="flex space-x-2 mt-6">
        {shapes?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentShape(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentShape
                ? "bg-accent scale-125"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
      {/* Background geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg
          className="absolute -top-20 -left-20 w-40 h-40"
          viewBox="0 0 100 100"
        >
          <polygon
            points="50,10 90,90 10,90"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-accent"
          />
        </svg>
        <svg
          className="absolute -bottom-20 -right-20 w-32 h-32"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-trust-builder"
          />
        </svg>
      </div>
    </div>
  );
};

export default MorphingGeometry;
