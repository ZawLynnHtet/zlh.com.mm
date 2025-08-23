import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CulturalBackground = () => {
  const culturalElements = [
    {
      title: "Myanmar Heritage",
      description: `Born and raised in Myanmar, I bring a unique perspective shaped by a rich cultural heritage that values community, respect, and continuous learning. This background has instilled in me a deep appreciation for collaboration and the importance of building meaningful relationships in professional settings.`,
      icon: "Globe",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      values: ["Community Focus", "Respect for Mentorship", "Continuous Learning", "Collaborative Spirit"]
    },
    {
      title: "Global Perspective",
      description: `Working with international clients and teams has broadened my worldview and enhanced my ability to communicate across cultures. I understand the nuances of working in diverse environments and the importance of cultural sensitivity in global software development.`,
      icon: "Users",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      values: ["Cross-Cultural Communication", "Global Mindset", "Adaptability", "Inclusive Design"]
    },
    {
      title: "Language Bridge",
      description: `Fluent in both Myanmar and English, I serve as a bridge between local and international development communities. This linguistic ability has enabled me to mentor local developers while collaborating effectively with global teams.`,
      icon: "MessageCircle",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      values: ["Multilingual Communication", "Cultural Translation", "Community Building", "Knowledge Sharing"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
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

  return (
    <div className="bg-card/30 backdrop-blur-md border border-border/20 rounded-2xl p-8">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-headline font-semibold text-3xl text-foreground mb-4">
            Cultural Foundation
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            My cultural background and global experiences shape my approach to software development, 
            bringing unique perspectives to problem-solving and team collaboration.
          </p>
        </motion.div>
      </div>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {culturalElements?.map((element, index) => (
          <motion.div
            key={element?.title}
            className="group perspective-1000"
            variants={cardVariants}
          >
            <div className="relative bg-card/60 backdrop-blur-md border border-border/30 rounded-xl overflow-hidden h-full transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-glow">
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={element?.image}
                  alt={element?.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                
                {/* Icon Overlay */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-accent/20 backdrop-blur-md text-accent rounded-full flex items-center justify-center">
                  <Icon name={element?.icon} size={24} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="font-headline font-semibold text-xl text-foreground mb-3">
                  {element?.title}
                </h4>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {element?.description}
                </p>

                {/* Values */}
                <div>
                  <h5 className="font-medium text-foreground mb-3 text-sm">Core Values:</h5>
                  <div className="space-y-2">
                    {element?.values?.map((value, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                        <span className="text-xs text-muted-foreground">{value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* Personal Philosophy */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto p-6 bg-accent/5 border border-accent/20 rounded-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Heart" size={20} className="text-accent" />
            <h4 className="font-headline font-semibold text-lg text-foreground">
              Personal Philosophy
            </h4>
          </div>
          <blockquote className="text-muted-foreground italic leading-relaxed">
            "Technology should bridge cultures, not divide them. My goal is to create digital experiences 
            that are accessible and meaningful to people from all backgrounds, while fostering collaboration 
            and understanding in our global development community."
          </blockquote>
          <div className="mt-4 text-sm text-accent font-medium">
            — Zaw Lynn Htet
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CulturalBackground;