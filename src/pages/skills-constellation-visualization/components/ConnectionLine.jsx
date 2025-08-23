import React from 'react';
import { motion } from 'framer-motion';

const ConnectionLine = ({ 
  from, 
  to, 
  strength = 1, 
  isActive = false,
  animationDelay = 0 
}) => {
  const calculatePath = () => {
    const dx = to?.x - from.x;
    const dy = to?.y - from.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Create a curved path for more organic feel
    const midX = (from.x + to?.x) / 2;
    const midY = (from.y + to?.y) / 2;
    
    // Add some curvature based on distance
    const curvature = Math.min(distance * 0.2, 50);
    const controlX = midX + (Math.random() - 0.5) * curvature;
    const controlY = midY + (Math.random() - 0.5) * curvature;
    
    return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to?.x} ${to?.y}`;
  };

  const getStrokeWidth = () => {
    return Math.max(1, strength * 2);
  };

  const getOpacity = () => {
    if (isActive) return 0.8;
    return Math.max(0.2, strength * 0.6);
  };

  const pathData = calculatePath();

  return (
    <motion.path
      d={pathData}
      fill="none"
      stroke="rgba(0, 217, 255, 0.4)"
      strokeWidth={getStrokeWidth()}
      opacity={getOpacity()}
      strokeDasharray={isActive ? "none" : "5,5"}
      className="transition-all duration-500"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: 1, 
        opacity: getOpacity(),
        stroke: isActive ? "rgba(0, 217, 255, 0.8)" : "rgba(0, 217, 255, 0.4)"
      }}
      transition={{ 
        duration: 1.5, 
        delay: animationDelay,
        ease: "easeInOut"
      }}
    >
      {/* Animated flow effect */}
      {isActive && (
        <motion.animate
          attributeName="stroke-dasharray"
          values="0,10;5,5;10,0"
          dur="2s"
          repeatCount="indefinite"
        />
      )}
    </motion.path>
  );
};

export default ConnectionLine;