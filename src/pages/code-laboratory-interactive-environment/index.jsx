import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CodeEditor from './components/CodeEditor';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import ComponentPlayground from './components/ComponentPlayground';
import PerformanceBenchmark from './components/PerformanceBenchmark';
import GitHubActivity from './components/GitHubActivity';
import ChallengeMode from './components/ChallengeMode';

const CodeLaboratoryInteractiveEnvironment = () => {
  const [activeStation, setActiveStation] = useState('algorithm-playground');
  const [algorithmData, setAlgorithmData] = useState([64, 34, 25, 12, 22, 11, 90, 5]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');

  const stations = [
    {
      id: 'algorithm-playground',
      name: 'Algorithm Playground',
      icon: 'BarChart3',
      description: 'Interactive sorting algorithm visualizations',
      color: 'text-accent'
    },
    {
      id: 'component-builder',
      name: 'Component Builder',
      icon: 'Layers',
      description: 'Build and customize React components',
      color: 'text-success'
    },
    {
      id: 'code-editor',
      name: 'Code Editor',
      icon: 'Code',
      description: 'Interactive code editor with syntax highlighting',
      color: 'text-warning'
    },
    {
      id: 'performance-lab',
      name: 'Performance Lab',
      icon: 'Zap',
      description: 'Benchmark and optimize code performance',
      color: 'text-purple-400'
    },
    {
      id: 'github-stream',
      name: 'GitHub Stream',
      icon: 'Github',
      description: 'Live development activity feed',
      color: 'text-blue-400'
    },
    {
      id: 'challenge-mode',
      name: 'Challenge Mode',
      icon: 'Target',
      description: 'Coding challenges and problem solving',
      color: 'text-red-400'
    }
  ];

  const codeExamples = {
    'react-hook': {
      title: 'Custom React Hook - useLocalStorage',
      code: `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key "' + key + '":', error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage key "' + key + '":', error);
    }
  };

  return [storedValue, setValue];
}

// Usage example:
function App() {
  const [name, setName] = useLocalStorage('name', 'Anonymous');
  
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Hello {name}!</p>
    </div>
  );
}`
    },
    'algorithm': {
      title: 'Binary Search Implementation',
      code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid; // Found the target
    }
    
    if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }
  
  return -1; // Target not found
}

// Time Complexity: O(log n)
// Space Complexity: O(1)

// Usage example:
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const targetValue = 7;

const result = binarySearch(sortedArray, targetValue);
console.log(result); // Output: 3 (index of target value)

// Performance comparison with linear search:
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

// Binary search is much faster for large sorted arrays!`
    },
    'optimization': {
      title: 'React Performance Optimization',
      code: `import React, { memo, useMemo, useCallback, useState } from 'react';

// Memoized component to prevent unnecessary re-renders
const ExpensiveComponent = memo(({ data, onItemClick }) => {
  // Expensive calculation that only runs when data changes
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return data.map(item => ({
      ...item,
      processed: true,
      timestamp: Date.now()
    }));
  }, [data]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name} - {item.processed ? 'Processed' : 'Raw'}
        </div>
      ))}
    </div>
  );
});

function ParentComponent() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);
  const [count, setCount] = useState(0);

  // Memoized callback to prevent child re-renders
  const handleItemClick = useCallback((itemId) => {
    console.log('Clicked item:', itemId);
    // Handle item click logic here
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      
      {/* This component won't re-render when count changes */}
      <ExpensiveComponent 
        data={items} 
        onItemClick={handleItemClick} 
      />
    </div>
  );
}

// Key optimization techniques:
// 1. React.memo() - Prevents re-renders when props haven't changed
// 2. useMemo() - Memoizes expensive calculations
// 3. useCallback() - Memoizes function references
// 4. Proper key props for list items
// 5. Code splitting with React.lazy() and Suspense`
    }
  };

  const [selectedExample, setSelectedExample] = useState('react-hook');
  const [executionResult, setExecutionResult] = useState(null);

  const handleCodeExecution = (code) => {
    setExecutionResult({
      success: true,
      output: 'Code executed successfully!\n\nThis is a demonstration of the interactive code execution feature. In a real implementation, this would run the actual code and show the results.'
    });
  };

  const renderStationContent = () => {
    switch (activeStation) {
      case 'algorithm-playground':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline font-semibold text-xl text-foreground mb-2">
                  Algorithm Playground
                </h3>
                <p className="text-muted-foreground">
                  Visualize sorting algorithms and understand their behavior step by step
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e?.target?.value)}
                  className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                >
                  <option value="bubble">Bubble Sort</option>
                  <option value="quick">Quick Sort</option>
                </select>
              </div>
            </div>
            <AlgorithmVisualizer 
              algorithm={selectedAlgorithm}
              data={algorithmData}
              onDataChange={setAlgorithmData}
            />
          </div>
        );

      case 'component-builder':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-headline font-semibold text-xl text-foreground mb-2">
                React Component Builder
              </h3>
              <p className="text-muted-foreground">
                Build and customize React components with real-time preview and code generation
              </p>
            </div>
            <ComponentPlayground />
          </div>
        );

      case 'code-editor':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline font-semibold text-xl text-foreground mb-2">
                  Interactive Code Editor
                </h3>
                <p className="text-muted-foreground">
                  Explore code examples with syntax highlighting and execution capabilities
                </p>
              </div>
              <select
                value={selectedExample}
                onChange={(e) => setSelectedExample(e?.target?.value)}
                className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground"
              >
                <option value="react-hook">Custom React Hook</option>
                <option value="algorithm">Binary Search Algorithm</option>
                <option value="optimization">Performance Optimization</option>
              </select>
            </div>
            <CodeEditor
              title={codeExamples?.[selectedExample]?.title}
              initialCode={codeExamples?.[selectedExample]?.code}
              language="javascript"
              isExecutable={true}
              onExecute={handleCodeExecution}
              onCodeChange={() => {}}
              executionResult={executionResult}
            />
          </div>
        );

      case 'performance-lab':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-headline font-semibold text-xl text-foreground mb-2">
                Performance Laboratory
              </h3>
              <p className="text-muted-foreground">
                Benchmark different approaches and optimize code performance
              </p>
            </div>
            <PerformanceBenchmark />
          </div>
        );

      case 'github-stream':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-headline font-semibold text-xl text-foreground mb-2">
                GitHub Activity Stream
              </h3>
              <p className="text-muted-foreground">
                Real-time development activity and repository insights
              </p>
            </div>
            <GitHubActivity />
          </div>
        );

      case 'challenge-mode':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-headline font-semibold text-xl text-foreground mb-2">
                Challenge Mode
              </h3>
              <p className="text-muted-foreground">
                Test your problem-solving skills with coding challenges
              </p>
            </div>
            <ChallengeMode />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Code Laboratory - Interactive Development Environment | ZawLynn Portfolio</title>
        <meta name="description" content="Explore interactive coding environment with algorithm visualizations, React component builder, performance benchmarks, and coding challenges. Experience hands-on development tools and techniques." />
        <meta name="keywords" content="code laboratory, algorithm visualization, React components, performance optimization, coding challenges, interactive development" />
      </Helmet>
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="Code" size={16} />
              <span>Interactive Development Environment</span>
            </div>
            
            <h1 className="font-headline font-bold text-4xl lg:text-6xl text-foreground mb-6">
              Code Laboratory
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Dive into an interactive coding environment where algorithms come to life, 
              components are built in real-time, and performance is measured with precision. 
              Experience the art of software development through hands-on exploration.
            </p>
          </div>

          {/* Station Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {stations?.map((station) => (
              <button
                key={station?.id}
                onClick={() => setActiveStation(station?.id)}
                className={`p-4 rounded-xl border transition-all duration-medium hover:scale-105 ${
                  activeStation === station?.id
                    ? 'bg-accent/10 border-accent/30 shadow-glow'
                    : 'bg-card/50 border-border hover:bg-card/80 hover:border-border/60'
                }`}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className={`p-3 rounded-lg ${
                    activeStation === station?.id 
                      ? 'bg-accent/20' :'bg-muted/20'
                  }`}>
                    <Icon 
                      name={station?.icon} 
                      size={24} 
                      className={activeStation === station?.id ? 'text-accent' : station?.color}
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-sm text-foreground mb-1">
                      {station?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {station?.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Active Station Content */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
            {renderStationContent()}
          </div>
        </div>
      </section>
      {/* Development Philosophy */}
      <section className="py-24 px-6 lg:px-8 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline font-bold text-3xl text-foreground mb-6">
            Development Philosophy
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            "Great code is not just functional—it's elegant, efficient, and educational. 
            Every algorithm tells a story, every optimization reveals an insight, 
            and every challenge overcome builds character."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Lightbulb" size={24} className="text-accent" />
              </div>
              <h3 className="font-headline font-semibold text-lg text-foreground mb-2">
                Learn by Doing
              </h3>
              <p className="text-muted-foreground">
                Interactive exploration beats passive reading. 
                Touch, modify, and experiment with real code.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Zap" size={24} className="text-success" />
              </div>
              <h3 className="font-headline font-semibold text-lg text-foreground mb-2">
                Performance Matters
              </h3>
              <p className="text-muted-foreground">
                Measure, optimize, and understand the impact 
                of every line of code you write.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-warning" />
              </div>
              <h3 className="font-headline font-semibold text-lg text-foreground mb-2">
                Share Knowledge
              </h3>
              <p className="text-muted-foreground">
                The best way to master something is to 
                teach it to others through clear examples.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline font-bold text-3xl text-foreground mb-6">
            Ready to Collaborate?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's build something amazing together. Whether it's optimizing performance, 
            solving complex algorithms, or creating beautiful user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              variant="default"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="bg-gradient-to-r from-accent to-brand-primary hover:from-accent/90 hover:to-brand-primary/90 text-primary shadow-glow"
            >
              Start a Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="Github"
              iconPosition="left"
              className="border-accent/30 text-accent hover:bg-accent/10"
            >
              View Source Code
            </Button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date()?.getFullYear()} ZawLynn Portfolio. Crafted with passion for code and innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CodeLaboratoryInteractiveEnvironment;