import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConstellationFilters from './components/ConstellationFilters';
import ConstellationView from './components/ConstellationView';
import SkillDetails from './components/SkillDetails';
import SkillStats from './components/SkillStats';

const SkillsConstellationVisualization = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('constellation');
  const [sortBy, setSortBy] = useState('proficiency');
  const [showStats, setShowStats] = useState(false);

  // Mock skills data
  const allSkills = [
    {
      id: 'react',
      name: 'React',
      category: 'Frontend',
      proficiency: 95,
      experience: 4,
      projectCount: 25,
      isNew: false,
      icon: 'Atom',
      description: `Advanced React development with hooks, context, and modern patterns. Expert in component architecture, state management, and performance optimization.`,
      connections: ['typescript', 'nextjs', 'redux'],
      strengths: ['Hooks & Context', 'Performance Optimization', 'Component Architecture', 'Testing'],
      timeline: [
        { year: '2020', title: 'Started with React', description: 'Built first React application with class components' },
        { year: '2021', title: 'Hooks Mastery', description: 'Transitioned to functional components and custom hooks' },
        { year: '2022', title: 'Advanced Patterns', description: 'Implemented complex state management and optimization techniques' },
        { year: '2024', title: 'React 18 Features', description: 'Adopted concurrent features and server components' }
      ]
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Frontend',
      proficiency: 90,
      experience: 3,
      projectCount: 20,
      isNew: false,
      icon: 'FileType',
      description: `Strong TypeScript skills with advanced type system knowledge, generics, and utility types for building scalable applications.`,
      connections: ['react', 'nodejs', 'nextjs'],
      strengths: ['Advanced Types', 'Generics', 'Type Guards', 'Utility Types'],
      timeline: [
        { year: '2021', title: 'TypeScript Basics', description: 'Started using TypeScript for better code quality' },
        { year: '2022', title: 'Advanced Types', description: 'Mastered complex type patterns and generics' },
        { year: '2023', title: 'Full Stack TS', description: 'Implemented TypeScript across entire stack' },
        { year: '2024', title: 'Type-Safe APIs', description: 'Built fully type-safe API contracts' }
      ]
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Backend',
      proficiency: 88,
      experience: 3.5,
      projectCount: 18,
      isNew: false,
      icon: 'Server',
      description: `Proficient in Node.js backend development with Express, API design, authentication, and database integration.`,
      connections: ['typescript', 'mongodb', 'postgresql'],
      strengths: ['Express.js', 'API Design', 'Authentication', 'Microservices'],
      timeline: [
        { year: '2020', title: 'Node.js Fundamentals', description: 'Built first REST APIs with Express' },
        { year: '2021', title: 'Database Integration', description: 'Integrated MongoDB and PostgreSQL' },
        { year: '2022', title: 'Microservices', description: 'Architected microservice-based applications' },
        { year: '2024', title: 'Performance Optimization', description: 'Optimized APIs for high-traffic applications' }
      ]
    },
    // {
    //   id: 'nextjs',
    //   name: 'Next.js',
    //   category: 'Frontend',
    //   proficiency: 92,
    //   experience: 2.5,
    //   projectCount: 15,
    //   isNew: false,
    //   icon: 'Layers',
    //   description: `Expert in Next.js for full-stack React applications with SSR, SSG, API routes, and modern deployment strategies.`,
    //   connections: ['react', 'typescript', 'vercel'],
    //   strengths: ['SSR/SSG', 'API Routes', 'Performance', 'SEO Optimization'],
    //   timeline: [
    //     { year: '2021', title: 'Next.js Introduction', description: 'Started with Next.js for better SEO and performance' },
    //     { year: '2022', title: 'Full-Stack Apps', description: 'Built complete applications with API routes' },
    //     { year: '2023', title: 'App Router', description: 'Migrated to new App Router architecture' },
    //     { year: '2024', title: 'Edge Functions', description: 'Implemented edge computing solutions' }
    //   ]
    // },
    // {
    //   id: 'threejs',
    //   name: 'Three.js',
    //   category: 'Frontend',
    //   proficiency: 75,
    //   experience: 1.5,
    //   projectCount: 8,
    //   isNew: true,
    //   icon: 'Box',
    //   description: `Growing expertise in 3D web development with Three.js, WebGL, and interactive 3D experiences.`,
    //   connections: ['react', 'webgl'],
    //   strengths: ['3D Modeling', 'WebGL', 'Animations', 'Interactive Scenes'],
    //   timeline: [
    //     { year: '2023', title: 'Three.js Basics', description: 'Started learning 3D web development' },
    //     { year: '2024', title: 'Interactive 3D', description: 'Built complex interactive 3D experiences' }
    //   ]
    // },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Database',
      proficiency: 85,
      experience: 3,
      projectCount: 16,
      isNew: false,
      icon: 'Database',
      description: `Experienced with MongoDB for NoSQL database design, aggregation pipelines, and performance optimization.`,
      connections: ['nodejs', 'mongoose'],
      strengths: ['Schema Design', 'Aggregation', 'Indexing', 'Performance'],
      timeline: [
        { year: '2021', title: 'MongoDB Basics', description: 'Started with basic CRUD operations' },
        { year: '2022', title: 'Advanced Queries', description: 'Mastered aggregation pipelines' },
        { year: '2023', title: 'Performance Tuning', description: 'Optimized queries and indexing strategies' },
        { year: '2024', title: 'Atlas & Cloud', description: 'Deployed and managed cloud databases' }
      ]
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Database',
      proficiency: 80,
      experience: 2,
      projectCount: 12,
      isNew: false,
      icon: 'Database',
      description: `Solid PostgreSQL skills with complex queries, stored procedures, and database optimization.`,
      connections: ['nodejs', 'prisma'],
      strengths: ['Complex Queries', 'Stored Procedures', 'Optimization', 'Migrations'],
      timeline: [
        { year: '2022', title: 'PostgreSQL Fundamentals', description: 'Learned relational database concepts' },
        { year: '2023', title: 'Advanced SQL', description: 'Mastered complex joins and subqueries' },
        { year: '2024', title: 'Performance Optimization', description: 'Optimized queries and database structure' }
      ]
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'DevOps',
      proficiency: 82,
      experience: 2.5,
      projectCount: 14,
      isNew: false,
      icon: 'Container',
      description: `Proficient in containerization with Docker, multi-stage builds, and container orchestration.`,
      connections: ['kubernetes', 'aws'],
      strengths: ['Containerization', 'Multi-stage Builds', 'Docker Compose', 'Optimization'],
      timeline: [
        { year: '2021', title: 'Docker Basics', description: 'Started containerizing applications' },
        { year: '2022', title: 'Production Deployment', description: 'Deployed containerized apps to production' },
        { year: '2023', title: 'Orchestration', description: 'Implemented container orchestration' },
        { year: '2024', title: 'Optimization', description: 'Optimized container size and performance' }
      ]
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'DevOps',
      proficiency: 78,
      experience: 2,
      projectCount: 10,
      isNew: false,
      icon: 'Cloud',
      description: `AWS cloud services experience with EC2, S3, Lambda, RDS, and serverless architectures.`,
      connections: ['docker', 'serverless'],
      strengths: ['EC2 & S3', 'Lambda Functions', 'RDS', 'CloudFormation'],
      timeline: [
        { year: '2022', title: 'AWS Fundamentals', description: 'Started with basic AWS services' },
        { year: '2023', title: 'Serverless Architecture', description: 'Built serverless applications' },
        { year: '2024', title: 'Infrastructure as Code', description: 'Implemented CloudFormation templates' }
      ]
    },
    // {
    //   id: 'graphql',
    //   name: 'GraphQL',
    //   category: 'Backend',
    //   proficiency: 73,
    //   experience: 1.5,
    //   projectCount: 7,
    //   isNew: true,
    //   icon: 'Share2',
    //   description: `Growing expertise in GraphQL API development with Apollo Server and client-side integration.`,
    //   connections: ['nodejs', 'apollo'],
    //   strengths: ['Schema Design', 'Resolvers', 'Apollo Server', 'Client Integration'],
    //   timeline: [
    //     { year: '2023', title: 'GraphQL Introduction', description: 'Started learning GraphQL concepts' },
    //     { year: '2024', title: 'Production APIs', description: 'Built production GraphQL APIs' }
    //   ]
    // },
    {
      id: 'python',
      name: 'Python',
      category: 'Backend',
      proficiency: 70,
      experience: 2,
      projectCount: 9,
      isNew: false,
      icon: 'Code',
      description: `Python development for automation, data processing, and web development with Django and Flask.`,
      connections: ['django', 'flask'],
      strengths: ['Web Development', 'Automation', 'Data Processing', 'Scripting'],
      timeline: [
        { year: '2022', title: 'Python Basics', description: 'Started with Python fundamentals' },
        { year: '2023', title: 'Web Frameworks', description: 'Built applications with Django and Flask' },
        { year: '2024', title: 'Automation Scripts', description: 'Created automation and data processing scripts' }
      ]
    },
    {
      id: 'flutter',
      name: 'Flutter',
      category: 'Mobile',
      proficiency: 68,
      experience: 1,
      projectCount: 5,
      isNew: true,
      icon: 'Smartphone',
      description: `Learning Flutter for cross-platform mobile development with Dart programming language.`,
      connections: ['dart', 'firebase'],
      strengths: ['Cross-platform', 'UI Development', 'State Management', 'Native Features'],
      timeline: [
        { year: '2023', title: 'Flutter Basics', description: 'Started mobile development with Flutter' },
        { year: '2024', title: 'Production Apps', description: 'Built and deployed mobile applications' }
      ]
    }
  ];

  const categories = [
    { id: 'Frontend', name: 'Frontend', icon: 'Monitor', count: allSkills?.filter(s => s?.category === 'Frontend')?.length },
    { id: 'Backend', name: 'Backend', icon: 'Server', count: allSkills?.filter(s => s?.category === 'Backend')?.length },
    { id: 'Database', name: 'Database', icon: 'Database', count: allSkills?.filter(s => s?.category === 'Database')?.length },
    { id: 'DevOps', name: 'DevOps', icon: 'Cloud', count: allSkills?.filter(s => s?.category === 'DevOps')?.length },
    { id: 'Mobile', name: 'Mobile', icon: 'Smartphone', count: allSkills?.filter(s => s?.category === 'Mobile')?.length }
  ];

  // Mock related projects
  const relatedProjects = [
    {
      name: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'TypeScript']
    },
    {
      name: '3D Portfolio Website',
      description: 'Interactive 3D portfolio built with Three.js and React',
      technologies: ['React', 'Three.js', 'TypeScript', 'Next.js']
    },
    {
      name: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'GraphQL']
    }
  ];

  // Filter and sort skills
  const filteredSkills = allSkills?.filter(skill => {
      const matchesCategory = selectedCategory === 'all' || skill?.category === selectedCategory;
      const matchesSearch = skill?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           skill?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      return matchesCategory && matchesSearch;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'proficiency':
          return b?.proficiency - a?.proficiency;
        case 'experience':
          return b?.experience - a?.experience;
        case 'projects':
          return b?.projectCount - a?.projectCount;
        case 'alphabetical':
          return a?.name?.localeCompare(b?.name);
        default:
          return 0;
      }
    });

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
  };

  const handleSkillHover = (skill) => {
    setHoveredSkill(skill);
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
  };

  const closeSkillDetails = () => {
    setSelectedSkill(null);
  };

  return (
    <>
      <Helmet>
        <title>Skills Constellation | Zaw Lynn Htet</title>
        <meta name="description" content="Explore Zaw Lynn Htet's technical skills through an interactive 3D constellation visualization. Discover proficiency levels, experience, and project applications." />
        <meta name="keywords" content="skills, technical expertise, React, TypeScript, Node.js, 3D visualization, web development" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-brand-primary/5"></div>
            
            <div className="relative max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center space-x-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-sm text-accent">
                  <Icon name="Sparkles" size={16} />
                  <span>Interactive Skills Universe</span>
                </div>
                
                <h1 className="font-headline font-bold text-4xl lg:text-6xl text-foreground">
                  Skills{' '}
                  <span className="bg-gradient-to-r from-accent to-brand-primary bg-clip-text text-transparent">
                    Constellation
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Navigate through my technical universe where each skill shines as a star, connected by the relationships that power modern development. Explore proficiency levels, project applications, and the evolution of my expertise.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    variant="default"
                    className="bg-gradient-to-r from-accent to-brand-primary text-primary shadow-glow"
                    iconName="Play"
                    iconPosition="left"
                    onClick={() => setViewMode('constellation')}
                  >
                    Explore Constellation
                  </Button>
                  <Button
                    className="border-accent/30 text-accent"
                    iconName="BarChart3"
                    iconPosition="left"
                    onClick={() => setShowStats(!showStats)}
                  >
                    View Statistics
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Filters */}
          <section className="px-6 lg:px-8 mb-8">
            <div className="max-w-7xl mx-auto">
              <ConstellationFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          </section>

          {/* Stats Section */}
          <AnimatePresence>
            {showStats && (
              <motion.section
                className="px-6 lg:px-8 mb-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="max-w-7xl mx-auto">
                  <SkillStats 
                    skills={allSkills} 
                    selectedCategory={selectedCategory}
                  />
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Constellation View */}
          <section className="px-6 lg:px-8 mb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden shadow-floating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ConstellationView
                  skills={filteredSkills}
                  selectedSkill={selectedSkill}
                  onSkillSelect={handleSkillSelect}
                  onSkillHover={handleSkillHover}
                  onSkillLeave={handleSkillLeave}
                  viewMode={viewMode}
                />
              </motion.div>
            </div>
          </section>

          {/* Results Summary */}
          <section className="px-6 lg:px-8 mb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="inline-flex items-center space-x-2 bg-card/50 border border-border/30 rounded-full px-6 py-3">
                  <Icon name="Target" size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">
                    Displaying <span className="text-accent font-mono">{filteredSkills?.length}</span> of <span className="text-accent font-mono">{allSkills?.length}</span> skills
                  </span>
                  {selectedCategory !== 'all' && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-accent">
                        {categories?.find(c => c?.id === selectedCategory)?.name}
                      </span>
                    </>
                  )}
                  {searchTerm && (
                    <>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-accent">
                        "{searchTerm}"
                      </span>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Skill Details Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <SkillDetails
              skill={selectedSkill}
              onClose={closeSkillDetails}
              relatedProjects={relatedProjects}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SkillsConstellationVisualization;