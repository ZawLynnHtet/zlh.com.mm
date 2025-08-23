import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProjectStats = ({ stats }) => {
  const statItems = [
    {
      icon: 'Layers',
      label: 'Total Projects',
      value: stats?.totalProjects,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    },
    {
      icon: 'Activity',
      label: 'Live Applications',
      value: stats?.liveProjects,
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    {
      icon: 'Code',
      label: 'Technologies',
      value: stats?.technologies,
      color: 'text-brand-primary',
      bgColor: 'bg-brand-primary/10',
      borderColor: 'border-brand-primary/20'
    },
    {
      icon: 'Users',
      label: 'Happy Clients',
      value: stats?.clients,
      color: 'text-conversion-accent',
      bgColor: 'bg-conversion-accent/10',
      borderColor: 'border-conversion-accent/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems?.map((stat, index) => (
        <motion.div
          key={stat?.label}
          className={`relative p-4 bg-card/60 backdrop-blur-md border ${stat?.borderColor} rounded-xl overflow-hidden group cursor-pointer`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          {/* Background Glow */}
          <div className={`absolute inset-0 ${stat?.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 ${stat?.bgColor} border ${stat?.borderColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={16} className={stat?.color} />
              </div>
              
              {/* Floating Particles */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {[...Array(3)]?.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 ${stat?.color?.replace('text-', 'bg-')} rounded-full`}
                    initial={{ x: 0, y: 0, opacity: 0 }}
                    animate={{ 
                      x: Math.random() * 20 - 10,
                      y: Math.random() * 20 - 10,
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className="text-2xl font-bold text-foreground mb-1 font-headline">
              {stat?.value}
            </div>
            
            <div className="text-xs text-muted-foreground font-medium">
              {stat?.label}
            </div>
          </div>
          
          {/* Hover Effect Lines */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: stat?.color?.replace('text-', '') }}></div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectStats;