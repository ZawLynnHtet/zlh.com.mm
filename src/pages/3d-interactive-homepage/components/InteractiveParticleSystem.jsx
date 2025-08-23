import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveParticleSystem = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = window.innerWidth < 768 ? 50 : 100;
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef?.current?.push({
          x: Math.random() * canvas?.width,
          y: Math.random() * canvas?.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.5 ? '#00D9FF' : '#4ECDC4',
          connections: []
        });
      }
    };

    initParticles();

    // Mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas?.getBoundingClientRect();
      mouseRef.current = {
        x: e?.clientX - rect?.left,
        y: e?.clientY - rect?.top
      };
    };

    canvas?.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      
      const particles = particlesRef?.current;
      const mouse = mouseRef?.current;

      // Update and draw particles
      particles?.forEach((particle, i) => {
        // Mouse attraction
        const dx = mouse?.x - particle?.x;
        const dy = mouse?.y - particle?.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += dx * force * 0.0001;
          particle.vy += dy * force * 0.0001;
        }

        // Update position
        particle.x += particle?.vx;
        particle.y += particle?.vy;

        // Boundary collision
        if (particle?.x < 0 || particle?.x > canvas?.width) particle.vx *= -1;
        if (particle?.y < 0 || particle?.y > canvas?.height) particle.vy *= -1;

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas?.width, particle?.x));
        particle.y = Math.max(0, Math.min(canvas?.height, particle?.y));

        // Draw particle
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx.fillStyle = particle?.color + Math.floor(particle?.opacity * 255)?.toString(16)?.padStart(2, '0');
        ctx?.fill();

        // Draw connections
        particles?.slice(i + 1)?.forEach(otherParticle => {
          const dx = particle?.x - otherParticle?.x;
          const dy = particle?.y - otherParticle?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.3;
            ctx?.beginPath();
            ctx?.moveTo(particle?.x, particle?.y);
            ctx?.lineTo(otherParticle?.x, otherParticle?.y);
            ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx?.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas?.removeEventListener('mousemove', handleMouseMove);
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
    };
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-auto"
        style={{ background: 'transparent' }}
      />
      {/* Interactive zones */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-accent/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full border border-trust-builder/20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </motion.div>
  );
};

export default InteractiveParticleSystem;