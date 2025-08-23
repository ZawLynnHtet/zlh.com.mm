import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const MilestoneDetail = ({ milestone, isOpen, onClose }) => {
  if (!milestone) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border/50 rounded-2xl shadow-floating"
            variants={modalVariants}
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border/30 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 text-accent rounded-xl flex items-center justify-center">
                    <Icon name={milestone?.icon} size={24} />
                  </div>
                  <div>
                    <h2 className="font-headline font-semibold text-2xl text-foreground mb-1">
                      {milestone?.title}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-mono">{milestone?.date}</span>
                      {milestone?.location && (
                        <>
                          <span>•</span>
                          <span>{milestone?.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Story Section */}
              <div>
                <h3 className="font-headline font-semibold text-lg text-foreground mb-4">
                  The Story
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {milestone?.story}
                  </p>
                </div>
              </div>

              {/* Achievements */}
              {milestone?.achievements && milestone?.achievements?.length > 0 && (
                <div>
                  <h3 className="font-headline font-semibold text-lg text-foreground mb-4">
                    Key Achievements
                  </h3>
                  <div className="grid gap-3">
                    {milestone?.achievements?.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-6 h-6 bg-success/20 text-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon name="Check" size={14} />
                        </div>
                        <p className="text-sm text-foreground">{achievement}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills & Technologies */}
              {milestone?.skills && milestone?.skills?.length > 0 && (
                <div>
                  <h3 className="font-headline font-semibold text-lg text-foreground mb-4">
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {milestone?.skills?.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1.5 bg-accent/10 text-accent text-sm rounded-lg font-mono border border-accent/20"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges & Lessons */}
              {milestone?.challenges && (
                <div>
                  <h3 className="font-headline font-semibold text-lg text-foreground mb-4">
                    Challenges & Lessons Learned
                  </h3>
                  <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {milestone?.challenges}
                    </p>
                  </div>
                </div>
              )}

              {/* Impact Metrics */}
              {milestone?.metrics && milestone?.metrics?.length > 0 && (
                <div>
                  <h3 className="font-headline font-semibold text-lg text-foreground mb-4">
                    Impact & Results
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {milestone?.metrics?.map((metric, index) => (
                      <motion.div
                        key={index}
                        className="text-center p-4 bg-card/50 border border-border/30 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="text-2xl font-headline font-bold text-accent mb-1">
                          {metric?.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {metric?.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Links */}
              {milestone?.links && milestone?.links?.length > 0 && (
                <div>
                  <h3 className="font-headline font-semibold text-lg text-foreground mb-4">
                    Related Links
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {milestone?.links?.map((link, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="border-accent/30 text-accent hover:bg-accent/10"
                        iconName={link?.icon}
                        iconPosition="left"
                        iconSize={16}
                      >
                        {link?.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MilestoneDetail;