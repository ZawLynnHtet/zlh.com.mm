import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import TimelineNode from './components/TimelineNode';
import MilestoneDetail from './components/MilestoneDetail';
import SkillsProgression from './components/SkillsProgression';
import TestimonialCard from './components/TestimonialCard';
import CertificationBadge from './components/CertificationBadge';
import CulturalBackground from './components/CulturalBackground';

const ProfessionalStoryJourney = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Mock data for professional milestones
  const milestones = [
    {
      id: 1,
      title: "First Steps in Programming",
      date: "2019",
      icon: "Code",
      description: "Discovered the world of programming through HTML and CSS, creating my first static websites and falling in love with the power of code.",
      story: `My journey into programming began during my university years when I stumbled upon a web development tutorial. The moment I saw my first "Hello World" appear on a webpage, I knew I had found my calling.\n\nStarting with basic HTML and CSS, I spent countless hours experimenting with layouts, colors, and animations. Each small victory - making a button hover effect or centering a div - felt like solving a complex puzzle.`,
      achievements: [
        "Built 5+ static websites for local businesses",
        "Mastered HTML5 semantic elements and CSS3 animations",
        "Learned responsive design principles",
        "Created my first portfolio website"
      ],
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      challenges: `The biggest challenge was understanding the box model and CSS positioning. I spent weeks debugging layout issues, but each problem taught me valuable lessons about web fundamentals.`,
      metrics: [
        { value: "10+", label: "Projects Completed" },
        { value: "500+", label: "Hours Coded" },
        { value: "3", label: "Languages Learned" }
      ],
      links: [
        { label: "First Portfolio", icon: "ExternalLink" },
        { label: "GitHub Repos", icon: "Github" }
      ]
    },
    {
      id: 2,
      title: "JavaScript Mastery",
      date: "2020",
      icon: "Zap",
      description: "Dove deep into JavaScript, learning ES6+ features, DOM manipulation, and building my first interactive web applications.",
      story: `After mastering the basics of HTML and CSS, I realized that to create truly engaging web experiences, I needed to learn JavaScript. This marked the beginning of my transformation from a static website creator to a dynamic web developer.\n\nI started with basic DOM manipulation and event handling, gradually progressing to more complex concepts like closures, promises, and async/await. The eureka moment came when I built my first single-page application.`,
      achievements: [
        "Built 3 interactive web applications",
        "Mastered ES6+ features and modern JavaScript",
        "Learned asynchronous programming patterns",
        "Implemented local storage and API integrations"
      ],
      skills: ["JavaScript ES6+", "DOM Manipulation", "Async/Await", "API Integration", "Local Storage"],
      challenges: `Understanding asynchronous JavaScript was initially confusing. Callbacks, promises, and async/await seemed like different languages. I overcame this by building projects that required API calls and data persistence.`,
      metrics: [
        { value: "15+", label: "JS Projects" },
        { value: "1000+", label: "Lines of Code" },
        { value: "5", label: "APIs Integrated" }
      ]
    },
    {
      id: 3,
      title: "React Revolution",
      date: "2021",
      icon: "Layers",
      description: "Embraced React.js and component-based architecture, revolutionizing my approach to building scalable and maintainable web applications.",
      story: `The transition to React was a game-changer. Coming from vanilla JavaScript, the concept of components and state management initially felt overwhelming, but once it clicked, there was no going back.\n\nI spent months learning React fundamentals, hooks, and the ecosystem. Building my first React application - a task management tool - taught me the power of component reusability and declarative programming.`,
      achievements: [
        "Built 8+ React applications from scratch",
        "Mastered React Hooks and Context API",
        "Implemented state management with Redux",
        "Created reusable component libraries"
      ],
      skills: ["React.js", "React Hooks", "Redux", "Component Architecture", "JSX", "State Management"],
      challenges: `The learning curve was steep, especially understanding when to use different hooks and managing complex state. I overcame this by building increasingly complex projects and contributing to open-source React projects.`,
      metrics: [
        { value: "20+", label: "React Apps" },
        { value: "50+", label: "Components Built" },
        { value: "95%", label: "Client Satisfaction" }
      ]
    },
    {
      id: 4,
      title: "3D Web Innovation",
      date: "2022",
      icon: "Box",
      description: "Ventured into 3D web development with Three.js and React Three Fiber, creating immersive digital experiences that push the boundaries of web technology.",
      story: `My fascination with 3D graphics led me to explore Three.js and React Three Fiber. This was uncharted territory that combined my React expertise with 3D mathematics and computer graphics.\n\nThe first 3D scene I rendered - a simple rotating cube - opened up a world of possibilities. I realized that the web could be a canvas for immersive experiences, not just flat interfaces.`,
      achievements: [
        "Created 5+ interactive 3D web experiences",
        "Mastered Three.js and React Three Fiber",
        "Implemented physics simulations and animations",
        "Optimized 3D performance for web browsers"
      ],
      skills: ["Three.js", "React Three Fiber", "WebGL", "3D Mathematics", "GLSL Shaders", "Performance Optimization"],
      challenges: `3D programming required learning new concepts like vectors, matrices, and shader programming. Performance optimization for web browsers was particularly challenging, requiring careful balance between visual quality and frame rates.`,
      metrics: [
        { value: "10+", label: "3D Projects" },
        { value: "60fps", label: "Performance Target" },
        { value: "100%", label: "Browser Compatibility" }
      ]
    },
    {
      id: 5,
      title: "Full-Stack Evolution",
      date: "2023",
      icon: "Server",
      description: "Expanded into full-stack development, mastering Node.js, databases, and API design to create complete web solutions.",
      story: `To build complete applications, I needed to understand the full stack. This journey took me from frontend-focused development to understanding servers, databases, and system architecture.\n\nLearning Node.js felt natural coming from JavaScript, but understanding database design, API architecture, and deployment strategies required a shift in thinking from user interfaces to system design.`,
      achievements: [
        "Built 6+ full-stack applications",
        "Mastered Node.js and Express.js",
        "Implemented RESTful APIs and GraphQL",
        "Deployed applications to cloud platforms"
      ],
      skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL", "AWS", "Docker"],
      challenges: `Understanding database design and API security were major challenges. I learned through building real applications and studying security best practices, eventually becoming comfortable with full-stack architecture.`,
      metrics: [
        { value: "12+", label: "Full-Stack Apps" },
        { value: "99.9%", label: "Uptime Achieved" },
        { value: "50+", label: "APIs Built" }
      ]
    },
    {
      id: 6,
      title: "Present Day Excellence",
      date: "2024",
      icon: "Crown",
      description: "Currently specializing in cutting-edge React development and 3D web experiences, mentoring junior developers, and contributing to open-source projects.",
      story: `Today, I stand as a seasoned React developer with expertise in 3D web technologies. My focus has shifted from just building applications to crafting experiences that inspire and engage users.\n\nI'm passionate about sharing knowledge through mentoring, contributing to open-source projects, and pushing the boundaries of what's possible on the web. Every project is an opportunity to innovate and create something meaningful.`,
      achievements: [
        "Leading 3+ major client projects simultaneously",
        "Mentoring 5+ junior developers",
        "Contributing to 10+ open-source projects",
        "Speaking at local tech meetups"
      ],
      skills: ["Advanced React", "Three.js Mastery", "Team Leadership", "Mentoring", "Open Source", "Technical Writing"],
      challenges: `Balancing multiple projects while maintaining code quality and mentoring others requires excellent time management and communication skills. I've developed systems and processes to handle this complexity effectively.`,
      metrics: [
        { value: "25+", label: "Active Projects" },
        { value: "15+", label: "Developers Mentored" },
        { value: "100+", label: "GitHub Contributions" }
      ]
    }
  ];

  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CTO",
      company: "TechFlow Solutions",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      content: "Zaw Lynn\'s expertise in React and 3D web development is exceptional. He delivered our interactive product showcase ahead of schedule and exceeded all expectations. His attention to detail and innovative approach transformed our vision into reality.",
      project: "Interactive 3D Product Showcase",
      skillsHighlighted: ["React", "Three.js", "Performance Optimization"],
      date: "March 2024",
      location: "San Francisco, CA"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Lead Developer",
      company: "Digital Innovations Inc",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      content: "Working with Zaw Lynn was a game-changer for our team. His mentoring helped our junior developers level up quickly, and his code quality is consistently excellent. He brings both technical expertise and cultural wisdom to every project.",
      project: "Team Development & Code Review",
      skillsHighlighted: ["Mentoring", "Code Quality", "Team Leadership"],
      date: "February 2024",
      location: "New York, NY"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Project Manager",
      company: "Creative Web Studios",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      content: "Zaw Lynn's ability to translate complex technical concepts into understandable terms made our collaboration seamless. His 3D web solutions brought our client's brand to life in ways we never imagined possible.",
      project: "Brand Experience Platform",
      skillsHighlighted: ["Communication", "3D Development", "Client Relations"],
      date: "January 2024",
      location: "London, UK"
    },
    {
      id: 4,
      name: "David Park",
      role: "CEO",
      company: "StartupLab",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
      rating: 5,
      content: "Zaw Lynn built our entire web platform from concept to deployment. His full-stack expertise and innovative use of 3D elements gave us a competitive edge in the market. Highly recommended for any serious web project.",
      project: "Full-Stack Platform Development",
      skillsHighlighted: ["Full-Stack", "Innovation", "Business Impact"],
      date: "December 2023",
      location: "Seoul, South Korea"
    }
  ];

  // Mock certifications data
  const certifications = [
    {
      id: 1,
      name: "Advanced React Development",
      issuer: "Meta (Facebook)",
      date: "2024",
      status: "completed",
      featured: true,
      description: "Comprehensive certification covering advanced React patterns, performance optimization, and modern development practices.",
      skills: ["React 18", "Hooks", "Performance", "Testing"],
      validUntil: "2026",
      credentialId: "META-REACT-2024-ZLH",
      logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
      verifyUrl: "#",
      certificateUrl: "#"
    },
    {
      id: 2,
      name: "Three.js Fundamentals",
      issuer: "Three.js Academy",
      date: "2023",
      status: "completed",
      description: "Mastery of 3D web development using Three.js, including advanced rendering techniques and performance optimization.",
      skills: ["Three.js", "WebGL", "3D Graphics", "Shaders"],
      credentialId: "THREEJS-FUND-2023-ZLH",
      verifyUrl: "#",
      certificateUrl: "#"
    },
    {
      id: 3,
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      status: "completed",
      description: "Foundation-level understanding of AWS cloud services, security, and deployment best practices.",
      skills: ["AWS", "Cloud Computing", "Deployment", "Security"],
      validUntil: "2026",
      credentialId: "AWS-CP-2023-ZLH",
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=100&h=100&fit=crop",
      verifyUrl: "#",
      certificateUrl: "#"
    },
    {
      id: 4,
      name: "JavaScript Algorithms & Data Structures",
      issuer: "freeCodeCamp",
      date: "2022",
      status: "completed",
      description: "Comprehensive course covering algorithms, data structures, and problem-solving techniques in JavaScript.",
      skills: ["Algorithms", "Data Structures", "Problem Solving", "JavaScript"],
      credentialId: "FCC-JSADS-2022-ZLH",
      verifyUrl: "#",
      certificateUrl: "#"
    },
    {
      id: 5,
      name: "Advanced TypeScript",
      issuer: "TypeScript Academy",
      date: "2024",
      status: "in-progress",
      description: "Advanced TypeScript patterns, generics, and type system mastery for large-scale applications.",
      skills: ["TypeScript", "Type Systems", "Generics", "Advanced Patterns"],
      credentialId: "TS-ADV-2024-ZLH"
    },
    {
      id: 6,
      name: "Web Performance Optimization",
      issuer: "Google Developers",
      date: "2023",
      status: "completed",
      featured: true,
      description: "Comprehensive training on web performance optimization, Core Web Vitals, and modern loading strategies.",
      skills: ["Performance", "Core Web Vitals", "Optimization", "Lighthouse"],
      credentialId: "GOOGLE-PERF-2023-ZLH",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop",
      verifyUrl: "#",
      certificateUrl: "#"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement?.scrollHeight;
      
      // Calculate which milestone should be active based on scroll position
      const progress = scrollPosition / (documentHeight - windowHeight);
      const newActiveMilestone = Math.min(
        Math.floor(progress * milestones?.length),
        milestones?.length - 1
      );
      
      setActiveMilestone(Math.max(0, newActiveMilestone));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [milestones?.length]);

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(milestone);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedMilestone(null);
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      <Helmet>
        <title>Professional Story & Journey | Zaw Lynn Htet</title>
        <meta name="description" content="Explore Zaw Lynn Htet's professional journey from early programming projects to becoming a React specialist and 3D web developer. Interactive timeline showcasing growth, achievements, and cultural perspectives." />
        <meta name="keywords" content="professional journey, React developer, 3D web development, career timeline, Myanmar developer, cultural background, skills progression" />
        <meta property="og:title" content="Professional Story & Journey - Zaw Lynn Htet" />
        <meta property="og:description" content="An immersive timeline showcasing evolution from early programming to React mastery and 3D web innovation" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/professional-story-journey" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <motion.main
          className="pt-16"
          variants={pageVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-brand-primary/5" />
            
            <div className="relative max-w-7xl mx-auto text-center">
              <motion.div variants={heroVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
                  <Icon name="MapPin" size={16} />
                  <span>Professional Journey</span>
                </div>
                
                <h1 className="font-headline font-bold text-4xl lg:text-6xl text-foreground mb-6">
                  From Code Curiosity to
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-brand-primary">
                    3D Innovation
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                  An immersive timeline showcasing my evolution from early programming projects 
                  to current expertise as a React specialist and 3D web developer, shaped by 
                  cultural heritage and global perspectives.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={16} />
                    <span>6+ Years Journey</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Award" size={16} />
                    <span>25+ Projects Completed</span>
                  </div>
                  <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Users" size={16} />
                    <span>15+ Developers Mentored</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-20 px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-headline font-semibold text-3xl text-foreground mb-4">
                  Professional Timeline
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Interactive milestones marking key achievements, major projects, and skill acquisitions 
                  throughout my development journey.
                </p>
              </div>

              {/* Timeline Container */}
              <div className="relative">
                {/* Central Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent/30 via-accent/60 to-accent/30" />

                {/* Timeline Nodes */}
                <div className="space-y-16">
                  {milestones?.map((milestone, index) => (
                    <TimelineNode
                      key={milestone?.id}
                      milestone={milestone}
                      index={index}
                      isActive={activeMilestone === index}
                      onClick={handleMilestoneClick}
                      position={index % 2 === 0 ? 'left' : 'right'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Skills Progression Section */}
          <section className="py-20 px-6 lg:px-8 bg-card/20">
            <div className="max-w-6xl mx-auto">
              <SkillsProgression />
            </div>
          </section>

          {/* Cultural Background Section */}
          <section className="py-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <CulturalBackground />
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 px-6 lg:px-8 bg-card/20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-headline font-semibold text-3xl text-foreground mb-4">
                  What Colleagues Say
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Testimonials from clients, colleagues, and team members who have experienced 
                  my work and collaborative approach firsthand.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {testimonials?.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial?.id}
                    testimonial={testimonial}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Certifications Section */}
          <section className="py-20 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-headline font-semibold text-3xl text-foreground mb-4">
                  Certifications & Learning
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Continuous learning journey documented through certifications, courses, 
                  and professional development achievements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications?.map((certification, index) => (
                  <CertificationBadge
                    key={certification?.id}
                    certification={certification}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-accent/10 via-transparent to-brand-primary/10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-headline font-semibold text-3xl text-foreground mb-6">
                  Ready to Start Your Next Chapter?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Let's collaborate on creating something extraordinary. Whether it's a cutting-edge 3D web experience or a robust React application, I'm here to bring your vision to life.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="px-8 py-3 bg-gradient-to-r from-accent to-brand-primary text-primary font-medium rounded-lg shadow-glow hover:shadow-floating transition-all duration-300 flex items-center gap-2">
                    <Icon name="MessageCircle" size={20} />
                    <span>Start a Conversation</span>
                  </button>
                  
                  <button className="px-8 py-3 border border-accent/30 text-accent hover:bg-accent/10 font-medium rounded-lg transition-all duration-300 flex items-center gap-2">
                    <Icon name="Download" size={20} />
                    <span>Download Resume</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        </motion.main>

        {/* Milestone Detail Modal */}
        <MilestoneDetail
          milestone={selectedMilestone}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      </div>
    </>
  );
};

export default ProfessionalStoryJourney;