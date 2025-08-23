import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import CircularText from "components/ui/Circletext";
import FloatingCodeFragments from "./components/FloatingCodeFragments";
import InteractiveParticleSystem from "./components/InteractiveParticleSystem";
import MorphingGeometry from "./components/MorphingGeometry";
import Navigation3D from "./components/Navigation3D";
import HeroMessage from "./components/HeroMessage";
import PerformanceIndicators from "./components/PerformanceIndicators";

const InteractiveHomepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    // Simulate loading time for 3D assets
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAudioToggle = () => {
    setAudioEnabled(!audioEnabled);
    // In a real implementation, this would control ambient soundtrack
    if (!audioEnabled) {
      console.log("Ambient soundtrack enabled");
    } else {
      console.log("Ambient soundtrack disabled");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="font-ui text-muted-foreground">
            Initializing My Portfolio...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header */}
      <Header />
      {/* Main 3D Environment */}
      <main className="relative min-h-screen">
        {/* Background Layers */}
        <div className="absolute inset-0">
          {/* Deep space background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10" />

          {/* Particle system */}
          <InteractiveParticleSystem />

          {/* Floating code fragments */}
          <FloatingCodeFragments />
        </div>

        {/* Content Layers */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Hero Section */}
          <section className="flex-1 flex items-center justify-center pt-16 pb-32">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Hero Message */}
                <div className="order-2 lg:order-1">
                  <HeroMessage />
                </div>

                {/* Right: Morphing Geometry */}
                <div className="order-1 lg:order-2 flex justify-center">
                  <MorphingGeometry />
                </div>
              </div>
            </div>
          </section>

          {/* Navigation Section */}
          <section className="py-20">
            <div className="container mx-auto px-6">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Explore My Digital Universe
                </h2>
                <p className="font-ui text-lg text-muted-foreground max-w-2xl mx-auto">
                  Navigate through interactive worlds showcasing projects,
                  skills, and innovations. Each dimension tells a unique story
                  of technical mastery and creative vision.
                </p>
              </motion.div>

              {/* 3D Navigation */}
              <div className="relative h-[600px] lg:h-[700px]">
                <Navigation3D />
              </div>
            </div>
          </section>

          {/* Experience Features */}
          <section className="py-60 bg-card/20 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <motion.div
                className="grid md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, staggerChildren: 0.2 }}
                viewport={{ once: true }}
              >
                {[
                  {
                    title: "Immersive 3D",
                    description:
                      "Experience portfolio content in three-dimensional space with WebGL-powered interactions",
                    icon: "🌌",
                  },
                  {
                    title: "Live Demonstrations",
                    description:
                      "Interact with real code, algorithms, and projects in an executable environment",
                    icon: "⚡",
                  },
                  {
                    title: "Performance Optimized",
                    description:
                      "Smooth 60fps animations with intelligent loading and responsive design",
                    icon: "🚀",
                  },
                ]?.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 rounded-xl bg-card/40 backdrop-blur-sm border border-border/30 hover:bg-card/60 transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-4xl mb-4">{feature?.icon}</div>
                    <h3 className="font-headline text-xl font-semibold text-foreground mb-3">
                      {feature?.title}
                    </h3>
                    <p className="font-ui text-muted-foreground">
                      {feature?.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </div>

        {/* Performance Indicators */}
        <PerformanceIndicators />

        {/* Audio Control */}
        <motion.button
          className="fixed bottom-6 left-6 z-50 transition-all duration-300"
          onClick={handleAudioToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <CircularText
          text="ZAW LYNN HTET * FULL-STACK DEVELOPER * "
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />
        </motion.button>

        {/* Ambient lighting effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-trust-builder/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/3 rounded-full blur-3xl" />
        </div>
      </main>
    </div>
  );
};

export default InteractiveHomepage;
