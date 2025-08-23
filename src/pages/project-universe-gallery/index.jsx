import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import FilterPanel from './components/FilterPanel';
import ProjectStats from './components/ProjectStats';
import SearchBar from './components/SearchBar';

const ProjectUniverseGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    technology: [],
    industry: [],
    status: [],
    quick: []
  });
  const [viewMode, setViewMode] = useState('grid'); // grid, list, universe
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(false);

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "EcoCommerce Platform",
      description: "A sustainable e-commerce platform built with Next.js featuring real-time inventory management, AI-powered product recommendations, and carbon footprint tracking for environmentally conscious shopping.",
      category: "Full-Stack Solutions",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      technologies: [
        { name: "Next.js", icon: "Globe" },
        { name: "React", icon: "Layers" },
        { name: "TypeScript", icon: "Code" },
        { name: "Prisma", icon: "Database" },
        { name: "Stripe", icon: "CreditCard" },
        { name: "Tailwind", icon: "Palette" }
      ],
      isLive: true,
      isNew: true,
      duration: "4 months",
      teamSize: "3 developers",
      role: "Lead Frontend Developer",
      liveUrl: "https://example.com/ecocommerce-demo",
      githubUrl: "https://github.com/zawlynn/ecocommerce",
      industry: "E-commerce",
      features: [
        "Real-time inventory synchronization",
        "AI-powered product recommendations",
        "Carbon footprint calculator",
        "Multi-vendor marketplace",
        "Advanced search and filtering",
        "Mobile-responsive design"
      ],
      metrics: [
        { icon: "Users", value: "15K+", label: "Users" },
        { icon: "TrendingUp", value: "98%", label: "Uptime" },
        { icon: "Zap", value: "2.1s", label: "Load Time" }
      ],
      performanceMetrics: [
        { label: "Lighthouse Score", value: "98" },
        { label: "Core Web Vitals", value: "Excellent" },
        { label: "Bundle Size", value: "245KB" },
        { label: "API Response", value: "120ms" }
      ],
      challenges: [
        {
          title: "Real-time Inventory Synchronization",
          problem: "Managing inventory across multiple vendors with real-time updates while maintaining data consistency and preventing overselling.",
          solution: "Implemented WebSocket connections with Redis pub/sub pattern and optimistic locking mechanisms to ensure real-time synchronization without race conditions."
        },
        {
          title: "Performance Optimization",
          problem: "Large product catalogs were causing slow page loads and poor user experience, especially on mobile devices.",
          solution: "Implemented virtual scrolling, image lazy loading, and server-side rendering with incremental static regeneration to achieve sub-2-second load times."
        }
      ],
      testimonials: [
        {
          name: "Sarah Chen",
          role: "Product Manager",
          avatar: "https://randomuser.me/api/portraits/women/32.jpg",
          content: "Zaw\'s technical expertise and attention to detail transformed our vision into a world-class platform. The performance optimizations alone increased our conversion rate by 35%.",
          rating: 5
        },
        {
          name: "Michael Rodriguez",
          role: "CTO",
          avatar: "https://randomuser.me/api/portraits/men/45.jpg",
          content: "Outstanding work on the real-time features. The inventory synchronization system has been rock-solid since launch with zero data inconsistencies.",
          rating: 5
        }
      ],
      codeSnippet: `const useInventorySync = (productId) => {
  const [inventory, setInventory] = useState(null);
  
  useEffect(() => {
    const socket = io('/inventory');
    
    socket.emit('subscribe', productId);
    socket.on('inventory-update', setInventory);
    
    return () => socket.disconnect();
  }, [productId]);
  
  return inventory;
};`
    },
    {
      id: 2,
      title: "HealthTech Dashboard",
      description: "A comprehensive healthcare management dashboard with patient data visualization, appointment scheduling, and real-time health monitoring integration for medical professionals.",
      category: "React Applications",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      technologies: [
        { name: "React", icon: "Layers" },
        { name: "D3.js", icon: "BarChart3" },
        { name: "Node.js", icon: "Server" },
        { name: "MongoDB", icon: "Database" },
        { name: "Socket.io", icon: "Wifi" }
      ],
      isLive: true,
      isNew: false,
      duration: "6 months",
      teamSize: "5 developers",
      role: "Frontend Architect",
      liveUrl: "https://example.com/healthtech-demo",
      githubUrl: "https://github.com/zawlynn/healthtech-dashboard",
      industry: "Healthcare",
      features: [
        "Real-time patient monitoring",
        "Interactive data visualizations",
        "Appointment scheduling system",
        "Medical records management",
        "HIPAA compliant security",
        "Multi-role access control"
      ],
      metrics: [
        { icon: "Activity", value: "24/7", label: "Monitoring" },
        { icon: "Shield", value: "100%", label: "HIPAA" },
        { icon: "Clock", value: "0.8s", label: "Response" }
      ],
      performanceMetrics: [
        { label: "Dashboard Load", value: "1.2s" },
        { label: "Data Refresh", value: "Real-time" },
        { label: "Uptime", value: "99.9%" },
        { label: "Security Score", value: "A+" }
      ],
      challenges: [
        {
          title: "HIPAA Compliance Implementation",
          problem: "Ensuring all patient data handling, storage, and transmission meets strict HIPAA compliance requirements while maintaining system performance.",
          solution: "Implemented end-to-end encryption, audit logging, role-based access control, and secure session management with regular security audits."
        }
      ],
      testimonials: [
        {
          name: "Dr. Emily Watson",
          role: "Chief Medical Officer",
          avatar: "https://randomuser.me/api/portraits/women/28.jpg",
          content: "This dashboard has revolutionized how we monitor our patients. The real-time visualizations help us make faster, more informed decisions.",
          rating: 5
        }
      ],
      codeSnippet: `const PatientMonitor = ({ patientId }) => {
  const { data, isLoading } = useRealTimeData(
    \`/api/patients/\${patientId}/vitals\`
  );
  
  return (
    <VitalsChart 
      data={data} 
      loading={isLoading}
      alerts={data?.alerts}
    />
  );
};`
    },
    {
      id: 3,
      title: "3D Portfolio Showcase",
      description: "An immersive 3D portfolio website built with Three.js and React Three Fiber, featuring interactive 3D models, particle systems, and physics-based animations.",
      category: "Creative Coding Experiments",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
      technologies: [
        { name: "Three.js", icon: "Box" },
        { name: "React", icon: "Layers" },
        { name: "WebGL", icon: "Zap" },
        { name: "GSAP", icon: "Play" },
        { name: "Blender", icon: "Palette" }
      ],
      isLive: true,
      isNew: true,
      duration: "3 months",
      teamSize: "2 developers",
      role: "3D Developer",
      liveUrl: "https://example.com/3d-portfolio-demo",
      githubUrl: "https://github.com/zawlynn/3d-portfolio",
      industry: "Creative",
      features: [
        "Interactive 3D environments",
        "Physics-based animations",
        "Particle systems",
        "Responsive 3D design",
        "Performance optimization",
        "Cross-browser compatibility"
      ],
      metrics: [
        { icon: "Cpu", value: "60", label: "FPS" },
        { icon: "Smartphone", value: "95%", label: "Mobile" },
        { icon: "Eye", value: "4.2s", label: "Avg Time" }
      ],
      performanceMetrics: [
        { label: "Frame Rate", value: "60 FPS" },
        { label: "Load Time", value: "2.8s" },
        { label: "3D Models", value: "12" },
        { label: "Particles", value: "5000+" }
      ],
      challenges: [
        {
          title: "Mobile Performance Optimization",
          problem: "Maintaining smooth 60fps performance on mobile devices while preserving visual quality and interactive features.",
          solution: "Implemented level-of-detail (LOD) systems, texture compression, and adaptive quality settings based on device capabilities."
        }
      ],
      testimonials: [
        {
          name: "Alex Thompson",
          role: "Creative Director",
          avatar: "https://randomuser.me/api/portraits/men/33.jpg",
          content: "Absolutely stunning work! The 3D interactions are smooth and the attention to performance details is impressive. This sets a new standard for portfolio websites.",
          rating: 5
        }
      ],
      codeSnippet: `const Scene3D = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = 
      Math.sin(state.clock.elapsedTime) * 0.1;
    meshRef.current.rotation.y += 0.01;
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};`
    },
    {
      id: 4,
      title: "FinTech Analytics Platform",
      description: "A comprehensive financial analytics platform with real-time market data, portfolio management, and AI-powered investment insights for financial advisors and investors.",
      category: "Full-Stack Solutions",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
      technologies: [
        { name: "React", icon: "Layers" },
        { name: "Python", icon: "Code" },
        { name: "TensorFlow", icon: "Brain" },
        { name: "PostgreSQL", icon: "Database" },
        { name: "Redis", icon: "Zap" }
      ],
      isLive: true,
      isNew: false,
      duration: "8 months",
      teamSize: "6 developers",
      role: "Full-Stack Developer",
      liveUrl: "https://example.com/fintech-demo",
      githubUrl: "https://github.com/zawlynn/fintech-analytics",
      industry: "Finance",
      features: [
        "Real-time market data feeds",
        "Portfolio performance tracking",
        "AI-powered investment insights",
        "Risk assessment tools",
        "Compliance reporting",
        "Multi-currency support"
      ],
      metrics: [
        { icon: "DollarSign", value: "$2.5B", label: "Assets" },
        { icon: "TrendingUp", value: "99.8%", label: "Accuracy" },
        { icon: "Users", value: "850+", label: "Advisors" }
      ],
      performanceMetrics: [
        { label: "Data Latency", value: "50ms" },
        { label: "Calculations/sec", value: "10K+" },
        { label: "Concurrent Users", value: "1000+" },
        { label: "Uptime", value: "99.95%" }
      ],
      challenges: [
        {
          title: "Real-time Data Processing",
          problem: "Processing and displaying thousands of market data points per second while maintaining system responsiveness and data accuracy.",
          solution: "Implemented event-driven architecture with Apache Kafka for data streaming and Redis for caching frequently accessed data."
        }
      ],
      testimonials: [
        {
          name: "Jennifer Park",
          role: "Portfolio Manager",
          avatar: "https://randomuser.me/api/portraits/women/41.jpg",
          content: "The AI insights have significantly improved our investment decisions. The platform's speed and reliability are exactly what we needed for our high-frequency trading strategies.",
          rating: 5
        }
      ],
      codeSnippet: `const useMarketData = (symbols) => {
  const [data, setData] = useState({});
  
  useEffect(() => {
    const ws = new WebSocket('/market-feed');
    
    ws.onmessage = (event) => {
      const update = JSON.parse(event.data);
      setData(prev => ({
        ...prev,
        [update.symbol]: update
      }));
    };
    
    return () => ws.close();
  }, [symbols]);
  
  return data;
};`
    },
    {
      id: 5,
      title: "AI Content Generator",
      description: "An intelligent content generation platform using GPT-4 integration, featuring blog post creation, social media content, and SEO optimization tools for content creators.",
      category: "React Applications",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      technologies: [
        { name: "React", icon: "Layers" },
        { name: "OpenAI", icon: "Brain" },
        { name: "Express", icon: "Server" },
        { name: "MongoDB", icon: "Database" },
        { name: "Stripe", icon: "CreditCard" }
      ],
      isLive: true,
      isNew: true,
      duration: "5 months",
      teamSize: "4 developers",
      role: "Lead Developer",
      liveUrl: "https://example.com/ai-content-demo",
      githubUrl: "https://github.com/zawlynn/ai-content-generator",
      industry: "SaaS",
      features: [
        "GPT-4 powered content generation",
        "SEO optimization suggestions",
        "Multi-format content export",
        "Plagiarism detection",
        "Content scheduling",
        "Team collaboration tools"
      ],
      metrics: [
        { icon: "FileText", value: "50K+", label: "Articles" },
        { icon: "Users", value: "2.8K", label: "Users" },
        { icon: "Star", value: "4.9", label: "Rating" }
      ],
      performanceMetrics: [
        { label: "Generation Speed", value: "3.2s" },
        { label: "Accuracy Rate", value: "94%" },
        { label: "User Satisfaction", value: "4.9/5" },
        { label: "API Uptime", value: "99.7%" }
      ],
      challenges: [
        {
          title: "AI Response Quality Control",
          problem: "Ensuring consistent, high-quality content generation while managing API costs and response times for different content types.",
          solution: "Implemented content quality scoring, response caching for similar requests, and tiered pricing model with usage optimization."
        }
      ],
      testimonials: [
        {
          name: "David Kim",
          role: "Content Marketing Manager",
          avatar: "https://randomuser.me/api/portraits/men/29.jpg",
          content: "This tool has transformed our content creation process. We\'re producing 3x more content with better SEO performance. The AI suggestions are incredibly accurate.",
          rating: 5
        }
      ],
      codeSnippet: `const useContentGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateContent = async (prompt, type) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt, type })
      });
      return await response.json();
    } finally {
      setIsGenerating(false);
    }
  };
  
  return { generateContent, isGenerating };
};`
    },
    {
      id: 6,
      title: "Smart Home IoT Dashboard",
      description: "A comprehensive IoT dashboard for smart home management with real-time device monitoring, automation rules, and energy consumption analytics.",
      category: "React Applications",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      technologies: [
        { name: "React", icon: "Layers" },
        { name: "MQTT", icon: "Wifi" },
        { name: "InfluxDB", icon: "Database" },
        { name: "Grafana", icon: "BarChart3" },
        { name: "Docker", icon: "Package" }
      ],
      isLive: false,
      isNew: false,
      duration: "4 months",
      teamSize: "3 developers",
      role: "IoT Developer",
      liveUrl: "https://example.com/smart-home-demo",
      githubUrl: "https://github.com/zawlynn/smart-home-dashboard",
      industry: "IoT",
      features: [
        "Real-time device monitoring",
        "Automation rule engine",
        "Energy consumption tracking",
        "Voice control integration",
        "Mobile app companion",
        "Security system integration"
      ],
      metrics: [
        { icon: "Home", value: "150+", label: "Devices" },
        { icon: "Zap", value: "30%", label: "Energy Saved" },
        { icon: "Shield", value: "100%", label: "Secure" }
      ],
      performanceMetrics: [
        { label: "Response Time", value: "200ms" },
        { label: "Device Uptime", value: "99.5%" },
        { label: "Data Points/day", value: "1M+" },
        { label: "Automation Rules", value: "500+" }
      ],
      challenges: [
        {
          title: "Device Communication Reliability",
          problem: "Ensuring reliable communication with hundreds of IoT devices across different protocols and network conditions.",
          solution: "Implemented MQTT broker with QoS levels, device heartbeat monitoring, and automatic reconnection with exponential backoff."
        }
      ],
      testimonials: [
        {
          name: "Lisa Anderson",
          role: "Homeowner",
          avatar: "https://randomuser.me/api/portraits/women/35.jpg",
          content: "The dashboard makes managing our smart home so easy. We\'ve reduced our energy bills by 30% thanks to the automation features and insights.",
          rating: 5
        }
      ],
      codeSnippet: `const useDeviceStatus = (deviceId) => {
  const [status, setStatus] = useState('offline');
  
  useEffect(() => {
    const client = mqtt.connect('/mqtt');
    
    client.subscribe(\`devices/\${deviceId}/status\`);
    client.on('message', (topic, message) => {
      setStatus(message.toString());
    });
    
    return () => client.end();
  }, [deviceId]);
  
  return status;
};`
    }
  ];

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(project =>
        project?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.technologies?.some(tech => 
          tech?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        )
      );
    }

    // Apply category filters
    if (activeFilters?.category?.length > 0) {
      filtered = filtered?.filter(project =>
        activeFilters?.category?.includes(project?.category)
      );
    }

    // Apply technology filters
    if (activeFilters?.technology?.length > 0) {
      filtered = filtered?.filter(project =>
        project?.technologies?.some(tech =>
          activeFilters?.technology?.includes(tech?.name)
        )
      );
    }

    // Apply industry filters
    if (activeFilters?.industry?.length > 0) {
      filtered = filtered?.filter(project =>
        activeFilters?.industry?.includes(project?.industry)
      );
    }

    // Apply status filters
    if (activeFilters?.status?.length > 0) {
      filtered = filtered?.filter(project => {
        if (activeFilters?.status?.includes('live') && project?.isLive) return true;
        if (activeFilters?.status?.includes('development') && !project?.isLive) return true;
        return false;
      });
    }

    // Apply quick filters
    if (activeFilters?.quick?.length > 0) {
      filtered = filtered?.filter(project => {
        if (activeFilters?.quick?.includes('live') && project?.isLive) return true;
        if (activeFilters?.quick?.includes('recent') && project?.isNew) return true;
        if (activeFilters?.quick?.includes('featured') && project?.metrics?.length > 0) return true;
        return false;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        return filtered?.sort((a, b) => b?.id - a?.id);
      case 'alphabetical':
        return filtered?.sort((a, b) => a?.title?.localeCompare(b?.title));
      case 'category':
        return filtered?.sort((a, b) => a?.category?.localeCompare(b?.category));
      default:
        return filtered;
    }
  }, [projects, searchQuery, activeFilters, sortBy]);

  // Filter options
  const filterOptions = {
    categories: [
      { value: "React Applications", label: "React Applications", count: 3 },
      { value: "Full-Stack Solutions", label: "Full-Stack Solutions", count: 2 },
      { value: "Creative Coding Experiments", label: "Creative Coding", count: 1 }
    ],
    technologies: [
      { value: "React", label: "React", count: 6 },
      { value: "Next.js", label: "Next.js", count: 1 },
      { value: "TypeScript", label: "TypeScript", count: 1 },
      { value: "Three.js", label: "Three.js", count: 1 },
      { value: "Node.js", label: "Node.js", count: 2 },
      { value: "MongoDB", label: "MongoDB", count: 3 }
    ],
    industries: [
      { value: "E-commerce", label: "E-commerce", count: 1 },
      { value: "Healthcare", label: "Healthcare", count: 1 },
      { value: "Finance", label: "Finance", count: 1 },
      { value: "SaaS", label: "SaaS", count: 1 },
      { value: "IoT", label: "IoT", count: 1 },
      { value: "Creative", label: "Creative", count: 1 }
    ],
    statuses: [
      { value: "live", label: "Live", count: 5 },
      { value: "development", label: "In Development", count: 1 }
    ]
  };

  // Statistics
  const stats = {
    totalProjects: projects?.length,
    liveProjects: projects?.filter(p => p?.isLive)?.length,
    technologies: [...new Set(projects.flatMap(p => p.technologies.map(t => t.name)))]?.length,
    clients: projects?.reduce((acc, p) => acc + p?.testimonials?.length, 0)
  };

  // Search suggestions
  const searchSuggestions = [
    { text: "React", type: "technology", description: "Frontend framework", count: "6 projects" },
    { text: "E-commerce", type: "project", description: "Online shopping platforms", count: "1 project" },
    { text: "Healthcare", type: "industry", description: "Medical applications", count: "1 project" },
    { text: "3D", type: "technology", description: "Three.js projects", count: "1 project" },
    { text: "AI", type: "technology", description: "Artificial intelligence", count: "2 projects" }
  ];

  const handleExploreProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleFilterChange = (category, values) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: values
    }));
  };

  const handleClearAllFilters = () => {
    setActiveFilters({
      category: [],
      technology: [],
      industry: [],
      status: [],
      quick: []
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-accent/5 to-brand-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                Project{' '}
                <span className="bg-gradient-to-r from-accent to-brand-primary bg-clip-text text-transparent">
                  Universe
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Explore interactive 3D worlds where each project tells a story of innovation, 
                technical mastery, and real-world impact.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <SearchBar
                onSearch={handleSearch}
                suggestions={searchSuggestions}
                isLoading={isLoading}
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ProjectStats stats={stats} />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
                <FilterPanel
                  filters={filterOptions}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearAll={handleClearAllFilters}
                />
              </div>
            </div>

            {/* Projects Grid */}
            <div className="flex-1">
              {/* Controls */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <h2 className="font-headline text-2xl font-semibold text-foreground">
                    Projects ({filteredProjects?.length})
                  </h2>
                  {searchQuery && (
                    <span className="text-sm text-muted-foreground">
                      for "{searchQuery}"
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Options */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="px-3 py-2 bg-card border border-border/30 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="alphabetical">Alphabetical</option>
                    <option value="category">By Category</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex items-center space-x-1 bg-card border border-border/30 rounded-lg p-1">
                    {[
                      { mode: 'grid', icon: 'Grid3X3' },
                      { mode: 'list', icon: 'List' }
                    ]?.map((view) => (
                      <button
                        key={view?.mode}
                        onClick={() => setViewMode(view?.mode)}
                        className={`p-2 rounded-md transition-colors duration-200 ${
                          viewMode === view?.mode
                            ? 'bg-accent/10 text-accent' :'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Icon name={view?.icon} size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Projects Display */}
              <AnimatePresence mode="wait">
                {filteredProjects?.length > 0 ? (
                  <motion.div
                    key={`${viewMode}-${filteredProjects?.length}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={
                      viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' :'space-y-6'
                    }
                  >
                    {filteredProjects?.map((project, index) => (
                      <ProjectCard
                        key={project?.id}
                        project={project}
                        onExplore={handleExploreProject}
                        index={index}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                  >
                    <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="Search" size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-headline text-xl font-semibold text-foreground mb-2">
                      No projects found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleClearAllFilters}
                      iconName="RotateCcw"
                      iconPosition="left"
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          variant="default"
          size="lg"
          className="bg-gradient-to-r from-accent to-brand-primary text-primary shadow-floating hover:shadow-glow rounded-full"
          iconName="MessageCircle"
          iconPosition="left"
        >
          Let's Collaborate
        </Button>
      </motion.div>
    </div>
  );
};

export default ProjectUniverseGallery;