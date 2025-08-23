import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'demo', label: 'Live Demo', icon: 'Monitor' },
    { id: 'code', label: 'Code Deep Dive', icon: 'Code' },
    { id: 'challenges', label: 'Technical Challenges', icon: 'Zap' },
    { id: 'testimonials', label: 'Testimonials', icon: 'MessageSquare' }
  ];

  const handleDemoLoad = () => {
    setIsLoading(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <Image
                src={project?.image}
                alt={project?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-headline font-semibold text-foreground mb-3">Project Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="text-foreground">{project?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Size:</span>
                    <span className="text-foreground">{project?.teamSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role:</span>
                    <span className="text-foreground">{project?.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`${project?.isLive ? 'text-success' : 'text-warning'}`}>
                      {project?.isLive ? 'Live' : 'In Development'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-headline font-semibold text-foreground mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project?.technologies?.map((tech) => (
                    <div
                      key={tech?.name}
                      className="flex items-center space-x-2 px-3 py-2 bg-card border border-border/30 rounded-lg"
                    >
                      <Icon name={tech?.icon} size={16} className="text-accent" />
                      <span className="text-sm text-foreground">{tech?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-headline font-semibold text-foreground mb-3">Key Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project?.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-success mt-1" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'demo':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-headline font-semibold text-foreground">Live Application Demo</h4>
              <Button
                variant="outline"
                size="sm"
                iconName="ExternalLink"
                iconPosition="left"
                onClick={() => window.open(project?.liveUrl, '_blank')}
              >
                Open in New Tab
              </Button>
            </div>
            <div className="relative bg-card border border-border/30 rounded-xl overflow-hidden" style={{ height: '500px' }}>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-muted-foreground">Loading demo...</span>
                  </div>
                </div>
              )}
              <iframe
                src={project?.liveUrl}
                className="w-full h-full"
                title={`${project?.title} Demo`}
                onLoad={handleDemoLoad}
                loading="lazy"
              />
            </div>
          </div>
        );
        
      case 'code':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-headline font-semibold text-foreground">Code Architecture</h4>
              <Button
                variant="outline"
                size="sm"
                iconName="Github"
                iconPosition="left"
                onClick={() => window.open(project?.githubUrl, '_blank')}
              >
                View on GitHub
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-foreground mb-3">Project Structure</h5>
                <div className="bg-card border border-border/30 rounded-lg p-4 font-mono text-sm">
                  <pre className="text-muted-foreground whitespace-pre-wrap">
{`src/
├── components/
│   ├── ui/
│   └── features/
├── pages/
├── hooks/
├── utils/
└── styles/`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-foreground mb-3">Key Implementation</h5>
                <div className="bg-card border border-border/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">React Component</span>
                    <Icon name="Copy" size={14} className="text-muted-foreground cursor-pointer hover:text-foreground" />
                  </div>
                  <pre className="text-sm text-foreground overflow-x-auto">
                    <code>{project?.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-3">Performance Metrics</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project?.performanceMetrics?.map((metric, idx) => (
                  <div key={idx} className="bg-card border border-border/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-accent mb-1">{metric?.value}</div>
                    <div className="text-xs text-muted-foreground">{metric?.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'challenges':
        return (
          <div className="space-y-6">
            <h4 className="font-headline font-semibold text-foreground">Technical Challenges & Solutions</h4>
            <div className="space-y-4">
              {project?.challenges?.map((challenge, idx) => (
                <div key={idx} className="bg-card border border-border/30 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-warning/20 border border-warning/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="AlertTriangle" size={16} className="text-warning" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground mb-2">{challenge?.title}</h5>
                      <p className="text-muted-foreground text-sm mb-3">{challenge?.problem}</p>
                      
                      <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                          <div>
                            <div className="font-medium text-success text-sm mb-1">Solution</div>
                            <p className="text-muted-foreground text-sm">{challenge?.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'testimonials':
        return (
          <div className="space-y-6">
            <h4 className="font-headline font-semibold text-foreground">Client & Team Testimonials</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project?.testimonials?.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  className="bg-card border border-border/30 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-medium text-foreground">{testimonial?.name}</h5>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{testimonial?.role}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{testimonial?.content}</p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)]?.map((_, starIdx) => (
                          <Icon
                            key={starIdx}
                            name="Star"
                            size={14}
                            className={starIdx < testimonial?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] bg-background border border-border/30 rounded-2xl shadow-floating overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-brand-primary rounded-lg flex items-center justify-center">
                  <Icon name="Layers" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="font-headline font-semibold text-xl text-foreground">{project?.title}</h2>
                  <p className="text-muted-foreground text-sm">{project?.category}</p>
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
            
            {/* Tabs */}
            <div className="flex items-center space-x-1 px-6 py-4 border-b border-border/30 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'bg-accent/10 text-accent border border-accent/20' :'text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;