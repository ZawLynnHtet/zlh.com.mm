import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import CodeEditor from './CodeEditor';

const ChallengeMode = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const challenges = [
    {
      id: 1,
      title: 'Two Sum Problem',
      difficulty: 'Easy',
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
      starterCode: `function twoSum(nums, target) {
    // Your code here
    
}`,
      solution: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`,
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] }
      ],
      hints: [
        'Think about using a hash map to store numbers you\'ve seen',
        'For each number, calculate what its complement should be',
        'Check if the complement exists in your hash map'
      ]
    },
    {
      id: 2,
      title: 'Fibonacci Sequence',
      difficulty: 'Medium',
      description: `Write a function that returns the nth Fibonacci number. The Fibonacci sequence is defined as:\nF(0) = 0, F(1) = 1\nF(n) = F(n-1) + F(n-2) for n > 1\n\nOptimize your solution for better performance.\n\nExample:\nInput: n = 10\nOutput: 55`,
      starterCode: `function fibonacci(n) {
    // Your code here
    
}`,
      solution: `function fibonacci(n) {
    if (n <= 1) return n;
    
    let prev = 0;
    let curr = 1;
    
    for (let i = 2; i <= n; i++) {
        const temp = curr;
        curr = prev + curr;
        prev = temp;
    }
    
    return curr;
}`,
      testCases: [
        { input: [0], expected: 0 },
        { input: [1], expected: 1 },
        { input: [10], expected: 55 },
        { input: [15], expected: 610 }
      ],
      hints: [
        'Consider the time complexity of a recursive approach',
        'Can you solve this iteratively?',
        'You only need to keep track of the last two numbers'
      ]
    },
    {
      id: 3,
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets\n2. Open brackets must be closed in the correct order\n\nExample:\nInput: s = "()[]{}"\nOutput: true`,
      starterCode: `function isValid(s) {
    // Your code here
    
}`,
      solution: `function isValid(s) {
    const stack = [];
    const pairs = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}`,
      testCases: [
        { input: ['()'], expected: true },
        { input: ['()[]{}'], expected: true },
        { input: ['(]'], expected: false },
        { input: ['([)]'], expected: false }
      ],
      hints: [
        'Think about using a stack data structure',
        'Push opening brackets onto the stack',
        'When you see a closing bracket, check if it matches the most recent opening bracket'
      ]
    }
  ];

  const currentChallenge = challenges?.[selectedChallenge];

  useEffect(() => {
    setUserCode(currentChallenge?.starterCode);
    setResult(null);
    setShowSolution(false);
  }, [selectedChallenge]);

  const runTests = async () => {
    setIsSubmitting(true);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Create a function from user code
      const userFunction = new Function('return ' + userCode)();
      
      const testResults = currentChallenge?.testCases?.map((testCase, index) => {
        try {
          const result = Array.isArray(testCase?.input) 
            ? userFunction(...testCase?.input)
            : userFunction(testCase?.input);
          
          const passed = JSON.stringify(result) === JSON.stringify(testCase?.expected);
          
          return {
            index: index + 1,
            input: testCase?.input,
            expected: testCase?.expected,
            actual: result,
            passed
          };
        } catch (error) {
          return {
            index: index + 1,
            input: testCase?.input,
            expected: testCase?.expected,
            actual: null,
            error: error?.message,
            passed: false
          };
        }
      });
      
      const passedCount = testResults?.filter(test => test?.passed)?.length;
      const totalCount = testResults?.length;
      
      setResult({
        success: passedCount === totalCount,
        passedCount,
        totalCount,
        testResults,
        message: passedCount === totalCount 
          ? 'All tests passed! Great job!' 
          : `${passedCount}/${totalCount} tests passed. Keep trying!`
      });
    } catch (error) {
      setResult({
        success: false,
        error: error?.message,
        message: 'Code execution failed. Please check your syntax.'
      });
    }
    
    setIsSubmitting(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-success bg-success/20';
      case 'Medium': return 'text-warning bg-warning/20';
      case 'Hard': return 'text-destructive bg-destructive/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-muted/30 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Target" size={24} className="text-accent" />
            <div>
              <h3 className="font-headline font-semibold text-lg text-foreground">
                Challenge Mode
              </h3>
              <p className="text-sm text-muted-foreground">
                Test your problem-solving skills
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedChallenge}
              onChange={(e) => setSelectedChallenge(Number(e?.target?.value))}
              className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            >
              {challenges?.map((challenge, index) => (
                <option key={challenge?.id} value={index}>
                  {challenge?.title} ({challenge?.difficulty})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[600px]">
        {/* Problem Description */}
        <div className="p-6 border-r border-border overflow-y-auto">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-headline font-semibold text-xl text-foreground">
                {currentChallenge?.title}
              </h4>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentChallenge?.difficulty)}`}>
                {currentChallenge?.difficulty}
              </span>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
                {currentChallenge?.description}
              </pre>
            </div>
          </div>

          {/* Hints */}
          <div className="mb-6">
            <h5 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Lightbulb" size={16} />
              <span>Hints</span>
            </h5>
            <div className="space-y-2">
              {currentChallenge?.hints?.map((hint, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <span className="text-accent font-medium">{index + 1}.</span>
                  <span>{hint}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-foreground flex items-center space-x-2">
                <Icon name="Eye" size={16} />
                <span>Solution</span>
              </h5>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSolution(!showSolution)}
                iconName={showSolution ? "EyeOff" : "Eye"}
                iconSize={16}
              >
                {showSolution ? 'Hide' : 'Show'} Solution
              </Button>
            </div>
            
            {showSolution && (
              <div className="bg-muted/20 rounded-lg p-4">
                <pre className="text-sm font-mono text-foreground overflow-x-auto">
                  {currentChallenge?.solution}
                </pre>
              </div>
            )}
          </div>

          {/* Test Results */}
          {result && (
            <div className="mb-6">
              <h5 className="font-medium text-foreground mb-3 flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} />
                <span>Test Results</span>
              </h5>
              
              <div className={`p-4 rounded-lg border ${
                result?.success 
                  ? 'bg-success/10 border-success/20 text-success' :'bg-destructive/10 border-destructive/20 text-destructive'
              }`}>
                <p className="font-medium mb-2">{result?.message}</p>
                {result?.passedCount !== undefined && (
                  <p className="text-sm">
                    Passed: {result?.passedCount}/{result?.totalCount} tests
                  </p>
                )}
              </div>

              {result?.testResults && (
                <div className="mt-4 space-y-2">
                  {result?.testResults?.map(test => (
                    <div key={test?.index} className={`p-3 rounded border text-sm ${
                      test?.passed 
                        ? 'bg-success/10 border-success/20' :'bg-destructive/10 border-destructive/20'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon 
                          name={test?.passed ? "Check" : "X"} 
                          size={14} 
                          className={test?.passed ? 'text-success' : 'text-destructive'}
                        />
                        <span className="font-medium">Test {test?.index}</span>
                      </div>
                      <div className="text-xs space-y-1 ml-5">
                        <div>Input: {JSON.stringify(test?.input)}</div>
                        <div>Expected: {JSON.stringify(test?.expected)}</div>
                        <div>Actual: {test?.error ? `Error: ${test?.error}` : JSON.stringify(test?.actual)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Code Editor */}
        <div className="p-6">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium text-foreground">Your Solution</h5>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setUserCode(currentChallenge?.starterCode)}
                  iconName="RotateCcw"
                  iconSize={16}
                >
                  Reset
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={runTests}
                  loading={isSubmitting}
                  iconName="Play"
                  iconPosition="left"
                  iconSize={16}
                  className="bg-accent hover:bg-accent/90 text-primary"
                >
                  {isSubmitting ? 'Running Tests...' : 'Run Tests'}
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <CodeEditor
                title="Solution Editor"
                initialCode={userCode}
                language="javascript"
                onCodeChange={setUserCode}
                isExecutable={false}
                onExecute={() => {}}
                executionResult={null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeMode;