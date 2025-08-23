import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ExperimentCard from './components/ExperimentCard';
import TechnologyFilter from './components/TechnologyFilter';
import ExperimentDemo from './components/ExperimentDemo';
import InnovationMetrics from './components/InnovationMetrics';
import ThoughtLeadership from './components/ThoughtLeadership';

const InnovationPlaygroundExperiments = () => {
  const [selectedTech, setSelectedTech] = useState([]);
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');

  const experiments = [
    {
      id: 1,
      title: "WebXR Product Configurator",
      description: `Immersive 3D product customization experience using WebXR APIs.\nCustomers can visualize and modify products in augmented reality before purchase.\nIntegrates with e-commerce platforms for seamless shopping experience.`,
      category: "WebXR",
      status: "active",
      date: "Dec 2024",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop",
      technologies: ["WebXR", "Three.js", "React", "WebGL"],
      features: ["AR Product Visualization", "Real-time Customization", "E-commerce Integration"],
      complexity: "9",
      performance: "8",
      innovation: "10",
      stars: 234,
      forks: 45,
      hasDemo: true,
      technicalDetails: `Built with WebXR Device API and Three.js for cross-platform AR/VR support. Implements advanced lighting models and PBR materials for photorealistic rendering.`
    },
    {
      id: 2,
      title: "AI-Powered Code Review Assistant",
      description: `Machine learning model that analyzes code quality and suggests improvements.\nIntegrates with GitHub to provide automated code reviews and security analysis.\nLearns from team coding patterns to provide personalized recommendations.`,
      category: "AI/ML",
      status: "experimental",
      date: "Nov 2024",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      technologies: ["TensorFlow.js", "OpenAI API", "Node.js", "GitHub API"],
      features: ["Automated Code Analysis", "Security Vulnerability Detection", "Performance Optimization"],
      complexity: "8",
      performance: "9",
      innovation: "9",
      stars: 189,
      forks: 32,
      hasDemo: true,
      technicalDetails: `Uses transformer models for code understanding and natural language processing. Implements custom training pipeline for domain-specific code patterns.`
    },
    {
      id: 3,
      title: "WebGL Particle Physics Engine",
      description: `High-performance particle system with realistic physics simulation.\nSupports collision detection, fluid dynamics, and complex particle interactions.\nOptimized for 60fps performance with thousands of particles.`,
      category: "WebGL",
      status: "active",
      date: "Oct 2024",
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&h=400&fit=crop",
      technologies: ["WebGL", "GLSL", "JavaScript", "Web Workers"],
      features: ["Real-time Physics", "GPU Acceleration", "Collision Detection"],
      complexity: "10",
      performance: "10",
      innovation: "8",
      stars: 156,
      forks: 28,
      hasDemo: true,
      technicalDetails: `Implements Verlet integration and spatial partitioning for efficient collision detection. Uses compute shaders for GPU-accelerated physics calculations.`
    },
    {
      id: 4,
      title: "Quantum Algorithm Visualizer",
      description: `Interactive visualization of quantum computing algorithms and circuits.\nEducational tool for understanding quantum mechanics and quantum programming.\nSupports multiple quantum gates and circuit simulation.`,
      category: "Quantum",
      status: "concept",
      date: "Sep 2024",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
      technologies: ["Qiskit", "D3.js", "React", "WebAssembly"],
      features: ["Circuit Visualization", "Algorithm Simulation", "Educational Interface"],
      complexity: "9",
      performance: "7",
      innovation: "10",
      stars: 98,
      forks: 15,
      hasDemo: false,
      technicalDetails: `Integrates with IBM Qiskit for quantum circuit simulation. Uses WebAssembly for performance-critical quantum state calculations.`
    },
    {
      id: 5,
      title: "Blockchain-based Identity Verification",
      description: `Decentralized identity system using blockchain technology.\nProvides secure, privacy-preserving identity verification for web applications.\nSupports multiple blockchain networks and identity standards.`,
      category: "Blockchain",
      status: "experimental",
      date: "Aug 2024",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      technologies: ["Ethereum", "Web3.js", "IPFS", "Solidity"],
      features: ["Decentralized Identity", "Privacy Protection", "Cross-chain Support"],
      complexity: "8",
      performance: "6",
      innovation: "9",
      stars: 145,
      forks: 23,
      hasDemo: true,
      technicalDetails: `Implements W3C DID standards with Ethereum smart contracts. Uses IPFS for distributed storage of identity documents and credentials.`
    },
    {
      id: 6,
      title: "Edge Computing React Framework",
      description: `Framework for deploying React applications at the edge.\nProvides automatic code splitting and intelligent caching strategies.\nOptimizes performance for global content delivery networks.`,
      category: "Edge Computing",
      status: "active",
      date: "Jul 2024",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      technologies: ["Cloudflare Workers", "React", "Webpack", "Service Workers"],
      features: ["Edge Deployment", "Intelligent Caching", "Global CDN"],
      complexity: "7",
      performance: "9",
      innovation: "8",
      stars: 203,
      forks: 41,
      hasDemo: true,
      technicalDetails: `Uses Cloudflare Workers for edge computing with custom React SSR implementation. Implements intelligent prefetching based on user behavior patterns.`
    }
  ];

  const allTechnologies = [...new Set(experiments.flatMap(exp => exp.technologies))];
  const experimentCounts = allTechnologies?.reduce((acc, tech) => {
    acc[tech] = experiments?.filter(exp => exp?.technologies?.includes(tech))?.length;
    return acc;
  }, {});

  const filteredExperiments = experiments?.filter(experiment => {
    if (selectedTech?.length === 0) return true;
    return selectedTech?.some(tech => experiment?.technologies?.includes(tech));
  });

  const sortedExperiments = [...filteredExperiments]?.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'stars':
        return b?.stars - a?.stars;
      case 'innovation':
        return parseInt(b?.innovation) - parseInt(a?.innovation);
      case 'complexity':
        return parseInt(b?.complexity) - parseInt(a?.complexity);
      default:
        return 0;
    }
  });

  const handleDemo = (experiment) => {
    setSelectedExperiment(experiment);
    setIsDemoOpen(true);
  };

  const handleViewCode = (experiment) => {
    window.open(`https://github.com/zawlynn/experiment-${experiment?.id}`, '_blank');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-brand-primary/5"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)]?.map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2 mb-6"
            >
              <Icon name="Beaker" size={16} className="text-accent" />
              <span className="text-accent text-sm font-medium">Innovation Playground</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-headline font-bold text-4xl lg:text-6xl text-foreground mb-6"
            >
              Experimental
              <span className="text-glow-accent"> Technologies</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Pushing the boundaries of web development with cutting-edge technologies, 
              experimental frameworks, and innovative solutions that shape the future of digital experiences.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-accent to-brand-primary hover:from-accent/90 hover:to-brand-primary/90 text-primary shadow-glow"
                iconName="Play"
                iconPosition="left"
              >
                Explore Experiments
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-accent/30 text-accent hover:bg-accent/10"
                iconName="Github"
                iconPosition="left"
              >
                View Source Code
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Innovation Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <InnovationMetrics experiments={experiments} />
        </div>
      </section>
      {/* Experiments Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              <TechnologyFilter
                technologies={allTechnologies}
                selectedTech={selectedTech}
                onTechSelect={setSelectedTech}
                experimentCounts={experimentCounts}
              />
              
              {/* Sort & View Options */}
              <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6">
                <h3 className="font-headline font-semibold text-lg text-foreground mb-4">
                  Display Options
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Sort by
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e?.target?.value)}
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                    >
                      <option value="date">Latest First</option>
                      <option value="stars">Most Starred</option>
                      <option value="innovation">Innovation Score</option>
                      <option value="complexity">Complexity Level</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      View Mode
                    </label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors duration-fast ${
                          viewMode === 'grid' ?'bg-accent/10 text-accent border border-accent/30' :'bg-muted/20 text-muted-foreground hover:bg-muted/30'
                        }`}
                      >
                        <Icon name="Grid3X3" size={16} className="mx-auto" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors duration-fast ${
                          viewMode === 'list' ?'bg-accent/10 text-accent border border-accent/30' :'bg-muted/20 text-muted-foreground hover:bg-muted/30'
                        }`}
                      >
                        <Icon name="List" size={16} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-headline font-semibold text-2xl text-foreground">
                    Experimental Projects
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    {sortedExperiments?.length} experiments found
                    {selectedTech?.length > 0 && ` • Filtered by: ${selectedTech?.join(', ')}`}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs text-muted-foreground">Live Updates</span>
                </div>
              </div>
              
              {/* Experiments Grid */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' ?'grid-cols-1 xl:grid-cols-2' :'grid-cols-1'
              }`}>
                {sortedExperiments?.map((experiment, index) => (
                  <ExperimentCard
                    key={experiment?.id}
                    experiment={experiment}
                    onDemo={handleDemo}
                    onViewCode={handleViewCode}
                    index={index}
                  />
                ))}
              </div>
              
              {sortedExperiments?.length === 0 && (
                <div className="text-center py-16">
                  <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-headline font-semibold text-xl text-foreground mb-2">
                    No experiments found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your technology filters or search criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTech([])}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Thought Leadership */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-6 lg:px-8">
          <ThoughtLeadership />
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-accent/10 to-brand-primary/10 border border-accent/30 rounded-2xl p-8 lg:p-12 text-center"
          >
            <Icon name="Lightbulb" size={64} className="text-accent mx-auto mb-6" />
            <h2 className="font-headline font-bold text-3xl text-foreground mb-4">
              Have an Experimental Idea?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's collaborate on pushing the boundaries of web technology. 
              From concept to implementation, let's build the future together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-accent to-brand-primary hover:from-accent/90 hover:to-brand-primary/90 text-primary shadow-glow"
                iconName="MessageCircle"
                iconPosition="left"
              >
                Start Collaboration
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-accent/30 text-accent hover:bg-accent/10"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Discussion
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Demo Modal */}
      <ExperimentDemo
        experiment={selectedExperiment}
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </div>
  );
};

export default InnovationPlaygroundExperiments;