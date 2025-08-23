import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SkillNode from './SkillNode';
import ConnectionLine from './ConnectionLine';

const ConstellationView = ({ 
  skills, 
  selectedSkill, 
  onSkillSelect, 
  onSkillHover, 
  onSkillLeave,
  viewMode = 'constellation'
}) => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isRotating, setIsRotating] = useState(true);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef?.current) {
        const { width, height } = containerRef?.current?.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (isRotating && viewMode === 'constellation') {
      const animate = () => {
        setRotation(prev => ({
          x: prev?.x + 0.2,
          y: prev?.y + 0.1
        }));
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, [isRotating, viewMode]);

  const calculateNodePosition = (skill, index, total) => {
    const centerX = dimensions?.width / 2;
    const centerY = dimensions?.height / 2;

    if (viewMode === 'grid') {
      const cols = Math.ceil(Math.sqrt(total));
      const row = Math.floor(index / cols);
      const col = index % cols;
      const spacing = Math.min(dimensions?.width / (cols + 1), 120);
      
      return {
        x: (col + 1) * spacing,
        y: (row + 1) * spacing + 100
      };
    }

    if (viewMode === 'tree') {
      const levels = 4;
      const level = Math.floor(index / (total / levels));
      const posInLevel = index % Math.ceil(total / levels);
      const levelWidth = dimensions?.width * 0.8;
      
      return {
        x: centerX + (posInLevel - Math.ceil(total / levels) / 2) * (levelWidth / Math.ceil(total / levels)),
        y: 150 + level * 120
      };
    }

    // Constellation view - 3D sphere projection
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi + rotation?.y * 0.01;
    
    const radius = Math.min(dimensions?.width, dimensions?.height) * 0.3;
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);
    
    // Apply rotation
    const rotX = rotation?.x * 0.01;
    const rotY = rotation?.y * 0.01;
    
    const finalX = x * Math.cos(rotY) - z * Math.sin(rotY);
    const finalZ = x * Math.sin(rotY) + z * Math.cos(rotY);
    const finalY = y * Math.cos(rotX) - finalZ * Math.sin(rotX);
    
    // Project to 2D with perspective
    const perspective = 1000;
    const scale = perspective / (perspective + finalZ);
    
    return {
      x: centerX + finalX * scale,
      y: centerY + finalY * scale,
      scale: Math.max(0.5, scale)
    };
  };

  const getConnections = () => {
    const connections = [];
    
    skills?.forEach((skill, index) => {
      skill?.connections?.forEach(connectionId => {
        const targetIndex = skills?.findIndex(s => s?.id === connectionId);
        if (targetIndex !== -1 && targetIndex > index) {
          const fromPos = calculateNodePosition(skill, index, skills?.length);
          const toPos = calculateNodePosition(skills?.[targetIndex], targetIndex, skills?.length);
          
          connections?.push({
            from: fromPos,
            to: toPos,
            strength: Math.random() * 0.8 + 0.2,
            isActive: selectedSkill && (selectedSkill?.id === skill?.id || selectedSkill?.id === connectionId)
          });
        }
      });
    });
    
    return connections;
  };

  const handleMouseMove = (e) => {
    if (!isRotating && viewMode === 'constellation') {
      const rect = containerRef?.current?.getBoundingClientRect();
      const x = (e?.clientX - rect?.left - rect?.width / 2) / rect?.width;
      const y = (e?.clientY - rect?.top - rect?.height / 2) / rect?.height;
      
      setRotation({
        x: y * 50,
        y: x * 50
      });
    }
  };

  const connections = getConnections();

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-background via-background/95 to-card/20 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsRotating(false)}
      onMouseLeave={() => setIsRotating(true)}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0,217,255,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Connection Lines */}
      {viewMode === 'constellation' && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections?.map((connection, index) => (
            <ConnectionLine
              key={index}
              from={connection?.from}
              to={connection?.to}
              strength={connection?.strength}
              isActive={connection?.isActive}
              animationDelay={index * 0.1}
            />
          ))}
        </svg>
      )}
      {/* Skill Nodes */}
      <div className="relative w-full h-full">
        {skills?.map((skill, index) => {
          const position = calculateNodePosition(skill, index, skills?.length);
          return (
            <SkillNode
              key={skill?.id}
              skill={skill}
              position={position}
              scale={position?.scale || 1}
              isSelected={selectedSkill?.id === skill?.id}
              onSelect={onSkillSelect}
              onHover={onSkillHover}
              onLeave={onSkillLeave}
              connections={skill?.connections}
            />
          );
        })}
      </div>
      {/* View Mode Controls */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <motion.button
          onClick={() => setIsRotating(!isRotating)}
          className={`p-2 rounded-lg backdrop-blur-sm border transition-all ${
            isRotating 
              ? 'bg-accent/20 border-accent/40 text-accent' :'bg-card/50 border-border/30 text-muted-foreground hover:text-foreground'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isRotating ? 360 : 0 }}
            transition={{ duration: 2, repeat: isRotating ? Infinity : 0, ease: "linear" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
              <path d="M3 21v-5h5"/>
            </svg>
          </motion.div>
        </motion.button>
      </div>
      {/* Skills Count */}
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border/30 rounded-lg px-3 py-2">
        <div className="text-sm text-muted-foreground">
          <span className="text-accent font-mono">{skills?.length}</span> skills displayed
        </div>
      </div>
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm border border-border/30 rounded-lg p-3 space-y-2">
        <div className="text-xs font-medium text-foreground mb-2">Legend</div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <div className="w-3 h-3 bg-accent/40 rounded-full"></div>
          <span>Core Skills</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-conversion-accent rounded-full"></div>
          <span>New Skills</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <div className="w-4 h-0.5 bg-accent/40"></div>
          <span>Connections</span>
        </div>
      </div>
    </div>
  );
};

export default ConstellationView;