import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TechnologyFilter = ({ technologies, selectedTech, onTechSelect, experimentCounts }) => {
  const techCategories = {
    'WebXR': { icon: 'Glasses', color: 'text-purple-400' },
    'AI/ML': { icon: 'Brain', color: 'text-green-400' },
    'WebGL': { icon: 'Zap', color: 'text-yellow-400' },
    'WebAssembly': { icon: 'Cpu', color: 'text-blue-400' },
    'WebRTC': { icon: 'Video', color: 'text-red-400' },
    'PWA': { icon: 'Smartphone', color: 'text-indigo-400' },
    'Blockchain': { icon: 'Link', color: 'text-orange-400' },
    'IoT': { icon: 'Wifi', color: 'text-teal-400' },
    'Edge Computing': { icon: 'Server', color: 'text-pink-400' },
    'Quantum': { icon: 'Atom', color: 'text-cyan-400' }
  };

  return (
    <div className="bg-card/60 backdrop-blur-md border border-border/30 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-headline font-semibold text-lg text-foreground">
          Technology Focus
        </h3>
        {selectedTech?.length > 0 && (
          <button
            onClick={() => onTechSelect([])}
            className="text-sm text-muted-foreground hover:text-accent transition-colors duration-fast"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="space-y-2">
        {technologies?.map((tech, index) => {
          const isSelected = selectedTech?.includes(tech);
          const techInfo = techCategories?.[tech] || { icon: 'Code', color: 'text-accent' };
          const count = experimentCounts?.[tech] || 0;
          
          return (
            <motion.button
              key={tech}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => {
                if (isSelected) {
                  onTechSelect(selectedTech?.filter(t => t !== tech));
                } else {
                  onTechSelect([...selectedTech, tech]);
                }
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-fast ${
                isSelected
                  ? 'bg-accent/10 border-accent/30 text-accent' :'bg-muted/20 border-border/30 text-muted-foreground hover:bg-muted/30 hover:text-foreground'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={techInfo?.icon} 
                  size={18} 
                  className={isSelected ? 'text-accent' : techInfo?.color}
                />
                <span className="font-medium">{tech}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isSelected 
                    ? 'bg-accent/20 text-accent' :'bg-muted/30 text-muted-foreground'
                }`}>
                  {count}
                </span>
                {isSelected && (
                  <Icon name="Check" size={16} className="text-accent" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
      {/* Innovation Stats */}
      <div className="mt-6 pt-4 border-t border-border/30">
        <h4 className="text-sm font-medium text-foreground mb-3">Innovation Metrics</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-lg font-semibold text-accent">
              {technologies?.length}
            </div>
            <div className="text-xs text-muted-foreground">Technologies</div>
          </div>
          <div className="text-center p-3 bg-muted/20 rounded-lg">
            <div className="text-lg font-semibold text-success">
              {Object.values(experimentCounts)?.reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Experiments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyFilter;