import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const CodeEditor = ({ 
  title, 
  initialCode, 
  language = 'javascript', 
  onCodeChange, 
  isExecutable = false,
  onExecute,
  executionResult,
  isExecuting = false
}) => {
  const [code, setCode] = useState(initialCode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lineNumbers, setLineNumbers] = useState(true);

  useEffect(() => {
    if (onCodeChange) {
      onCodeChange(code);
    }
  }, [code, onCodeChange]);

  const handleCodeChange = (e) => {
    setCode(e?.target?.value);
  };

  const handleExecute = () => {
    if (onExecute && !isExecuting) {
      onExecute(code);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(code);
  };

  const resetCode = () => {
    setCode(initialCode);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getLineCount = () => {
    return code?.split('\n')?.length;
  };

  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden transition-all duration-medium ${
      isFullscreen ? 'fixed inset-4 z-50' : 'h-full'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <h3 className="font-headline font-semibold text-foreground">{title}</h3>
          <div className="px-2 py-1 bg-accent/20 text-accent text-xs font-mono rounded">
            {language}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLineNumbers(!lineNumbers)}
            iconName={lineNumbers ? "Hash" : "AlignLeft"}
            iconSize={16}
          >
            {lineNumbers ? 'Hide' : 'Show'} Lines
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            iconName="Copy"
            iconSize={16}
          >
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetCode}
            iconName="RotateCcw"
            iconSize={16}
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            iconName={isFullscreen ? "Minimize2" : "Maximize2"}
            iconSize={16}
          >
            {isFullscreen ? 'Exit' : 'Full'}
          </Button>
        </div>
      </div>
      {/* Editor Area */}
      <div className="flex h-full">
        {/* Line Numbers */}
        {lineNumbers && (
          <div className="bg-muted/20 px-3 py-4 text-muted-foreground font-mono text-sm select-none border-r border-border">
            {Array.from({ length: getLineCount() }, (_, i) => (
              <div key={i + 1} className="leading-6 text-right">
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Code Input */}
        <div className="flex-1 relative">
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="w-full h-full p-4 bg-transparent text-foreground font-mono text-sm resize-none outline-none leading-6"
            style={{ minHeight: isFullscreen ? 'calc(100vh - 200px)' : '400px' }}
            spellCheck={false}
            placeholder="// Start coding here..."
          />
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <span>{getLineCount()} lines</span>
          <span>{code?.length} characters</span>
          <span>UTF-8</span>
        </div>
        
        {isExecutable && (
          <div className="flex items-center space-x-2">
            {executionResult && (
              <div className={`px-3 py-1 rounded text-xs font-medium ${
                executionResult?.success 
                  ? 'bg-success/20 text-success' :'bg-destructive/20 text-destructive'
              }`}>
                {executionResult?.success ? 'Success' : 'Error'}
              </div>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={handleExecute}
              loading={isExecuting}
              iconName="Play"
              iconPosition="left"
              iconSize={16}
              className="bg-accent hover:bg-accent/90 text-primary"
            >
              {isExecuting ? 'Running...' : 'Run Code'}
            </Button>
          </div>
        )}
      </div>
      {/* Execution Result */}
      {executionResult && (
        <div className="border-t border-border bg-muted/20">
          <div className="px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
            Output
          </div>
          <div className="p-4">
            <pre className={`font-mono text-sm whitespace-pre-wrap ${
              executionResult?.success ? 'text-foreground' : 'text-destructive'
            }`}>
              {executionResult?.output}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;