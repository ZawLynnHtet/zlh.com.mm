import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ExperimentCard = ({ experiment, onDemo, onViewCode, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const statusColors = {
    active: 'bg-success/20 text-success border-success/30',
    experimental: 'bg-warning/20 text-warning border-warning/30',
    concept: 'bg-accent/20 text-accent border-accent/30',
    archived: 'bg-muted/20 text-muted-foreground border-muted/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-card/60 backdrop-blur-md border border-border/30 rounded-xl overflow-hidden transition-all duration-medium ease-natural hover:bg-card/80 hover:border-accent/30 hover:shadow-floating">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-medium"></div>
        
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={experiment?.image}
            alt={experiment?.title}
            className="w-full h-full object-cover transition-transform duration-medium group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          
          {/* Status Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono border ${statusColors?.[experiment?.status]}`}>
            {experiment?.status?.toUpperCase()}
          </div>
          
          {/* Technology Tags */}
          <div className="absolute top-4 right-4 flex flex-wrap gap-1">
            {experiment?.technologies?.slice(0, 3)?.map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-background/80 backdrop-blur-sm text-xs text-foreground rounded-md border border-border/50"
              >
                {tech}
              </span>
            ))}
            {experiment?.technologies?.length > 3 && (
              <span className="px-2 py-1 bg-background/80 backdrop-blur-sm text-xs text-muted-foreground rounded-md border border-border/50">
                +{experiment?.technologies?.length - 3}
              </span>
            )}
          </div>
          
          {/* Interactive Demo Button */}
          {isHovered && experiment?.hasDemo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Button
                variant="default"
                size="sm"
                onClick={() => onDemo(experiment)}
                className="bg-accent/90 hover:bg-accent text-primary shadow-glow"
                iconName="Play"
                iconPosition="left"
                iconSize={16}
              >
                Try Demo
              </Button>
            </motion.div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-headline font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-fast">
              {experiment?.title}
            </h3>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span className="text-xs">{experiment?.date}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {experiment?.description}
          </p>
          
          {/* Innovation Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/20 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-semibold text-accent">{experiment?.complexity}</div>
              <div className="text-xs text-muted-foreground">Complexity</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-success">{experiment?.performance}</div>
              <div className="text-xs text-muted-foreground">Performance</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-warning">{experiment?.innovation}</div>
              <div className="text-xs text-muted-foreground">Innovation</div>
            </div>
          </div>
          
          {/* Key Features */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Key Innovations:</h4>
            <div className="flex flex-wrap gap-1">
              {experiment?.features?.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md border border-accent/20"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {experiment?.hasDemo && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDemo(experiment)}
                  className="border-accent/30 text-accent hover:bg-accent/10"
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={14}
                >
                  Demo
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewCode(experiment)}
                className="text-muted-foreground hover:text-foreground"
                iconName="Code"
                iconPosition="left"
                iconSize={14}
              >
                Code
              </Button>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} />
                <span className="text-xs">{experiment?.stars}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="GitFork" size={14} />
                <span className="text-xs">{experiment?.forks}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperimentCard;