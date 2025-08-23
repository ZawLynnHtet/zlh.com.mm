import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onExplore, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef?.current) return;
    
    const rect = cardRef?.current?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const y = e?.clientY - rect?.top;
    const centerX = rect?.width / 2;
    const centerY = rect?.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef?.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onExplore(project)}
    >
      {/* Floating Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-brand-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      {/* Main Card */}
      <div className="relative bg-card/80 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-accent/50">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project?.image}
            alt={project?.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full text-xs font-medium text-accent">
              {project?.category}
            </span>
          </div>
          
          {/* Status Indicators */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {project?.isLive && (
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            )}
            {project?.isNew && (
              <span className="px-2 py-1 bg-warning/20 border border-warning/30 rounded text-xs text-warning font-medium">
                New
              </span>
            )}
          </div>
          
          {/* Floating Tech Icons */}
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {project?.technologies?.slice(0, 3)?.map((tech, idx) => (
              <div
                key={tech}
                className="w-8 h-8 bg-background/60 backdrop-blur-sm border border-border/30 rounded-lg flex items-center justify-center"
                style={{ transform: `translateY(${idx * -2}px)` }}
              >
                <Icon name={tech?.icon} size={16} className="text-foreground" />
              </div>
            ))}
            {project?.technologies?.length > 3 && (
              <div className="w-8 h-8 bg-background/60 backdrop-blur-sm border border-border/30 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                +{project?.technologies?.length - 3}
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-headline font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-300">
              {project?.title}
            </h3>
            <Icon 
              name="ExternalLink" 
              size={16} 
              className="text-muted-foreground group-hover:text-accent transition-colors duration-300 opacity-0 group-hover:opacity-100" 
            />
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project?.description}
          </p>
          
          {/* Metrics */}
          <div className="flex items-center space-x-4 mb-4">
            {project?.metrics?.map((metric, idx) => (
              <div key={idx} className="flex items-center space-x-1">
                <Icon name={metric?.icon} size={14} className="text-accent" />
                <span className="text-xs text-foreground font-medium">{metric?.value}</span>
                <span className="text-xs text-muted-foreground">{metric?.label}</span>
              </div>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-accent/30 text-accent hover:bg-accent/10"
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
            >
              Preview
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1 bg-gradient-to-r from-accent to-brand-primary text-primary"
              iconName="Zap"
              iconPosition="left"
              iconSize={14}
            >
              Explore
            </Button>
          </div>
        </div>
        
        {/* Hover Particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)]?.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-accent rounded-full"
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: Math.random() * 100 + '%',
                  opacity: 0 
                }}
                animate={{ 
                  y: '-20px',
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;