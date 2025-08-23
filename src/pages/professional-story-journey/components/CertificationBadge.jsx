import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CertificationBadge = ({ certification, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -90
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 10,
      transition: { duration: 0.3 }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success border-success/30 bg-success/10';
      case 'in-progress':
        return 'text-warning border-warning/30 bg-warning/10';
      case 'expired':
        return 'text-muted-foreground border-muted-foreground/30 bg-muted/10';
      default:
        return 'text-accent border-accent/30 bg-accent/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'expired':
        return 'AlertCircle';
      default:
        return 'Award';
    }
  };

  return (
    <motion.div
      className="group perspective-1000"
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Glow Effect */}
        {certification?.featured && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-accent/20 to-brand-primary/20 rounded-xl blur-lg"
            variants={glowVariants}
            animate={isHovered ? 'visible' : 'hidden'}
          />
        )}

        {/* Badge Card */}
        <div className={`relative bg-card/60 backdrop-blur-md border rounded-xl p-6 h-full transition-all duration-300 ${
          certification?.featured 
            ? 'border-accent/50 shadow-glow' 
            : 'border-border/30 group-hover:border-accent/30'
        }`}>
          {/* Featured Badge */}
          {certification?.featured && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-primary rounded-full flex items-center justify-center">
              <Icon name="Star" size={14} className="fill-current" />
            </div>
          )}

          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center overflow-hidden">
                {certification?.logo ? (
                  <Image
                    src={certification?.logo}
                    alt={certification?.issuer}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <Icon name="Award" size={24} className="text-accent" />
                )}
              </div>
              
              {/* Status Indicator */}
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                getStatusColor(certification?.status)
              }`}>
                <Icon name={getStatusIcon(certification?.status)} size={12} />
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-foreground text-sm leading-tight mb-1">
                {certification?.name}
              </h4>
              <p className="text-xs text-muted-foreground">{certification?.issuer}</p>
              <p className="text-xs text-muted-foreground">{certification?.date}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed mb-4">
            {certification?.description}
          </p>

          {/* Skills Covered */}
          {certification?.skills && certification?.skills?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Skills Covered:</p>
              <div className="flex flex-wrap gap-1">
                {certification?.skills?.slice(0, 3)?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-mono"
                  >
                    {skill}
                  </span>
                ))}
                {certification?.skills?.length > 3 && (
                  <span className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-md">
                    +{certification?.skills?.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Validity */}
          {certification?.validUntil && (
            <div className="mb-4 p-2 bg-warning/5 border border-warning/20 rounded-md">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={12} className="text-warning" />
                <span className="text-xs text-warning">
                  Valid until {certification?.validUntil}
                </span>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {certification?.credentialId && (
                <span className="text-xs text-muted-foreground font-mono">
                  ID: {certification?.credentialId?.slice(0, 8)}...
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {certification?.verifyUrl && (
                <button className="text-xs text-accent hover:text-accent/80 font-medium">
                  Verify
                </button>
              )}
              {certification?.certificateUrl && (
                <button className="text-xs text-accent hover:text-accent/80 font-medium">
                  View
                </button>
              )}
            </div>
          </div>

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-brand-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationBadge;