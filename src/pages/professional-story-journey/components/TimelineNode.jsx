import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';


const TimelineNode = ({ 
  milestone, 
  index, 
  isActive, 
  onClick, 
  position = 'left' 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const nodeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: position === 'left' ? -50 : 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const glowVariants = {
    inactive: { opacity: 0 },
    active: { 
      opacity: 1,
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`relative flex items-center ${
        position === 'left' ? 'justify-end pr-8' : 'justify-start pl-8'
      } w-full`}
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Line Connection */}
      <div className={`absolute ${
        position === 'left' ? 'right-4' : 'left-4'
      } top-1/2 w-8 h-0.5 bg-gradient-to-r from-accent/30 to-accent/60`} />
      {/* Milestone Card */}
      <motion.div
        className={`relative max-w-md cursor-pointer ${
          position === 'left' ? 'text-right' : 'text-left'
        }`}
        onClick={() => onClick(milestone)}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/20 to-brand-primary/20 rounded-xl blur-lg"
          variants={glowVariants}
          animate={isActive ? 'active' : 'inactive'}
        />

        {/* Card Content */}
        <div className={`relative bg-card/80 backdrop-blur-md border rounded-xl p-6 transition-all duration-300 ${
          isActive 
            ? 'border-accent/50 shadow-glow' 
            : 'border-border/30 hover:border-accent/30'
        }`}>
          {/* Icon & Date */}
          <div className={`flex items-center gap-3 mb-3 ${
            position === 'left' ? 'justify-end' : 'justify-start'
          }`}>
            <div className={`flex items-center gap-2 ${
              position === 'left' ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isActive 
                  ? 'bg-accent/20 text-accent' :'bg-muted/50 text-muted-foreground'
              }`}>
                <Icon name={milestone?.icon} size={20} />
              </div>
              <span className="text-sm font-mono text-muted-foreground">
                {milestone?.date}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className={`font-headline font-semibold text-lg mb-2 ${
            isActive ? 'text-accent' : 'text-foreground'
          }`}>
            {milestone?.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            {milestone?.description}
          </p>

          {/* Skills/Technologies */}
          {milestone?.skills && (
            <div className={`flex flex-wrap gap-2 ${
              position === 'left' ? 'justify-end' : 'justify-start'
            }`}>
              {milestone?.skills?.slice(0, 3)?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-mono"
                >
                  {skill}
                </span>
              ))}
              {milestone?.skills?.length > 3 && (
                <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-md">
                  +{milestone?.skills?.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Hover Indicator */}
          {isHovered && (
            <motion.div
              className={`absolute ${
                position === 'left' ? 'left-0' : 'right-0'
              } top-1/2 transform -translate-y-1/2 ${
                position === 'left' ? '-translate-x-2' : 'translate-x-2'
              }`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            </motion.div>
          )}
        </div>
      </motion.div>
      {/* Timeline Node */}
      <motion.div
        className={`absolute ${
          position === 'left' ? 'right-0' : 'left-0'
        } top-1/2 transform -translate-y-1/2 z-10`}
      >
        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
          isActive
            ? 'bg-accent border-accent shadow-glow'
            : 'bg-background border-accent/30 hover:border-accent/50'
        }`}>
          {isActive && (
            <motion.div
              className="w-2 h-2 bg-accent rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineNode;