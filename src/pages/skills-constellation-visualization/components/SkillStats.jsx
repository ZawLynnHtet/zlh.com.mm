import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillStats = ({ skills, selectedCategory }) => {
  const calculateStats = () => {
    const filteredSkills = selectedCategory === 'all' 
      ? skills 
      : skills?.filter(skill => skill?.category === selectedCategory);

    const totalSkills = filteredSkills?.length;
    const averageProficiency = filteredSkills?.reduce((sum, skill) => sum + skill?.proficiency, 0) / totalSkills;
    const totalExperience = filteredSkills?.reduce((sum, skill) => sum + skill?.experience, 0);
    const totalProjects = filteredSkills?.reduce((sum, skill) => sum + skill?.projectCount, 0);
    const newSkills = filteredSkills?.filter(skill => skill?.isNew)?.length;
    
    const categoryBreakdown = skills?.reduce((acc, skill) => {
      acc[skill.category] = (acc?.[skill?.category] || 0) + 1;
      return acc;
    }, {});

    const topSkills = [...filteredSkills]?.sort((a, b) => b?.proficiency - a?.proficiency)?.slice(0, 5);

    return {
      totalSkills,
      averageProficiency: Math.round(averageProficiency),
      totalExperience,
      totalProjects,
      newSkills,
      categoryBreakdown,
      topSkills
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Total Skills',
      value: stats?.totalSkills,
      icon: 'Target',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: `+${stats?.newSkills} new`
    },
    {
      title: 'Avg Proficiency',
      value: `${stats?.averageProficiency}%`,
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: 'Growing'
    },
    {
      title: 'Total Experience',
      value: `${stats?.totalExperience}y`,
      icon: 'Clock',
      color: 'text-brand-primary',
      bgColor: 'bg-brand-primary/10',
      change: 'Combined'
    },
    {
      title: 'Projects Built',
      value: stats?.totalProjects,
      icon: 'Folder',
      color: 'text-conversion-accent',
      bgColor: 'bg-conversion-accent/10',
      change: 'Delivered'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards?.map((stat, index) => (
          <motion.div
            key={stat?.title}
            className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-4 hover:border-accent/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div className="text-xs text-muted-foreground">
                {stat?.change}
              </div>
            </div>
            <div className="space-y-1">
              <div className={`text-2xl font-headline font-bold ${stat?.color}`}>
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.title}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Category Breakdown */}
      <motion.div
        className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="PieChart" size={20} className="text-accent" />
          <h3 className="font-headline font-semibold text-foreground">
            Skills by Category
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(stats?.categoryBreakdown)?.map(([category, count], index) => {
            const percentage = (count / stats?.totalSkills) * 100;
            const categoryIcons = {
              'Frontend': 'Monitor',
              'Backend': 'Server',
              'Database': 'Database',
              'DevOps': 'Cloud',
              'Mobile': 'Smartphone',
              'Design': 'Palette',
              'Tools': 'Wrench'
            };
            
            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={categoryIcons?.[category] || 'Code'} 
                      size={16} 
                      className="text-accent" 
                    />
                    <span className="text-sm font-medium text-foreground">
                      {category}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {count} ({Math.round(percentage)}%)
                  </div>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-gradient-to-r from-accent to-brand-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
      {/* Top Skills */}
      <motion.div
        className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Award" size={20} className="text-accent" />
          <h3 className="font-headline font-semibold text-foreground">
            Top Skills by Proficiency
          </h3>
        </div>
        
        <div className="space-y-3">
          {stats?.topSkills?.map((skill, index) => (
            <div key={skill?.id} className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-6 h-6 bg-accent/20 text-accent rounded-full text-xs font-bold">
                {index + 1}
              </div>
              
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-brand-primary/20 rounded-lg flex items-center justify-center border border-accent/40">
                  <Icon name={skill?.icon || 'Code'} size={16} className="text-accent" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{skill?.name}</span>
                    <span className="text-sm text-accent font-mono">{skill?.proficiency}%</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{skill?.experience} years</span>
                    <span>•</span>
                    <span>{skill?.projectCount} projects</span>
                    {skill?.isNew && (
                      <>
                        <span>•</span>
                        <span className="text-conversion-accent">New</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="w-20 bg-background/50 rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-accent to-brand-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill?.proficiency}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SkillStats;