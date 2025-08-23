import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ filters, activeFilters, onFilterChange, onClearAll }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const filterCategories = [
    {
      id: 'category',
      label: 'Project Type',
      icon: 'Layers',
      options: filters?.categories
    },
    {
      id: 'technology',
      label: 'Technology Stack',
      icon: 'Code',
      options: filters?.technologies
    },
    {
      id: 'industry',
      label: 'Industry',
      icon: 'Building',
      options: filters?.industries
    },
    {
      id: 'status',
      label: 'Status',
      icon: 'Activity',
      options: filters?.statuses
    }
  ];

  const handleFilterToggle = (category, value) => {
    const currentFilters = activeFilters?.[category] || [];
    const newFilters = currentFilters?.includes(value)
      ? currentFilters?.filter(f => f !== value)
      : [...currentFilters, value];
    
    onFilterChange(category, newFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.reduce((count, filters) => count + filters?.length, 0);
  };

  return (
    <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent/20 border border-accent/30 rounded-lg flex items-center justify-center">
              <Icon name="Filter" size={16} className="text-accent" />
            </div>
            <div>
              <h3 className="font-headline font-semibold text-foreground">Filters</h3>
              {getActiveFilterCount() > 0 && (
                <p className="text-xs text-muted-foreground">
                  {getActiveFilterCount()} active filter{getActiveFilterCount() !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {getActiveFilterCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden"
            >
              <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Filter Content */}
      <AnimatePresence>
        <motion.div
          className={`${isExpanded ? 'block' : 'hidden'} lg:block`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 space-y-6">
            {filterCategories?.map((category) => (
              <div key={category?.id}>
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name={category?.icon} size={16} className="text-accent" />
                  <h4 className="font-medium text-foreground text-sm">{category?.label}</h4>
                </div>
                
                <div className="space-y-2">
                  {category?.options?.map((option) => {
                    const isActive = activeFilters?.[category?.id]?.includes(option?.value) || false;
                    
                    return (
                      <motion.button
                        key={option?.value}
                        onClick={() => handleFilterToggle(category?.id, option?.value)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${
                          isActive
                            ? 'bg-accent/10 border border-accent/20 text-accent' :'bg-background/50 border border-border/20 text-muted-foreground hover:text-foreground hover:bg-card/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            isActive ? 'border-accent bg-accent' : 'border-border'
                          }`}>
                            {isActive && (
                              <Icon name="Check" size={10} className="text-primary" />
                            )}
                          </div>
                          <span className="text-sm font-medium">{option?.label}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isActive 
                            ? 'bg-accent/20 text-accent' :'bg-muted/20 text-muted-foreground'
                        }`}>
                          {option?.count}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {/* Quick Filters */}
            <div className="pt-4 border-t border-border/30">
              <h4 className="font-medium text-foreground text-sm mb-3 flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-accent" />
                <span>Quick Filters</span>
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Live Projects', value: 'live', icon: 'Activity' },
                  { label: 'Recent', value: 'recent', icon: 'Clock' },
                  { label: 'Featured', value: 'featured', icon: 'Star' },
                  { label: 'Open Source', value: 'opensource', icon: 'Github' }
                ]?.map((quick) => {
                  const isActive = activeFilters?.quick?.includes(quick?.value) || false;
                  
                  return (
                    <motion.button
                      key={quick?.value}
                      onClick={() => handleFilterToggle('quick', quick?.value)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-accent/10 border border-accent/20 text-accent' :'bg-background/50 border border-border/20 text-muted-foreground hover:text-foreground'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon name={quick?.icon} size={12} />
                      <span>{quick?.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FilterPanel;