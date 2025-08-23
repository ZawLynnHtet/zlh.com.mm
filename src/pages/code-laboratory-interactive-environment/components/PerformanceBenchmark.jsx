import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceBenchmark = () => {
  const [selectedBenchmark, setSelectedBenchmark] = useState('array-operations');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [iterations, setIterations] = useState(10000);

  const benchmarks = {
    'array-operations': {
      name: 'Array Operations',
      description: 'Compare performance of different array manipulation methods',
      tests: [
        {
          name: 'for loop',
          code: `for (let i = 0; i < arr.length; i++) {
  result.push(arr[i] * 2);
}`,
          fn: (arr) => {
            let result = [];
            for (let i = 0; i < arr?.length; i++) {
              result?.push(arr?.[i] * 2);
            }
            return result;
          }
        },
        {
          name: 'map method',
          code: `arr.map(x => x * 2)`,
          fn: (arr) => arr?.map(x => x * 2)
        },
        {
          name: 'forEach',
          code: `arr.forEach(x => result.push(x * 2))`,
          fn: (arr) => {
            let result = [];
            arr?.forEach(x => result?.push(x * 2));
            return result;
          }
        },
        {
          name: 'for...of',
          code: `for (const item of arr) {
  result.push(item * 2);
}`,
          fn: (arr) => {
            let result = [];
            for (const item of arr) {
              result?.push(item * 2);
            }
            return result;
          }
        }
      ]
    },
    'string-operations': {
      name: 'String Operations',
      description: 'Compare string concatenation and manipulation performance',
      tests: [
        {
          name: 'String concatenation (+)',
          code: `let result = '';
for (let i = 0; i < 1000; i++) {
  result += 'test';
}`,
          fn: () => {
            let result = '';
            for (let i = 0; i < 1000; i++) {
              result += 'test';
            }
            return result;
          }
        },
        {
          name: 'Array join',
          code: `const arr = [];
for (let i = 0; i < 1000; i++) {
  arr.push('test');
}
return arr.join('');`,
          fn: () => {
            const arr = [];
            for (let i = 0; i < 1000; i++) {
              arr?.push('test');
            }
            return arr?.join('');
          }
        },
        {
          name: 'Template literals',
          code: `let result = '';
for (let i = 0; i < 1000; i++) {
  result = \`\${result}test\`;
}`,
          fn: () => {
            let result = '';
            for (let i = 0; i < 1000; i++) {
              result = `${result}test`;
            }
            return result;
          }
        }
      ]
    },
    'object-operations': {
      name: 'Object Operations',
      description: 'Compare object creation and property access methods',
      tests: [
        {
          name: 'Object literal',
          code: `const obj = { a: 1, b: 2, c: 3 };`,
          fn: () => {
            const obj = { a: 1, b: 2, c: 3 };
            return obj;
          }
        },
        {
          name: 'Object.create',
          code: `const obj = Object.create(null);
obj.a = 1; obj.b = 2; obj.c = 3;`,
          fn: () => {
            const obj = Object.create(null);
            obj.a = 1; obj.b = 2; obj.c = 3;
            return obj;
          }
        },
        {
          name: 'new Object()',
          code: `const obj = new Object();
obj.a = 1; obj.b = 2; obj.c = 3;`,
          fn: () => {
            const obj = new Object();
            obj.a = 1; obj.b = 2; obj.c = 3;
            return obj;
          }
        },
        {
          name: 'Object.assign',
          code: `const obj = Object.assign({}, { a: 1, b: 2, c: 3 });`,
          fn: () => {
            const obj = Object.assign({}, { a: 1, b: 2, c: 3 });
            return obj;
          }
        }
      ]
    }
  };

  const runBenchmark = async () => {
    setIsRunning(true);
    setResults(null);

    const benchmark = benchmarks?.[selectedBenchmark];
    const testResults = [];

    // Prepare test data
    const testData = selectedBenchmark === 'array-operations' 
      ? Array.from({ length: 1000 }, (_, i) => i)
      : null;

    for (const test of benchmark?.tests) {
      const times = [];
      
      // Warm up
      for (let i = 0; i < 100; i++) {
        if (selectedBenchmark === 'array-operations') {
          test?.fn([...testData]);
        } else {
          test?.fn();
        }
      }

      // Actual benchmark
      for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        
        if (selectedBenchmark === 'array-operations') {
          test?.fn([...testData]);
        } else {
          test?.fn();
        }
        
        const end = performance.now();
        times?.push(end - start);
      }

      const avgTime = times?.reduce((a, b) => a + b, 0) / times?.length;
      const minTime = Math.min(...times);
      const maxTime = Math.max(...times);

      testResults?.push({
        name: test?.name,
        code: test?.code,
        avgTime,
        minTime,
        maxTime,
        opsPerSecond: 1000 / avgTime
      });

      // Allow UI to update
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Sort by performance (fastest first)
    testResults?.sort((a, b) => a?.avgTime - b?.avgTime);

    setResults({
      benchmark: benchmark?.name,
      tests: testResults,
      fastest: testResults?.[0],
      slowest: testResults?.[testResults?.length - 1]
    });

    setIsRunning(false);
  };

  const formatTime = (time) => {
    if (time < 0.001) return `${(time * 1000000)?.toFixed(2)}ns`;
    if (time < 1) return `${(time * 1000)?.toFixed(2)}μs`;
    return `${time?.toFixed(3)}ms`;
  };

  const formatOps = (ops) => {
    if (ops > 1000000) return `${(ops / 1000000)?.toFixed(2)}M ops/sec`;
    if (ops > 1000) return `${(ops / 1000)?.toFixed(2)}K ops/sec`;
    return `${ops?.toFixed(0)} ops/sec`;
  };

  const getPerformanceColor = (time, fastest, slowest) => {
    const ratio = (time - fastest) / (slowest - fastest);
    if (ratio < 0.2) return 'text-success';
    if (ratio < 0.5) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-muted/30 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline font-semibold text-lg text-foreground">
              Performance Benchmark
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {benchmarks?.[selectedBenchmark]?.description}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-muted-foreground">Iterations:</label>
              <select
                value={iterations}
                onChange={(e) => setIterations(Number(e?.target?.value))}
                className="bg-input border border-border rounded px-2 py-1 text-sm text-foreground"
                disabled={isRunning}
              >
                <option value={1000}>1,000</option>
                <option value={10000}>10,000</option>
                <option value={100000}>100,000</option>
              </select>
            </div>
            <select
              value={selectedBenchmark}
              onChange={(e) => setSelectedBenchmark(e?.target?.value)}
              className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground"
              disabled={isRunning}
            >
              {Object.entries(benchmarks)?.map(([key, benchmark]) => (
                <option key={key} value={key}>
                  {benchmark?.name}
                </option>
              ))}
            </select>
            <Button
              variant="default"
              onClick={runBenchmark}
              loading={isRunning}
              iconName="Play"
              iconPosition="left"
              iconSize={16}
              className="bg-accent hover:bg-accent/90 text-primary"
            >
              {isRunning ? 'Running...' : 'Run Benchmark'}
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {!results && !isRunning && (
          <div className="text-center py-12">
            <Icon name="Zap" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium text-foreground mb-2">Ready to Benchmark</h4>
            <p className="text-muted-foreground">
              Click "Run Benchmark" to start performance testing
            </p>
          </div>
        )}

        {isRunning && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              <span className="text-foreground">Running benchmark tests...</span>
            </div>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Trophy" size={20} className="text-success" />
                  <h4 className="font-medium text-success">Fastest</h4>
                </div>
                <p className="font-mono text-sm text-foreground">{results?.fastest?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatTime(results?.fastest?.avgTime)} avg
                </p>
              </div>

              <div className="bg-muted/20 border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="BarChart3" size={20} className="text-muted-foreground" />
                  <h4 className="font-medium text-foreground">Tests Run</h4>
                </div>
                <p className="font-mono text-sm text-foreground">{results?.tests?.length}</p>
                <p className="text-xs text-muted-foreground">
                  {iterations?.toLocaleString()} iterations each
                </p>
              </div>

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="TrendingDown" size={20} className="text-destructive" />
                  <h4 className="font-medium text-destructive">Slowest</h4>
                </div>
                <p className="font-mono text-sm text-foreground">{results?.slowest?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatTime(results?.slowest?.avgTime)} avg
                </p>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Detailed Results</h4>
              {results?.tests?.map((test, index) => (
                <div key={test?.name} className="bg-muted/10 border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-success text-success-foreground' :
                        index === 1 ? 'bg-warning text-warning-foreground': 'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <h5 className="font-medium text-foreground">{test?.name}</h5>
                    </div>
                    <div className="text-right">
                      <p className={`font-mono text-sm ${getPerformanceColor(test?.avgTime, results?.fastest?.avgTime, results?.slowest?.avgTime)}`}>
                        {formatTime(test?.avgTime)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatOps(test?.opsPerSecond)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 rounded p-3 mb-3">
                    <pre className="text-xs font-mono text-foreground overflow-x-auto">
                      {test?.code}
                    </pre>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Min: </span>
                      <span className="font-mono text-foreground">{formatTime(test?.minTime)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg: </span>
                      <span className="font-mono text-foreground">{formatTime(test?.avgTime)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max: </span>
                      <span className="font-mono text-foreground">{formatTime(test?.maxTime)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceBenchmark;