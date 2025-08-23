import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, suggestions = [], isLoading = false }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [query, onSearch]);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setQuery(value);
    setShowSuggestions(value?.length > 0 && suggestions?.length > 0);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions?.[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef?.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion?.text);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSearch(suggestion?.text);
    inputRef?.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onSearch('');
    inputRef?.current?.focus();
  };

  const handleFocus = () => {
    if (query?.length > 0 && suggestions?.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = (e) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef?.current?.contains(e?.relatedTarget)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Icon name="Search" size={20} className="text-muted-foreground" />
          )}
        </div>
        
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search projects by name, technology, or keyword..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="pl-12 pr-12 h-12 bg-card/60 backdrop-blur-md border-border/30 rounded-xl text-foreground placeholder-muted-foreground focus:border-accent/50 focus:ring-accent/20"
        />
        
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>
      {/* Search Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-popover/95 backdrop-blur-md border border-border/30 rounded-xl shadow-floating overflow-hidden z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              {suggestions?.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-150 ${
                    index === selectedIndex
                      ? 'bg-accent/10 text-accent' :'text-popover-foreground hover:bg-muted/50'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    suggestion?.type === 'project' ? 'bg-accent/20 border border-accent/30' :
                    suggestion?.type === 'technology'? 'bg-brand-primary/20 border border-brand-primary/30' : 'bg-muted/20 border border-border/30'
                  }`}>
                    <Icon 
                      name={
                        suggestion?.type === 'project' ? 'Layers' :
                        suggestion?.type === 'technology'? 'Code' : 'Search'
                      } 
                      size={16} 
                      className={
                        suggestion?.type === 'project' ? 'text-accent' :
                        suggestion?.type === 'technology'? 'text-brand-primary' : 'text-muted-foreground'
                      }
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-sm">{suggestion?.text}</div>
                    {suggestion?.description && (
                      <div className="text-xs text-muted-foreground">{suggestion?.description}</div>
                    )}
                  </div>
                  
                  {suggestion?.count && (
                    <div className="text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded">
                      {suggestion?.count}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Search Tips */}
            <div className="border-t border-border/30 p-3 bg-muted/10">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Lightbulb" size={12} />
                <span>Try searching for "React", "Next.js", "E-commerce", or project names</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;