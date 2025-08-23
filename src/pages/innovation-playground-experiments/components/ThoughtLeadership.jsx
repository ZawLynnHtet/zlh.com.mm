import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThoughtLeadership = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "The Future of WebXR: Beyond Gaming",
      excerpt: `WebXR is evolving beyond entertainment into practical business applications.\nExploring enterprise use cases, technical challenges, and implementation strategies for immersive web experiences.`,
      category: "WebXR",
      readTime: "8 min read",
      date: "Dec 15, 2024",
      tags: ["WebXR", "Enterprise", "Future Tech"],
      views: 2847,
      likes: 156,
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=400&h=200&fit=crop"
    },
    {
      id: 2,
      title: "React 19 and the Evolution of Component Architecture",
      excerpt: `Analyzing React 19's new features and their impact on modern web development.\nServer Components, Concurrent Features, and the future of React ecosystem.`,
      category: "React",
      readTime: "12 min read",
      date: "Dec 10, 2024",
      tags: ["React", "Architecture", "Performance"],
      views: 4521,
      likes: 298,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
    },
    {
      id: 3,
      title: "WebAssembly in Production: Lessons Learned",
      excerpt: `Real-world experiences implementing WebAssembly in high-performance web applications.\nPerformance benchmarks, integration challenges, and best practices.`,
      category: "WebAssembly",
      readTime: "15 min read",
      date: "Dec 5, 2024",
      tags: ["WebAssembly", "Performance", "Production"],
      views: 3214,
      likes: 187,
      image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=200&fit=crop"
    },
    {
      id: 4,
      title: "AI-Powered Development Tools: The New Reality",
      excerpt: `How AI is transforming the developer experience and code quality.\nFrom GitHub Copilot to custom AI assistants, exploring the impact on productivity.`,
      category: "AI/ML",
      readTime: "10 min read",
      date: "Nov 28, 2024",
      tags: ["AI", "Developer Tools", "Productivity"],
      views: 5632,
      likes: 423,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
    }
  ];

  const insights = [
    {
      title: "Web Technology Trends 2025",
      points: [
        "WebXR adoption in enterprise applications",
        "Edge computing integration with React",
        "AI-assisted development workflows",
        "Quantum computing web interfaces"
      ],
      icon: "TrendingUp"
    },
    {
      title: "Performance Optimization",
      points: [
        "WebAssembly for compute-intensive tasks",
        "Edge-side rendering strategies",
        "Progressive loading techniques",
        "Memory management in 3D applications"
      ],
      icon: "Zap"
    },
    {
      title: "Developer Experience",
      points: [
        "AI-powered code generation",
        "Real-time collaboration tools",
        "Automated testing strategies",
        "Cross-platform development"
      ],
      icon: "Code"
    }
  ];

  const categoryColors = {
    "WebXR": "bg-purple-500/10 text-purple-400 border-purple-500/30",
    "React": "bg-blue-500/10 text-blue-400 border-blue-500/30",
    "WebAssembly": "bg-green-500/10 text-green-400 border-green-500/30",
    "AI/ML": "bg-orange-500/10 text-orange-400 border-orange-500/30"
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-headline font-semibold text-3xl text-foreground mb-4"
        >
          Thought Leadership
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground max-w-2xl mx-auto"
        >
          Insights on emerging technologies, development practices, and the future of web development
        </motion.p>
      </div>
      {/* Featured Articles */}
      <div className="grid lg:grid-cols-2 gap-6">
        {articles?.map((article, index) => (
          <motion.article
            key={article?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card/60 backdrop-blur-md border border-border/30 rounded-xl overflow-hidden hover:bg-card/80 hover:border-accent/30 transition-all duration-medium group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={article?.image}
                alt={article?.title}
                className="w-full h-full object-cover transition-transform duration-medium group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border ${categoryColors?.[article?.category]}`}>
                {article?.category}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{article?.date}</span>
                  <span>•</span>
                  <span>{article?.readTime}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{article?.views?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={12} />
                    <span>{article?.likes}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="font-headline font-semibold text-lg text-foreground mb-3 group-hover:text-accent transition-colors duration-fast">
                {article?.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {article?.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article?.tags?.slice(0, 2)?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-accent hover:text-accent/80"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={14}
                >
                  Read More
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      {/* Industry Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        {insights?.map((insight, index) => (
          <motion.div
            key={insight?.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6 hover:bg-card/80 hover:border-accent/30 transition-all duration-medium"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name={insight?.icon} size={20} className="text-accent" />
              </div>
              <h3 className="font-headline font-semibold text-foreground">
                {insight?.title}
              </h3>
            </div>
            
            <ul className="space-y-2">
              {insight?.points?.map((point, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <Icon name="ChevronRight" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-accent/10 to-brand-primary/10 border border-accent/30 rounded-xl p-8 text-center"
      >
        <Icon name="Mail" size={48} className="text-accent mx-auto mb-4" />
        <h3 className="font-headline font-semibold text-xl text-foreground mb-2">
          Stay Updated
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Get the latest insights on web development trends, experimental technologies, and innovation updates.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
          <Button
            variant="default"
            className="bg-accent hover:bg-accent/90 text-primary"
            iconName="Send"
            iconPosition="right"
            iconSize={16}
          >
            Subscribe
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThoughtLeadership;