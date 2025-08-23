import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Navigation3D = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: 'projects',
      title: 'Project Universe',
      subtitle: 'Explore Interactive Worlds',
      icon: 'Layers',
      route: '/project-universe-gallery',
      color: 'from-accent to-brand-primary',
      position: { x: -200, y: -100 },
      rotation: { x: 10, y: -15 }
    },
    {
      id: 'skills',
      title: 'Skills Constellation',
      subtitle: 'Technology Visualization',
      icon: 'Zap',
      route: '/skills-constellation-visualization',
      color: 'from-trust-builder to-accent',
      position: { x: 200, y: -100 },
      rotation: { x: 10, y: 15 }
    },
    {
      id: 'lab',
      title: 'Code Laboratory',
      subtitle: 'Live Demonstrations',
      icon: 'Code',
      route: '/code-laboratory-interactive-environment',
      color: 'from-conversion-accent to-cta-golden',
      position: { x: -200, y: 100 },
      rotation: { x: -10, y: -15 }
    },
    {
      id: 'collaboration',
      title: 'Collaboration Space',
      subtitle: 'Professional Journey',
      icon: 'Users',
      route: '/professional-story-journey',
      color: 'from-cta-golden to-trust-builder',
      position: { x: 200, y: 100 },
      rotation: { x: -10, y: 15 }
    }
  ];

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
      {/* Central hub */}
      <motion.div
        className="absolute w-4 h-4 bg-accent rounded-full shadow-glow z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Navigation items */}
      {navigationItems?.map((item, index) => (
        <motion.div
          key={item?.id}
          className="absolute cursor-pointer group"
          style={{
            transform: `translate(${item?.position?.x}px, ${item?.position?.y}px) rotateX(${item?.rotation?.x}deg) rotateY(${item?.rotation?.y}deg)`
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.2,
            duration: 0.8,
            ease: "easeOut"
          }}
          whileHover={{
            scale: 1.05,
            rotateX: item?.rotation?.x - 5,
            rotateY: item?.rotation?.y + (item?.position?.x > 0 ? -5 : 5),
            transition: { duration: 0.3 }
          }}
          onHoverStart={() => setHoveredItem(item?.id)}
          onHoverEnd={() => setHoveredItem(null)}
          onClick={() => handleNavigation(item?.route)}
        >
          <div className={`bg-gradient-to-br ${item?.color} p-6 rounded-xl backdrop-blur-sm border border-white/10 shadow-floating min-w-[280px] transform-gpu`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <Icon 
                  name={item?.icon} 
                  size={24} 
                  className="text-white"
                />
              </div>
              <motion.div
                className="w-2 h-2 bg-white/60 rounded-full"
                animate={{
                  scale: hoveredItem === item?.id ? [1, 1.5, 1] : 1,
                  opacity: hoveredItem === item?.id ? [0.6, 1, 0.6] : 0.6
                }}
                transition={{
                  duration: 1,
                  repeat: hoveredItem === item?.id ? Infinity : 0
                }}
              />
            </div>

            {/* Content */}
            <div className="text-white">
              <h3 className="font-headline text-lg font-semibold mb-2">
                {item?.title}
              </h3>
              <p className="font-ui text-sm text-white/80 mb-4">
                {item?.subtitle}
              </p>
              
              {/* Interactive elements */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {Array.from({ length: 3 })?.map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 h-1 bg-white/40 rounded-full"
                      animate={{
                        scale: hoveredItem === item?.id ? [1, 1.2, 1] : 1,
                        opacity: hoveredItem === item?.id ? [0.4, 0.8, 0.4] : 0.4
                      }}
                      transition={{
                        duration: 0.8,
                        delay: i * 0.1,
                        repeat: hoveredItem === item?.id ? Infinity : 0
                      }}
                    />
                  ))}
                </div>
                <motion.div
                  className="text-white/60"
                  animate={{
                    x: hoveredItem === item?.id ? 5 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon name="ArrowRight" size={16} />
                </motion.div>
              </div>
            </div>

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredItem === item?.id ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Connection line to center */}
          <svg
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              width: Math.abs(item?.position?.x) + 20,
              height: Math.abs(item?.position?.y) + 20,
              transform: `translate(${item?.position?.x > 0 ? '-100%' : '0'}, ${item?.position?.y > 0 ? '-100%' : '0'})`
            }}
          >
            <motion.line
              x1={item?.position?.x > 0 ? '100%' : '0'}
              y1={item?.position?.y > 0 ? '100%' : '0'}
              x2={item?.position?.x > 0 ? '0' : '100%'}
              y2={item?.position?.y > 0 ? '0' : '100%'}
              stroke="rgba(0, 217, 255, 0.3)"
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: index * 0.2 + 0.5,
                duration: 1,
                ease: "easeInOut"
              }}
            />
          </svg>
        </motion.div>
      ))}
      {/* Orbital rings */}
      <motion.div
        className="absolute w-96 h-96 border border-accent/20 rounded-full pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute w-80 h-80 border border-trust-builder/20 rounded-full pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-accent"/>
        </svg>
      </div>
    </div>
  );
};

export default Navigation3D;