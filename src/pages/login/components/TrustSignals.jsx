import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustItems = [
    {
      icon: 'Shield',
      text: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      text: 'Privacy Protected',
      description: 'GDPR compliant'
    },
    {
      icon: 'Award',
      text: 'Certified Platform',
      description: 'Educational standards'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-6">
          {trustItems?.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-1 group">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className="text-primary" 
                />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-foreground">
                  {item?.text}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;