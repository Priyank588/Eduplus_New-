import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DemoCredentials = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: 'Student',
      email: 'student@eduplus.com',
      password: 'student123',
      icon: 'BookOpen',
      color: 'text-blue-600'
    },
    {
      role: 'Teacher',
      email: 'teacher@eduplus.com',
      password: 'teacher123',
      icon: 'GraduationCap',
      color: 'text-emerald-600'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-3"
      >
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} />
          <span className="text-sm font-medium">Demo Credentials</span>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={16} 
        />
      </Button>
      {isExpanded && (
        <div className="mt-3 p-4 bg-muted/30 border border-border rounded-lg space-y-4">
          <p className="text-xs text-muted-foreground text-center mb-3">
            Use these credentials to explore the platform
          </p>
          
          {credentials?.map((cred, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={cred?.icon} size={16} className={cred?.color} />
                <span className="text-sm font-semibold text-foreground">
                  {cred?.role} Account
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Email:</span>
                  <div className="flex items-center space-x-1">
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      {cred?.email}
                    </code>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(cred?.email)}
                      className="w-6 h-6"
                    >
                      <Icon name="Copy" size={12} />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Password:</span>
                  <div className="flex items-center space-x-1">
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      {cred?.password}
                    </code>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(cred?.password)}
                      className="w-6 h-6"
                    >
                      <Icon name="Copy" size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;