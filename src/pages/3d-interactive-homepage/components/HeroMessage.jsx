import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeroMessage = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const phrases = [
    {
      main: "Code that creates",
      highlight: "experiences",
      sub: "not just functions"
    },
    {
      main: "Where technical",
      highlight: "excellence",
      sub: "meets creative vision"
    },
    {
      main: "Building the future of",
      highlight: "web interaction",
      sub: "one pixel at a time"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases?.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [phrases?.length]);

  const currentPhraseData = phrases?.[currentPhrase];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const highlightVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  return (
    <div className="text-center relative z-10 max-w-4xl mx-auto px-6">
      {/* Main message */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="mb-8"
      >
        {/* Main text */}
        <div className="mb-4">
          <motion.h1 
            variants={wordVariants}
            className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-2 leading-tight"
          >
            {currentPhraseData?.main}
          </motion.h1>
          
          {/* Highlighted word */}
          <motion.div
            variants={highlightVariants}
            className="relative inline-block"
          >
            <span className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-accent via-brand-primary to-trust-builder bg-clip-text text-transparent">
              {currentPhraseData?.highlight}
            </span>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent via-brand-primary to-trust-builder opacity-20 blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p 
          variants={wordVariants}
          className="font-ui text-xl md:text-2xl text-muted-foreground"
        >
          {currentPhraseData?.sub}
        </motion.p>
      </motion.div>
      {/* Developer introduction */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mb-12"
      >
        {/* <div className="flex items-center justify-center space-x-4 mb-6">
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-accent to-brand-primary rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-headline text-xl font-bold text-primary">ZL</span>
          </motion.div>
          <div className="text-left">
            <h2 className="font-headline text-2xl font-semibold text-foreground">
              Zaw Lynn Htet
            </h2>
            <p className="font-ui text-muted-foreground">
              Full-Stack Developer & Digital Craftsman
            </p>
          </div>
        </div> */}

        <motion.p 
          className="font-ui text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          Transforming complex ideas into elegant digital solutions through innovative web technologies, 
          immersive user experiences, and clean, maintainable code.
        </motion.p>
      </motion.div>
      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
      >
        <motion.button
          className="px-8 py-4 bg-gradient-to-r from-accent to-brand-primary text-primary font-cta font-semibold rounded-lg shadow-glow hover:shadow-floating transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/project-universe-gallery'}
        >
          Explore My Universe
        </motion.button>
        
        <motion.button
          className="px-8 py-4 border border-accent/30 text-accent font-cta font-semibold rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/professional-story-journey'}
        >
          My Story
        </motion.button>
      </motion.div>
      {/* Scroll indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-accent rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <p className="font-ui text-xs text-muted-foreground mt-2">
          Scroll to explore
        </p>
      </motion.div> */}
      {/* Background text effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <motion.div
          className="absolute top-1/4 left-0 font-mono text-6xl text-accent"
          animate={{
            x: [-500, 500],
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {'</>'}
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 right-0 font-mono text-4xl text-trust-builder"
          animate={{
            x: [500, -500],
            rotate: [360, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {'{ }'}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroMessage;