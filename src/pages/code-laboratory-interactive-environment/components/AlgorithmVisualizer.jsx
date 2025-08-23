import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlgorithmVisualizer = ({ algorithm, data, onDataChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [steps, setSteps] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  // Bubble Sort Algorithm with steps
  const bubbleSort = (arr) => {
    const steps = [];
    const array = [...arr];
    const n = array?.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps?.push({
          array: [...array],
          comparing: [j, j + 1],
          swapped: false,
          step: steps?.length + 1,
          description: `Comparing elements at positions ${j} and ${j + 1}`
        });

        if (array?.[j] > array?.[j + 1]) {
          [array[j], array[j + 1]] = [array?.[j + 1], array?.[j]];
          steps?.push({
            array: [...array],
            comparing: [j, j + 1],
            swapped: true,
            step: steps?.length + 1,
            description: `Swapped elements: ${array?.[j + 1]} and ${array?.[j]}`
          });
        }
      }
    }

    steps?.push({
      array: [...array],
      comparing: [],
      swapped: false,
      step: steps?.length + 1,
      description: 'Sorting complete!',
      complete: true
    });

    return steps;
  };

  // Quick Sort Algorithm with steps
  const quickSort = (arr) => {
    const steps = [];
    const array = [...arr];

    const quickSortHelper = (low, high) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    };

    const partition = (low, high) => {
      const pivot = array?.[high];
      let i = low - 1;

      steps?.push({
        array: [...array],
        pivot: high,
        comparing: [],
        step: steps?.length + 1,
        description: `Pivot selected: ${pivot} at position ${high}`
      });

      for (let j = low; j < high; j++) {
        steps?.push({
          array: [...array],
          pivot: high,
          comparing: [j],
          step: steps?.length + 1,
          description: `Comparing ${array?.[j]} with pivot ${pivot}`
        });

        if (array?.[j] < pivot) {
          i++;
          [array[i], array[j]] = [array?.[j], array?.[i]];
          steps?.push({
            array: [...array],
            pivot: high,
            comparing: [i, j],
            swapped: true,
            step: steps?.length + 1,
            description: `Swapped ${array?.[j]} and ${array?.[i]}`
          });
        }
      }

      [array[i + 1], array[high]] = [array?.[high], array?.[i + 1]];
      steps?.push({
        array: [...array],
        pivot: i + 1,
        comparing: [i + 1, high],
        swapped: true,
        step: steps?.length + 1,
        description: `Placed pivot ${pivot} in correct position`
      });

      return i + 1;
    };

    quickSortHelper(0, array?.length - 1);
    
    steps?.push({
      array: [...array],
      comparing: [],
      step: steps?.length + 1,
      description: 'Quick sort complete!',
      complete: true
    });

    return steps;
  };

  useEffect(() => {
    if (algorithm === 'bubble') {
      setSteps(bubbleSort(data));
    } else if (algorithm === 'quick') {
      setSteps(quickSort(data));
    }
    setCurrentStep(0);
    setIsComplete(false);
    setIsPlaying(false);
  }, [algorithm, data]);

  useEffect(() => {
    let interval;
    if (isPlaying && currentStep < steps?.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          const next = prev + 1;
          if (next >= steps?.length - 1) {
            setIsPlaying(false);
            setIsComplete(true);
          }
          return next;
        });
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps?.length, speed]);

  const handlePlay = () => {
    if (isComplete) {
      setCurrentStep(0);
      setIsComplete(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsComplete(false);
  };

  const handleStepForward = () => {
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStep + 1 >= steps?.length - 1) {
        setIsComplete(true);
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsComplete(false);
    }
  };

  const generateRandomData = () => {
    const newData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
    onDataChange(newData);
  };

  const currentStepData = steps?.[currentStep] || { array: data, comparing: [], description: 'Ready to start' };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-headline font-semibold text-lg text-foreground mb-1">
            {algorithm === 'bubble' ? 'Bubble Sort' : 'Quick Sort'} Visualization
          </h3>
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps?.length}: {currentStepData?.description}
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={generateRandomData}
          iconName="Shuffle"
          iconPosition="left"
          iconSize={16}
        >
          Random Data
        </Button>
      </div>
      {/* Array Visualization */}
      <div className="mb-6">
        <div className="flex items-end justify-center space-x-2 h-64 bg-muted/20 rounded-lg p-4">
          {currentStepData?.array?.map((value, index) => {
            const isComparing = currentStepData?.comparing?.includes(index);
            const isPivot = currentStepData?.pivot === index;
            const height = (value / Math.max(...currentStepData?.array)) * 200;
            
            return (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 transition-all duration-300"
              >
                <div
                  className={`w-8 rounded-t transition-all duration-300 flex items-end justify-center text-xs font-bold ${
                    isPivot
                      ? 'bg-warning text-warning-foreground'
                      : isComparing
                      ? currentStepData?.swapped
                        ? 'bg-success text-success-foreground'
                        : 'bg-accent text-accent-foreground'
                      : isComplete
                      ? 'bg-success text-success-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                  style={{ height: `${height}px` }}
                >
                  {value}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {index}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStepBackward}
            disabled={currentStep === 0}
            iconName="SkipBack"
            iconSize={16}
          />
          <Button
            variant="default"
            size="sm"
            onClick={handlePlay}
            iconName={isPlaying ? "Pause" : isComplete ? "RotateCcw" : "Play"}
            iconSize={16}
            className="bg-accent hover:bg-accent/90 text-primary"
          >
            {isPlaying ? 'Pause' : isComplete ? 'Restart' : 'Play'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStepForward}
            disabled={currentStep >= steps?.length - 1}
            iconName="SkipForward"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            iconName="Square"
            iconSize={16}
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Gauge" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Speed:</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e?.target?.value))}
              className="bg-input border border-border rounded px-2 py-1 text-sm text-foreground"
            >
              <option value={1000}>Slow</option>
              <option value={500}>Normal</option>
              <option value={200}>Fast</option>
              <option value={100}>Very Fast</option>
            </select>
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded"></div>
          <span className="text-muted-foreground">Default</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-accent rounded"></div>
          <span className="text-muted-foreground">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded"></div>
          <span className="text-muted-foreground">Swapped/Sorted</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-warning rounded"></div>
          <span className="text-muted-foreground">Pivot</span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;