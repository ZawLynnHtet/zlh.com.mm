import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GitHubActivity = () => {
  const [commits, setCommits] = useState([]);
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState('all');
  const [isLive, setIsLive] = useState(true);

  // Mock GitHub data
  const mockCommits = [
    {
      id: '1a2b3c4d',
      message: 'feat: Add interactive 3D portfolio components with Three.js integration',
      author: 'Zaw Lynn Htet',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      repository: 'portfolio-3d',
      branch: 'main',
      additions: 245,
      deletions: 12,
      files: ['src/components/Scene3D.jsx', 'src/hooks/useThreeJS.js', 'package.json']
    },
    {
      id: '2b3c4d5e',
      message: 'fix: Resolve performance issues in algorithm visualizer',
      author: 'Zaw Lynn Htet',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      repository: 'code-laboratory',
      branch: 'feature/optimization',
      additions: 67,
      deletions: 34,
      files: ['src/components/AlgorithmVisualizer.jsx', 'src/utils/performance.js']
    },
    {
      id: '3c4d5e6f',
      message: 'docs: Update README with deployment instructions and API documentation',
      author: 'Zaw Lynn Htet',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      repository: 'react-dashboard',
      branch: 'main',
      additions: 156,
      deletions: 8,
      files: ['README.md', 'docs/api.md', 'docs/deployment.md']
    },
    {
      id: '4d5e6f7g',
      message: 'refactor: Implement custom hooks for better state management',
      author: 'Zaw Lynn Htet',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      repository: 'portfolio-3d',
      branch: 'refactor/hooks',
      additions: 189,
      deletions: 267,
      files: ['src/hooks/usePortfolio.js', 'src/hooks/useAnimation.js', 'src/components/Portfolio.jsx']
    },
    {
      id: '5e6f7g8h',
      message: 'test: Add comprehensive unit tests for utility functions',
      author: 'Zaw Lynn Htet',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      repository: 'code-laboratory',
      branch: 'testing/utils',
      additions: 234,
      deletions: 5,
      files: ['src/utils/__tests__/helpers.test.js', 'src/utils/__tests__/algorithms.test.js']
    },
    {
      id: '6f7g8h9i',
      message: 'style: Implement dark theme with CSS custom properties',
      author: 'Zaw Lynn Htet',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      repository: 'react-dashboard',
      branch: 'feature/dark-theme',
      additions: 123,
      deletions: 45,
      files: ['src/styles/theme.css', 'src/components/ThemeProvider.jsx']
    }
  ];

  const mockRepositories = [
    {
      name: 'portfolio-3d',
      description: 'Interactive 3D developer portfolio built with React and Three.js',
      language: 'JavaScript',
      stars: 42,
      forks: 8,
      lastUpdate: new Date(Date.now() - 300000),
      isPrivate: false
    },
    {
      name: 'code-laboratory',
      description: 'Interactive coding environment with algorithm visualizations',
      language: 'TypeScript',
      stars: 28,
      forks: 5,
      lastUpdate: new Date(Date.now() - 1800000),
      isPrivate: false
    },
    {
      name: 'react-dashboard',
      description: 'Modern dashboard template with advanced data visualization',
      language: 'JavaScript',
      stars: 156,
      forks: 23,
      lastUpdate: new Date(Date.now() - 14400000),
      isPrivate: false
    }
  ];

  useEffect(() => {
    setCommits(mockCommits);
    setRepositories(mockRepositories);
  }, []);

  const filteredCommits = selectedRepo === 'all' 
    ? commits 
    : commits?.filter(commit => commit?.repository === selectedRepo);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getCommitTypeIcon = (message) => {
    if (message?.startsWith('feat:')) return 'Plus';
    if (message?.startsWith('fix:')) return 'Wrench';
    if (message?.startsWith('docs:')) return 'FileText';
    if (message?.startsWith('style:')) return 'Palette';
    if (message?.startsWith('refactor:')) return 'RefreshCw';
    if (message?.startsWith('test:')) return 'TestTube';
    return 'GitCommit';
  };

  const getCommitTypeColor = (message) => {
    if (message?.startsWith('feat:')) return 'text-success';
    if (message?.startsWith('fix:')) return 'text-warning';
    if (message?.startsWith('docs:')) return 'text-accent';
    if (message?.startsWith('style:')) return 'text-purple-400';
    if (message?.startsWith('refactor:')) return 'text-blue-400';
    if (message?.startsWith('test:')) return 'text-green-400';
    return 'text-muted-foreground';
  };

  const getLanguageColor = (language) => {
    switch (language) {
      case 'JavaScript': return 'bg-yellow-500';
      case 'TypeScript': return 'bg-blue-500';
      case 'Python': return 'bg-green-500';
      case 'React': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-muted/30 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Github" size={24} className="text-foreground" />
            <div>
              <h3 className="font-headline font-semibold text-lg text-foreground">
                GitHub Activity
              </h3>
              <p className="text-sm text-muted-foreground">
                Real-time development activity
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
              isLive ? 'bg-success/20 text-success' : 'bg-muted/20 text-muted-foreground'
            }`}>
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
              <span className="text-xs font-medium">{isLive ? 'Live' : 'Offline'}</span>
            </div>
            
            <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e?.target?.value)}
              className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            >
              <option value="all">All Repositories</option>
              {repositories?.map(repo => (
                <option key={repo?.name} value={repo?.name}>
                  {repo?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 h-96">
        {/* Repositories Panel */}
        <div className="p-6 border-r border-border overflow-y-auto">
          <h4 className="font-medium text-foreground mb-4">Active Repositories</h4>
          <div className="space-y-3">
            {repositories?.map(repo => (
              <div key={repo?.name} className="bg-muted/10 border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="GitBranch" size={16} className="text-muted-foreground" />
                    <h5 className="font-medium text-sm text-foreground">{repo?.name}</h5>
                  </div>
                  {!repo?.isPrivate && (
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="Star" size={12} />
                      <span>{repo?.stars}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {repo?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getLanguageColor(repo?.language)}`}></div>
                    <span className="text-xs text-muted-foreground">{repo?.language}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(repo?.lastUpdate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commits Feed */}
        <div className="col-span-2 p-6 overflow-y-auto">
          <h4 className="font-medium text-foreground mb-4">Recent Commits</h4>
          <div className="space-y-4">
            {filteredCommits?.map(commit => (
              <div key={commit?.id} className="bg-muted/10 border border-border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getCommitTypeIcon(commit?.message)} 
                    size={16} 
                    className={`mt-1 ${getCommitTypeColor(commit?.message)}`}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded">
                          {commit?.id}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {commit?.repository}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {commit?.branch}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(commit?.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-foreground mb-3 font-medium">
                      {commit?.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Plus" size={12} className="text-success" />
                          <span>{commit?.additions}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Minus" size={12} className="text-destructive" />
                          <span>{commit?.deletions}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="File" size={12} />
                          <span>{commit?.files?.length} files</span>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        iconSize={12}
                        className="text-xs"
                      >
                        View
                      </Button>
                    </div>
                    
                    {commit?.files?.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <div className="flex flex-wrap gap-1">
                          {commit?.files?.slice(0, 3)?.map(file => (
                            <span key={file} className="text-xs bg-muted/20 text-muted-foreground px-2 py-1 rounded font-mono">
                              {file}
                            </span>
                          ))}
                          {commit?.files?.length > 3 && (
                            <span className="text-xs text-muted-foreground px-2 py-1">
                              +{commit?.files?.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              iconName="Github"
              iconPosition="left"
              iconSize={16}
            >
              View Full GitHub Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubActivity;