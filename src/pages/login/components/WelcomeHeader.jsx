import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        {/* <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-primary-foreground"
            fill="currentColor"
          >
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
            <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          
        </div> */}
        <img
            src="/assets/images/sihlogo.png" 
            alt="Edu+ Logo"
            className="w-20 h-20 object-contain"
          />
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground font-heading">
          Welcome to EduPlus
        </h1>
        <p className="text-muted-foreground text-lg">
          Your comprehensive educational management platform
        </p>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Sign in to access your personalized dashboard and track your academic journey
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span>Attendance Tracking</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Target" size={14} />
          <span>Skills Planning</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="TrendingUp" size={14} />
          <span>Progress Analytics</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;