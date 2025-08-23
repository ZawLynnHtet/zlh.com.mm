import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillDetails = ({ skill, onClose, relatedProjects = [] }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [codeExample, setCodeExample] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'experience', label: 'Experience', icon: 'TrendingUp' },
    { id: 'projects', label: 'Projects', icon: 'Folder' },
    { id: 'demo', label: 'Live Demo', icon: 'Play' }
  ];

  const getCodeExample = () => {
    const examples = {
      'React': `import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};`,
      'TypeScript': `interface User {
  id: number;
  name: string;
  email: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

class UserService {
  async getUser(id: number): Promise<User> {
    const response = await fetch(\`/api/users/\${id}\`);
    return response.json();
  }
}`,
      'Node.js': `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};`,
      'Three.js': `import * as THREE from 'three';

// Create scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Create a rotating cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}`
    };
    return examples?.[skill?.name] || '// Code example not available for this skill';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card/50 rounded-lg p-4 border border-border/30">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Proficiency</span>
          </div>
          <div className="text-2xl font-headline font-bold text-accent">
            {skill?.proficiency}%
          </div>
        </div>
        
        <div className="bg-card/50 rounded-lg p-4 border border-border/30">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Experience</span>
          </div>
          <div className="text-2xl font-headline font-bold text-accent">
            {skill?.experience} years
          </div>
        </div>
        
        <div className="bg-card/50 rounded-lg p-4 border border-border/30">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Folder" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Projects</span>
          </div>
          <div className="text-2xl font-headline font-bold text-accent">
            {skill?.projectCount}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-headline font-semibold text-foreground mb-3">Description</h4>
        <p className="text-muted-foreground leading-relaxed">
          {skill?.description}
        </p>
      </div>

      <div>
        <h4 className="font-headline font-semibold text-foreground mb-3">Key Strengths</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {skill?.strengths?.map((strength, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm text-foreground">{strength}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {skill?.timeline?.map((item, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              {index < skill?.timeline?.length - 1 && (
                <div className="w-0.5 h-16 bg-border/50 mt-2"></div>
              )}
            </div>
            <div className="flex-1 pb-8">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium text-foreground">{item?.title}</h5>
                <span className="text-xs text-muted-foreground">{item?.year}</span>
              </div>
              <p className="text-sm text-muted-foreground">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-4">
      {relatedProjects?.map((project, index) => (
        <div key={index} className="bg-card/30 rounded-lg p-4 border border-border/30 hover:border-accent/30 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h5 className="font-medium text-foreground mb-1">{project?.name}</h5>
              <p className="text-sm text-muted-foreground">{project?.description}</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" iconName="ExternalLink">
                View
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {project?.technologies?.map((tech, techIndex) => (
              <span 
                key={techIndex}
                className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDemo = () => (
    <div className="space-y-4">
      <div className="bg-card/30 rounded-lg p-4 border border-border/30">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-medium text-foreground">Interactive Code Example</h5>
          <Button 
            variant="outline" 
            size="sm" 
            iconName="Copy"
            onClick={() => navigator.clipboard?.writeText(getCodeExample())}
          >
            Copy
          </Button>
        </div>
        <div className="bg-background/50 rounded-md p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-foreground whitespace-pre-wrap">
            {getCodeExample()}
          </pre>
        </div>
      </div>

      {skill?.name === 'Three.js' && (
        <div className="bg-card/30 rounded-lg p-4 border border-border/30">
          <h5 className="font-medium text-foreground mb-4">3D Demo</h5>
          <div className="w-full h-64 bg-background/50 rounded-md flex items-center justify-center">
            <div className="text-center">
              <Icon name="Box" size={48} className="text-accent mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Interactive 3D demo would render here</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'experience': return renderExperience();
      case 'projects': return renderProjects();
      case 'demo': return renderDemo();
      default: return renderOverview();
    }
  };

  if (!skill) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-4xl max-h-[90vh] bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-floating overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e?.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-brand-primary/20 rounded-lg flex items-center justify-center border border-accent/40">
              <Icon name={skill?.icon || 'Code'} size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-xl text-foreground">
                {skill?.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {skill?.category} • {skill?.proficiency}% Proficiency
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/30">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-accent border-b-2 border-accent bg-accent/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillDetails;