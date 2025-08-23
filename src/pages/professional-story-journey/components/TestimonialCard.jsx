import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialCard = ({ testimonial, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      rotateX: 5,
      transition: { duration: 0.3 }
    }
  };

  const getRoleIcon = (role) => {
    const roleMap = {
      'CTO': 'Crown',
      'CEO': 'Briefcase',
      'Lead Developer': 'Code',
      'Project Manager': 'Calendar',
      'Designer': 'Palette',
      'Client': 'User',
      'Colleague': 'Users',
      'Mentor': 'GraduationCap'
    };
    return roleMap?.[role] || 'User';
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name={i < rating ? 'Star' : 'Star'}
        size={14}
        className={i < rating ? 'text-cta-golden fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const truncateText = (text, maxLength = 150) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      className="group perspective-1000"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6 h-full transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-glow">
        {/* Quote Icon */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-accent/10 text-accent rounded-full flex items-center justify-center opacity-50">
          <Icon name="Quote" size={16} />
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <Image
              src={testimonial?.avatar}
              alt={testimonial?.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center">
              <Icon name={getRoleIcon(testimonial?.role)} size={12} />
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{testimonial?.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial?.role}</p>
            <p className="text-xs text-muted-foreground">{testimonial?.company}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {getRatingStars(testimonial?.rating)}
          <span className="text-xs text-muted-foreground ml-2">
            {testimonial?.rating}/5
          </span>
        </div>

        {/* Testimonial Text */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            "{isExpanded ? testimonial?.content : truncateText(testimonial?.content)}"
          </p>
          
          {testimonial?.content?.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-accent hover:text-accent/80 mt-2 font-medium"
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Project Context */}
        {testimonial?.project && (
          <div className="mb-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="Folder" size={14} className="text-accent" />
              <span className="text-xs font-medium text-accent">Project Context</span>
            </div>
            <p className="text-xs text-muted-foreground">{testimonial?.project}</p>
          </div>
        )}

        {/* Skills Mentioned */}
        {testimonial?.skillsHighlighted && testimonial?.skillsHighlighted?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Skills Highlighted:</p>
            <div className="flex flex-wrap gap-1">
              {testimonial?.skillsHighlighted?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-mono"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{testimonial?.date}</span>
          <div className="flex items-center gap-1">
            <Icon name="MapPin" size={12} />
            <span>{testimonial?.location}</span>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-brand-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;