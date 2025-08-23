import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ComponentPlayground = () => {
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [props, setProps] = useState({
    text: 'Click Me',
    variant: 'default',
    size: 'default',
    disabled: false,
    loading: false,
    icon: 'none'
  });

  const componentTemplates = {
    button: {
      name: 'Interactive Button',
      props: {
        text: { type: 'text', default: 'Click Me', label: 'Button Text' },
        variant: { 
          type: 'select', 
          default: 'default', 
          options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
          label: 'Variant'
        },
        size: { 
          type: 'select', 
          default: 'default', 
          options: ['xs', 'sm', 'default', 'lg', 'xl'],
          label: 'Size'
        },
        disabled: { type: 'boolean', default: false, label: 'Disabled' },
        loading: { type: 'boolean', default: false, label: 'Loading State' },
        icon: { 
          type: 'select', 
          default: 'none', 
          options: ['none', 'Plus', 'Download', 'Send', 'Heart', 'Star'],
          label: 'Icon'
        }
      }
    },
    card: {
      name: 'Dynamic Card',
      props: {
        title: { type: 'text', default: 'Card Title', label: 'Title' },
        description: { type: 'textarea', default: 'This is a sample card description that demonstrates the component.', label: 'Description' },
        imageUrl: { type: 'text', default: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', label: 'Image URL' },
        showImage: { type: 'boolean', default: true, label: 'Show Image' },
        showFooter: { type: 'boolean', default: true, label: 'Show Footer' },
        elevation: { 
          type: 'select', 
          default: 'medium', 
          options: ['none', 'low', 'medium', 'high'],
          label: 'Shadow Elevation'
        }
      }
    },
    form: {
      name: 'Form Elements',
      props: {
        labelText: { type: 'text', default: 'Email Address', label: 'Label Text' },
        placeholder: { type: 'text', default: 'Enter your email', label: 'Placeholder' },
        inputType: { 
          type: 'select', 
          default: 'email', 
          options: ['text', 'email', 'password', 'number', 'tel'],
          label: 'Input Type'
        },
        required: { type: 'boolean', default: false, label: 'Required Field' },
        disabled: { type: 'boolean', default: false, label: 'Disabled' },
        error: { type: 'text', default: '', label: 'Error Message' },
        description: { type: 'text', default: 'We will never share your email', label: 'Help Text' }
      }
    }
  };

  useEffect(() => {
    const template = componentTemplates?.[selectedComponent];
    const newProps = {};
    Object.keys(template?.props)?.forEach(key => {
      newProps[key] = template?.props?.[key]?.default;
    });
    setProps(newProps);
  }, [selectedComponent]);

  const handlePropChange = (propName, value) => {
    setProps(prev => ({
      ...prev,
      [propName]: value
    }));
  };

  const generateCode = () => {
    const template = componentTemplates?.[selectedComponent];
    let code = '';

    switch (selectedComponent) {
      case 'button':
        code = `<Button
  variant="${props?.variant}"
  size="${props?.size}"${props?.disabled ? '\n  disabled' : ''}${props?.loading ? '\n  loading' : ''}${props?.icon !== 'none' ? `\n  iconName="${props?.icon}"\n  iconPosition="left"` : ''}
>
  ${props?.text}
</Button>`;
        break;
      case 'card':
        code = `<div className="bg-card border border-border rounded-xl overflow-hidden${props?.elevation === 'low' ? ' shadow-sm' : props?.elevation === 'medium' ? ' shadow-md' : props?.elevation === 'high' ? ' shadow-lg' : ''}">
  ${props?.showImage ? `<img 
    src="${props?.imageUrl}" 
    alt="${props?.title}"
    className="w-full h-48 object-cover"
  />` : ''}
  <div className="p-6">
    <h3 className="font-headline font-semibold text-lg text-foreground mb-2">
      ${props?.title}
    </h3>
    <p className="text-muted-foreground">
      ${props?.description}
    </p>
  </div>
  ${props?.showFooter ? `<div className="px-6 py-4 bg-muted/20 border-t border-border">
    <Button variant="outline" size="sm">Learn More</Button>
  </div>` : ''}
</div>`;
        break;
      case 'form':
        code = `<Input
  label="${props?.labelText}"
  type="${props?.inputType}"
  placeholder="${props?.placeholder}"${props?.required ? '\n  required' : ''}${props?.disabled ? '\n  disabled' : ''}${props?.error ? `\n  error="${props?.error}"` : ''}${props?.description ? `\n  description="${props?.description}"` : ''}
/>`;
        break;
    }

    return code;
  };

  const renderPreview = () => {
    const template = componentTemplates?.[selectedComponent];

    switch (selectedComponent) {
      case 'button':
        return (
          <div className="flex items-center justify-center p-8">
            <Button
              variant={props?.variant}
              size={props?.size}
              disabled={props?.disabled}
              loading={props?.loading}
              iconName={props?.icon !== 'none' ? props?.icon : undefined}
              iconPosition={props?.icon !== 'none' ? 'left' : undefined}
            >
              {props?.text}
            </Button>
          </div>
        );
      case 'card':
        return (
          <div className="p-4">
            <div className={`bg-card border border-border rounded-xl overflow-hidden max-w-sm mx-auto ${
              props?.elevation === 'low' ? 'shadow-sm' : 
              props?.elevation === 'medium' ? 'shadow-md' : 
              props?.elevation === 'high' ? 'shadow-lg' : ''
            }`}>
              {props?.showImage && (
                <img 
                  src={props?.imageUrl} 
                  alt={props?.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="font-headline font-semibold text-lg text-foreground mb-2">
                  {props?.title}
                </h3>
                <p className="text-muted-foreground">
                  {props?.description}
                </p>
              </div>
              {props?.showFooter && (
                <div className="px-6 py-4 bg-muted/20 border-t border-border">
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>
              )}
            </div>
          </div>
        );
      case 'form':
        return (
          <div className="p-8 max-w-sm mx-auto">
            <Input
              label={props?.labelText}
              type={props?.inputType}
              placeholder={props?.placeholder}
              required={props?.required}
              disabled={props?.disabled}
              error={props?.error || undefined}
              description={props?.description || undefined}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderPropControls = () => {
    const template = componentTemplates?.[selectedComponent];
    
    return Object.entries(template?.props)?.map(([propName, propConfig]) => {
      switch (propConfig?.type) {
        case 'text':
          return (
            <Input
              key={propName}
              label={propConfig?.label}
              type="text"
              value={props?.[propName]}
              onChange={(e) => handlePropChange(propName, e?.target?.value)}
              className="mb-4"
            />
          );
        case 'textarea':
          return (
            <div key={propName} className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                {propConfig?.label}
              </label>
              <textarea
                value={props?.[propName]}
                onChange={(e) => handlePropChange(propName, e?.target?.value)}
                className="w-full p-3 bg-input border border-border rounded-lg text-foreground resize-none"
                rows={3}
              />
            </div>
          );
        case 'select':
          return (
            <div key={propName} className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                {propConfig?.label}
              </label>
              <select
                value={props?.[propName]}
                onChange={(e) => handlePropChange(propName, e?.target?.value)}
                className="w-full p-3 bg-input border border-border rounded-lg text-foreground"
              >
                {propConfig?.options?.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        case 'boolean':
          return (
            <div key={propName} className="mb-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={props?.[propName]}
                  onChange={(e) => handlePropChange(propName, e?.target?.checked)}
                  className="w-4 h-4 text-accent bg-input border-border rounded focus:ring-accent"
                />
                <span className="text-sm font-medium text-foreground">
                  {propConfig?.label}
                </span>
              </label>
            </div>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-muted/30 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-semibold text-lg text-foreground">
            Component Playground
          </h3>
          <div className="flex items-center space-x-2">
            <select
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e?.target?.value)}
              className="bg-input border border-border rounded-lg px-3 py-2 text-sm text-foreground"
            >
              {Object.entries(componentTemplates)?.map(([key, template]) => (
                <option key={key} value={key}>
                  {template?.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 h-96">
        {/* Props Panel */}
        <div className="p-6 border-r border-border overflow-y-auto">
          <h4 className="font-medium text-foreground mb-4">Properties</h4>
          {renderPropControls()}
        </div>

        {/* Preview Panel */}
        <div className="bg-muted/10 flex items-center justify-center border-r border-border">
          <div className="w-full">
            <div className="text-center mb-4">
              <h4 className="font-medium text-foreground">Live Preview</h4>
            </div>
            {renderPreview()}
          </div>
        </div>

        {/* Code Panel */}
        <div className="p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Generated Code</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard?.writeText(generateCode())}
              iconName="Copy"
              iconSize={16}
            >
              Copy
            </Button>
          </div>
          <pre className="bg-muted/20 p-4 rounded-lg text-sm font-mono text-foreground overflow-x-auto">
            {generateCode()}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ComponentPlayground;