import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const InnovationMetrics = ({ experiments }) => {
  const metrics = {
    totalExperiments: experiments?.length,
    activeProjects: experiments?.filter(exp => exp?.status === 'active')?.length,
    technologiesExplored: [...new Set(experiments.flatMap(exp => exp.technologies))]?.length,
    avgComplexity: experiments?.reduce((acc, exp) => acc + parseInt(exp?.complexity), 0) / experiments?.length,
    avgPerformance: experiments?.reduce((acc, exp) => acc + parseInt(exp?.performance), 0) / experiments?.length,
    avgInnovation: experiments?.reduce((acc, exp) => acc + parseInt(exp?.innovation), 0) / experiments?.length,
    totalStars: experiments?.reduce((acc, exp) => acc + exp?.stars, 0),
    totalForks: experiments?.reduce((acc, exp) => acc + exp?.forks, 0)
  };

  const metricCards = [
    {
      title: 'Total Experiments',
      value: metrics?.totalExperiments,
      icon: 'Beaker',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30'
    },
    {
      title: 'Active Projects',
      value: metrics?.activeProjects,
      icon: 'Zap',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30'
    },
    {
      title: 'Technologies',
      value: metrics?.technologiesExplored,
      icon: 'Code',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30'
    },
    {
      title: 'Avg Complexity',
      value: `${metrics?.avgComplexity?.toFixed(1)}/10`,
      icon: 'Brain',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      borderColor: 'border-purple-400/30'
    },
    {
      title: 'Performance Score',
      value: `${metrics?.avgPerformance?.toFixed(1)}/10`,
      icon: 'Gauge',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30'
    },
    {
      title: 'Innovation Index',
      value: `${metrics?.avgInnovation?.toFixed(1)}/10`,
      icon: 'Lightbulb',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      borderColor: 'border-orange-400/30'
    },
    {
      title: 'Community Stars',
      value: metrics?.totalStars,
      icon: 'Star',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30'
    },
    {
      title: 'Project Forks',
      value: metrics?.totalForks,
      icon: 'GitFork',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30'
    }
  ];

  return (
    <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline font-semibold text-xl text-foreground">
            Innovation Dashboard
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time metrics from experimental projects
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live Data</span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards?.map((metric, index) => (
          <motion.div
            key={metric?.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`relative p-4 rounded-lg border ${metric?.bgColor} ${metric?.borderColor} group hover:scale-105 transition-transform duration-fast`}
          >
            <div className="flex items-center justify-between mb-2">
              <Icon 
                name={metric?.icon} 
                size={20} 
                className={metric?.color}
              />
              <div className={`w-8 h-8 rounded-full ${metric?.bgColor} flex items-center justify-center`}>
                <Icon 
                  name={metric?.icon} 
                  size={14} 
                  className={metric?.color}
                />
              </div>
            </div>
            
            <div className="text-2xl font-bold text-foreground mb-1">
              {metric?.value}
            </div>
            
            <div className="text-xs text-muted-foreground">
              {metric?.title}
            </div>
            
            {/* Hover Effect */}
            <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-fast ${metric?.bgColor?.replace('/10', '/20')}`}></div>
          </motion.div>
        ))}
      </div>
      {/* Innovation Timeline */}
      <div className="mt-8 pt-6 border-t border-border/30">
        <h3 className="font-medium text-foreground mb-4">Innovation Timeline</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border/50"></div>
          <div className="space-y-4">
            {experiments?.slice(0, 3)?.map((experiment, index) => (
              <motion.div
                key={experiment?.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative flex items-center space-x-4"
              >
                <div className={`w-8 h-8 rounded-full border-2 border-accent bg-background flex items-center justify-center z-10`}>
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground text-sm">
                      {experiment?.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {experiment?.date}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {experiment?.category} • {experiment?.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationMetrics;