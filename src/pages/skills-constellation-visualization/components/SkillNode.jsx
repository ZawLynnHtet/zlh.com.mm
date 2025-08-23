import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillNode = ({ 
  skill, 
  position, 
  isSelected, 
  onSelect, 
  onHover, 
  onLeave,
  scale = 1,
  connections = []
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const nodeRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(skill);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave?.();
  };

  const handleClick = () => {
    onSelect?.(skill);
  };

  const getNodeSize = () => {
    const baseSize = 40;
    const sizeMultiplier = skill?.proficiency / 100;
    return baseSize + (sizeMultiplier * 20);
  };

  const getGlowIntensity = () => {
    if (isSelected) return 'shadow-[0_0_30px_rgba(0,217,255,0.8)]';
    if (isHovered) return 'shadow-[0_0_20px_rgba(0,217,255,0.6)]';
    return 'shadow-[0_0_10px_rgba(0,217,255,0.3)]';
  };

  const getPulseAnimation = () => {
    if (skill?.isNew) {
      return {
        scale: [1, 1.1, 1],
        opacity: [0.8, 1, 0.8],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }
      };
    }
    return {};
  };

  return (
    <motion.div
      ref={nodeRef}
      className="absolute cursor-pointer select-none"
      style={{
        left: position?.x,
        top: position?.y,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: scale,
        ...getPulseAnimation()
      }}
      whileHover={{ scale: scale * 1.1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        duration: 0.3
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Skill Node */}
      <div
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-brand-primary/20 border-2 border-accent/40 backdrop-blur-sm transition-all duration-300 ${getGlowIntensity()}`}
        style={{
          width: getNodeSize(),
          height: getNodeSize(),
        }}
      >
        {/* Core Technology Icon */}
        <div className="relative z-10">
          {skill?.icon ? (
            <Icon 
              name={skill?.icon} 
              size={Math.max(16, getNodeSize() * 0.4)} 
              className="text-accent"
            />
          ) : (
            <div 
              className="rounded-full bg-accent/80"
              style={{
                width: Math.max(8, getNodeSize() * 0.2),
                height: Math.max(8, getNodeSize() * 0.2),
              }}
            />
          )}
        </div>

        {/* New Skill Indicator */}
        {skill?.isNew && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-conversion-accent rounded-full animate-pulse">
            <div className="absolute inset-0 bg-conversion-accent rounded-full animate-ping opacity-75"></div>
          </div>
        )}

        {/* Proficiency Ring */}
        <svg 
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(0,217,255,0.1)"
            strokeWidth="2"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(0,217,255,0.6)"
            strokeWidth="2"
            strokeDasharray={`${skill?.proficiency * 2.83} 283`}
            className="transition-all duration-500"
          />
        </svg>
      </div>
      {/* Skill Label */}
      <motion.div
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-card/90 backdrop-blur-sm border border-border/50 rounded-md text-xs font-mono text-foreground whitespace-nowrap"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isHovered || isSelected ? 1 : 0.8,
          y: 0,
          scale: isHovered || isSelected ? 1.05 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {skill?.name}
        <div className="text-[10px] text-muted-foreground text-center">
          {skill?.proficiency}%
        </div>
      </motion.div>
      {/* Hover Tooltip */}
      {isHovered && (
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-64 p-4 bg-popover/95 backdrop-blur-md border border-border/50 rounded-lg shadow-floating z-50"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-headline font-semibold text-sm text-foreground">
                {skill?.name}
              </h4>
              <div className="text-xs text-accent font-mono">
                {skill?.experience} years
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {skill?.description}
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Proficiency</span>
              <span className="text-accent font-mono">{skill?.proficiency}%</span>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Projects</span>
              <span className="text-foreground font-mono">{skill?.projectCount}</span>
            </div>

            {skill?.isNew && (
              <div className="flex items-center space-x-1 text-xs text-conversion-accent">
                <Icon name="Sparkles" size={12} />
                <span>Recently Added</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SkillNode;