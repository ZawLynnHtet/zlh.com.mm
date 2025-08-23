import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExperimentDemo = ({ experiment, isOpen, onClose }) => {
  const [demoState, setDemoState] = useState('idle');
  const [interactionCount, setInteractionCount] = useState(0);
  const [performance, setPerformance] = useState({ fps: 60, memory: 45 });

  useEffect(() => {
    if (isOpen) {
      setDemoState('loading');
      const timer = setTimeout(() => setDemoState('ready'), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleInteraction = () => {
    setInteractionCount(prev => prev + 1);
    setPerformance({
      fps: Math.max(30, 60 - Math.random() * 10),
      memory: Math.min(80, 45 + Math.random() * 20)
    });
  };

  const renderDemoContent = () => {
    switch (experiment?.category) {
      case 'WebXR':
        return (
          <div className="relative h-64 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotateY: interactionCount * 45,
                  scale: 1 + (interactionCount % 3) * 0.1 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-2xl cursor-pointer"
                onClick={handleInteraction}
              />
            </div>
            <div className="absolute bottom-4 left-4 text-white/80 text-sm">
              Click the cube to interact in 3D space
            </div>
          </div>
        );
      
      case 'AI/ML':
        return (
          <div className="relative h-64 bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[...Array(9)]?.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      opacity: Math.random() > 0.5 ? 1 : 0.3,
                      scale: Math.random() > 0.7 ? 1.1 : 1 
                    }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded"
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleInteraction}
                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                iconName="Brain"
                iconPosition="left"
              >
                Run Neural Network
              </Button>
            </div>
          </div>
        );
      
      case 'WebGL':
        return (
          <div className="relative h-64 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(20)]?.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: Math.sin(Date.now() * 0.001 + i) * 100,
                    y: Math.cos(Date.now() * 0.001 + i) * 50,
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    left: `${(i % 5) * 20}%`,
                    top: `${Math.floor(i / 5) * 25}%`,
                  }}
                />
              ))}
            </div>
            <div className="absolute bottom-4 left-4 text-white/80 text-sm">
              WebGL particle system rendering
            </div>
          </div>
        );
      
      default:
        return (
          <div className="relative h-64 bg-gradient-to-br from-accent/20 to-brand-primary/20 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <Icon name="Code" size={48} className="text-accent mb-4 mx-auto" />
              <p className="text-muted-foreground">Interactive demo loading...</p>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl bg-card border border-border rounded-xl shadow-floating overflow-hidden"
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="font-headline font-semibold text-xl text-foreground">
                  {experiment?.title}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Interactive Demo - {experiment?.category}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Performance Metrics */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-muted-foreground">
                      {Math.round(performance?.fps)} FPS
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-muted-foreground">
                      {Math.round(performance?.memory)}MB
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  iconName="X"
                  className="text-muted-foreground hover:text-foreground"
                />
              </div>
            </div>
            
            {/* Demo Content */}
            <div className="p-6">
              {demoState === 'loading' ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="loading-shimmer w-16 h-16 rounded-lg mb-4 mx-auto"></div>
                    <p className="text-muted-foreground">Initializing experiment...</p>
                  </div>
                </div>
              ) : (
                renderDemoContent()
              )}
              
              {/* Controls */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInteractionCount(0)}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Reset
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Info"
                    iconPosition="left"
                  >
                    How it works
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="MousePointer" size={16} />
                  <span>Interactions: {interactionCount}</span>
                </div>
              </div>
            </div>
            
            {/* Technical Details */}
            <div className="px-6 pb-6">
              <div className="bg-muted/20 rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-2">Technical Implementation</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {experiment?.technicalDetails}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experiment?.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md border border-accent/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExperimentDemo;