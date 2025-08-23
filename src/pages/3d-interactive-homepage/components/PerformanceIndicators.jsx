import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PerformanceIndicators = () => {
  const [metrics, setMetrics] = useState({
    fps: 60,
    webgl: true,
    loadTime: 0,
    memoryUsage: 0,
    renderTime: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate performance monitoring
    const startTime = performance.now();
    let frameCount = 0;
    let lastTime = startTime;

    const updateMetrics = () => {
      const currentTime = performance.now();
      frameCount++;
      
      // Calculate FPS
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        setMetrics(prev => ({
          ...prev,
          fps: Math.min(fps, 60),
          loadTime: Math.round(currentTime - startTime),
          memoryUsage: Math.round(Math.random() * 50 + 20), // Simulated
          renderTime: Math.round(Math.random() * 5 + 10) // Simulated
        }));
      }
      
      requestAnimationFrame(updateMetrics);
    };

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const webglSupported = !!(canvas?.getContext('webgl') || canvas?.getContext('experimental-webgl'));
    
    setMetrics(prev => ({
      ...prev,
      webgl: webglSupported
    }));

    updateMetrics();

    // Show indicators after a delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const performanceData = [
    {
      label: 'FPS',
      value: metrics?.fps,
      unit: '',
      icon: 'Zap',
      color: metrics?.fps >= 55 ? 'text-success' : metrics?.fps >= 30 ? 'text-warning' : 'text-error',
      bgColor: metrics?.fps >= 55 ? 'bg-success/10' : metrics?.fps >= 30 ? 'bg-warning/10' : 'bg-error/10'
    },
    {
      label: 'WebGL',
      value: metrics?.webgl ? 'ON' : 'OFF',
      unit: '',
      icon: 'Cpu',
      color: metrics?.webgl ? 'text-success' : 'text-error',
      bgColor: metrics?.webgl ? 'bg-success/10' : 'bg-error/10'
    },
    {
      label: 'Load',
      value: Math.round(metrics?.loadTime / 1000 * 10) / 10,
      unit: 's',
      icon: 'Clock',
      color: metrics?.loadTime < 3000 ? 'text-success' : metrics?.loadTime < 5000 ? 'text-warning' : 'text-error',
      bgColor: metrics?.loadTime < 3000 ? 'bg-success/10' : metrics?.loadTime < 5000 ? 'bg-warning/10' : 'bg-error/10'
    },
    {
      label: 'Memory',
      value: metrics?.memoryUsage,
      unit: 'MB',
      icon: 'HardDrive',
      color: metrics?.memoryUsage < 40 ? 'text-success' : metrics?.memoryUsage < 60 ? 'text-warning' : 'text-error',
      bgColor: metrics?.memoryUsage < 40 ? 'bg-success/10' : metrics?.memoryUsage < 60 ? 'bg-warning/10' : 'bg-error/10'
    }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-card/80 backdrop-blur-md border border-border/50 rounded-lg p-4 shadow-floating"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={16} className="text-accent" />
            <span className="font-mono text-xs font-semibold text-foreground">
              Performance
            </span>
          </div>
          <motion.div
            className="w-2 h-2 bg-success rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {performanceData?.map((metric, index) => (
            <motion.div
              key={metric?.label}
              className={`${metric?.bgColor} rounded-md p-3 border border-border/30`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-1">
                <Icon 
                  name={metric?.icon} 
                  size={14} 
                  className={metric?.color}
                />
                <span className="font-mono text-xs text-muted-foreground">
                  {metric?.label}
                </span>
              </div>
              <div className="flex items-baseline space-x-1">
                <motion.span 
                  className={`font-mono text-lg font-bold ${metric?.color}`}
                  key={metric?.value}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {metric?.value}
                </motion.span>
                {metric?.unit && (
                  <span className="font-mono text-xs text-muted-foreground">
                    {metric?.unit}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance bar */}
        <div className="mt-3 pt-3 border-t border-border/30">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-xs text-muted-foreground">
              Overall Performance
            </span>
            <span className="font-mono text-xs font-semibold text-success">
              Excellent
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-1.5">
            <motion.div
              className="bg-gradient-to-r from-success to-accent h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '92%' }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Technical specs */}
        <div className="mt-3 pt-3 border-t border-border/30">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              <span className="font-mono text-muted-foreground">React 18</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-trust-builder rounded-full"></div>
              <span className="font-mono text-muted-foreground">WebGL 2.0</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-conversion-accent rounded-full"></div>
              <span className="font-mono text-muted-foreground">60Hz</span>
            </div>
          </div>
        </div>

        {/* Optimization badge */}
        <motion.div
          className="mt-3 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="performance-indicator">
            <Icon name="Shield" size={12} className="mr-1" />
            Optimized Experience
          </div>
        </motion.div>
      </motion.div>
      {/* Mobile toggle button */}
      <motion.button
        className="lg:hidden absolute -top-2 -left-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-glow"
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsVisible(false)}
      >
        <Icon name="X" size={14} className="text-primary" />
      </motion.button>
    </motion.div>
  );
};

export default PerformanceIndicators;