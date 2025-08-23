import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillsProgression = () => {
  const [selectedCategory, setSelectedCategory] = useState('frontend');

  const skillCategories = {
    frontend: {
      name: 'Frontend Development',
      icon: 'Monitor',
      color: 'accent',
      skills: [
        { name: 'React', level: 95, years: 4, icon: 'Code' },
        { name: 'JavaScript', level: 92, years: 5, icon: 'Zap' },
        { name: 'TypeScript', level: 88, years: 3, icon: 'FileCode' },
        { name: 'Three.js', level: 85, years: 2, icon: 'Box' },
        { name: 'CSS/SCSS', level: 90, years: 5, icon: 'Palette' },
        { name: 'HTML5', level: 95, years: 6, icon: 'Code2' }
      ]
    },
    backend: {
      name: 'Backend Development',
      icon: 'Server',
      color: 'brand-primary',
      skills: [
        { name: 'Node.js', level: 85, years: 3, icon: 'Cpu' },
        { name: 'Express.js', level: 82, years: 3, icon: 'Zap' },
        { name: 'MongoDB', level: 78, years: 2, icon: 'Database' },
        { name: 'PostgreSQL', level: 75, years: 2, icon: 'HardDrive' },
        { name: 'REST APIs', level: 88, years: 4, icon: 'Globe' },
        { name: 'GraphQL', level: 70, years: 1, icon: 'Network' }
      ]
    },
    tools: {
      name: 'Tools & Technologies',
      icon: 'Wrench',
      color: 'success',
      skills: [
        { name: 'Git/GitHub', level: 90, years: 5, icon: 'GitBranch' },
        { name: 'Docker', level: 75, years: 2, icon: 'Package' },
        { name: 'AWS', level: 70, years: 2, icon: 'Cloud' },
        { name: 'Webpack', level: 80, years: 3, icon: 'Settings' },
        { name: 'Jest/Testing', level: 85, years: 3, icon: 'CheckCircle' },
        { name: 'Figma', level: 78, years: 3, icon: 'Layers' }
      ]
    },
    soft: {
      name: 'Soft Skills',
      icon: 'Users',
      color: 'conversion-accent',
      skills: [
        { name: 'Problem Solving', level: 95, years: 6, icon: 'Lightbulb' },
        { name: 'Team Leadership', level: 85, years: 3, icon: 'Crown' },
        { name: 'Communication', level: 88, years: 5, icon: 'MessageCircle' },
        { name: 'Mentoring', level: 82, years: 2, icon: 'GraduationCap' },
        { name: 'Project Management', level: 80, years: 3, icon: 'Calendar' },
        { name: 'Client Relations', level: 85, years: 4, icon: 'Handshake' }
      ]
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.2
      }
    })
  };

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border/30 rounded-2xl p-8">
      <div className="mb-8">
        <h3 className="font-headline font-semibold text-2xl text-foreground mb-2">
          Skills Progression
        </h3>
        <p className="text-muted-foreground">
          Evolution of technical and professional capabilities over time
        </p>
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Object.entries(skillCategories)?.map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
              selectedCategory === key
                ? 'bg-accent/20 text-accent border border-accent/30' :'bg-muted/20 text-muted-foreground hover:bg-muted/30 hover:text-foreground border border-transparent'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.name}</span>
          </button>
        ))}
      </div>
      {/* Skills List */}
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={selectedCategory}
      >
        {skillCategories?.[selectedCategory]?.skills?.map((skill, index) => (
          <motion.div
            key={skill?.name}
            className="group"
            variants={skillVariants}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/10 text-accent rounded-lg flex items-center justify-center">
                  <Icon name={skill?.icon} size={16} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{skill?.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {skill?.years} year{skill?.years !== 1 ? 's' : ''} experience
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm text-accent font-medium">
                  {skill?.level}%
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-brand-primary rounded-full"
                variants={progressVariants}
                custom={skill?.level}
                initial="hidden"
                animate="visible"
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent/50 to-brand-primary/50 rounded-full blur-sm"
                variants={progressVariants}
                custom={skill?.level}
                initial="hidden"
                animate="visible"
              />
            </div>

            {/* Skill Level Indicator */}
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
              <span>Expert</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {/* Category Summary */}
      <div className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-center gap-3 mb-2">
          <Icon name={skillCategories?.[selectedCategory]?.icon} size={20} className="text-accent" />
          <h4 className="font-medium text-foreground">
            {skillCategories?.[selectedCategory]?.name} Summary
          </h4>
        </div>
        <p className="text-sm text-muted-foreground">
          {selectedCategory === 'frontend' && 
            `Specialized in modern React development with extensive experience in creating interactive 3D web experiences. Strong foundation in JavaScript ecosystem with focus on performance optimization and user experience.`
          }
          {selectedCategory === 'backend' && 
            `Solid backend development skills with Node.js and database management. Experience in building scalable APIs and integrating with various third-party services for full-stack applications.`
          }
          {selectedCategory === 'tools' && 
            `Proficient with modern development tools and workflows. Strong emphasis on version control, testing, and deployment automation to ensure code quality and reliability.`
          }
          {selectedCategory === 'soft' && 
            `Strong interpersonal and leadership skills developed through team collaboration and client interactions. Focus on mentoring junior developers and effective project communication.`
          }
        </p>
      </div>
    </div>
  );
};

export default SkillsProgression;