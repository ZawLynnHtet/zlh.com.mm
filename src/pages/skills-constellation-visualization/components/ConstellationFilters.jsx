import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';


const ConstellationFilters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange
}) => {
  const sortOptions = [
    { value: 'proficiency', label: 'Proficiency', icon: 'TrendingUp' },
    { value: 'experience', label: 'Experience', icon: 'Clock' },
    { value: 'projects', label: 'Projects', icon: 'Folder' },
    { value: 'alphabetical', label: 'A-Z', icon: 'ArrowUpDown' }
  ];

  const viewModes = [
    { value: 'constellation', label: 'Constellation', icon: 'Sparkles' },
    { value: 'grid', label: 'Grid', icon: 'Grid3X3' },
    { value: 'tree', label: 'Tree', icon: 'GitBranch' }
  ];

  return (
    <motion.div
      className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-floating"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === 'all' ?'bg-accent text-primary shadow-glow' :'bg-background/50 text-muted-foreground hover:text-foreground hover:bg-card/50 border border-border/30'
            }`}
          >
            All Skills
          </button>
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category?.id
                  ? 'bg-accent text-primary shadow-glow'
                  : 'bg-background/50 text-muted-foreground hover:text-foreground hover:bg-card/50 border border-border/30'
              }`}
            >
              <Icon name={category?.icon} size={14} />
              <span>{category?.name}</span>
              <span className="text-xs opacity-75">({category?.count})</span>
            </button>
          ))}
        </div>

        {/* View Mode & Sort */}
        <div className="flex items-center space-x-4">
          
          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort:</span>
            <div className="flex rounded-lg border border-border/30 overflow-hidden">
              {sortOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => onSortChange(option?.value)}
                  className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium transition-all ${
                    sortBy === option?.value
                      ? 'bg-accent text-primary' :'bg-background/50 text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }`}
                  title={option?.label}
                >
                  <Icon name={option?.icon} size={12} />
                  <span className="hidden sm:inline">{option?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">View:</span>
            <div className="flex rounded-lg border border-border/30 overflow-hidden">
              {viewModes?.map((mode) => (
                <button
                  key={mode?.value}
                  onClick={() => onViewModeChange(mode?.value)}
                  className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-medium transition-all ${
                    viewMode === mode?.value
                      ? 'bg-accent text-primary' :'bg-background/50 text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }`}
                  title={mode?.label}
                >
                  <Icon name={mode?.icon} size={12} />
                  <span className="hidden sm:inline">{mode?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || searchTerm) && (
        <motion.div
          className="mt-4 pt-4 border-t border-border/30"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="px-2 py-1 bg-accent/10 text-accent rounded-md flex items-center space-x-1">
                <span>{categories?.find(c => c?.id === selectedCategory)?.name}</span>
                <button
                  onClick={() => onCategoryChange('all')}
                  className="hover:text-accent/80 transition-colors"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="px-2 py-1 bg-accent/10 text-accent rounded-md flex items-center space-x-1">
                <span>"{searchTerm}"</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="hover:text-accent/80 transition-colors"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                onCategoryChange('all');
                onSearchChange('');
              }}
              className="text-muted-foreground hover:text-foreground transition-colors text-xs underline"
            >
              Clear all
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ConstellationFilters;