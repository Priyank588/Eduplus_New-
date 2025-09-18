import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ userRole = 'student', isCollapsed = false, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({});

  const studentNavItems = [
    {
      label: 'Overview',
      icon: 'LayoutDashboard',
      path: '/student-dashboard',
      description: 'Your academic dashboard'
    },
    {
      label: 'My Attendance',
      icon: 'Calendar',
      path: '/attendance-calendar',
      description: 'Track your attendance'
    },
    {
      label: 'Skills Planner',
      icon: 'Target',
      path: '/skills-planner',
      description: 'Plan your skill development'
    },
    {
      label: 'My Profile',
      icon: 'User',
      path: '/student-profile',
      description: 'Manage your profile'
    }
  ];

  const teacherNavItems = [
    {
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/teacher-dashboard',
      description: 'Teaching overview'
    },
    {
      label: 'Attendance',
      icon: 'Calendar',
      path: '/attendance-calendar',
      description: 'Manage student attendance'
    },
    {
      label: 'Students',
      icon: 'Users',
      path: '/student-profile',
      description: 'Student management'
    }
  ];

  const navItems = userRole === 'teacher' ? teacherNavItems : studentNavItems;

  const quickActions = userRole === 'student' 
    ? [
        { label: 'View Progress', icon: 'TrendingUp', action: () => navigate('/student-dashboard') },
        { label: 'New Goal', icon: 'Plus', action: () => navigate('/skills-planner') }
      ]
    : [
        { label: 'Take Attendance', icon: 'CheckSquare', action: () => navigate('/attendance-calendar') },
        { label: 'View Reports', icon: 'BarChart3', action: () => navigate('/teacher-dashboard') }
      ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex-col transition-all duration-300 ease-out-custom ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      } bg-card border-r border-border`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                  <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-foreground font-heading">
                EduPlus
              </span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="flex-shrink-0"
          >
            <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {/* Main Navigation */}
          <div className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Navigation
              </h3>
            )}
            
            {navItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <Button
                  variant={isActivePath(item?.path) ? "default" : "ghost"}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full justify-start transition-all duration-150 ${
                    isCollapsed ? 'px-3' : 'px-3'
                  }`}
                >
                  <Icon name={item?.icon} size={18} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium">{item?.label}</span>
                  )}
                </Button>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                    <span className="text-sm font-medium text-popover-foreground">{item?.label}</span>
                    <div className="text-xs text-muted-foreground mt-1">{item?.description}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="pt-6">
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Quick Actions
              </h3>
            )}
            
            <div className="space-y-1">
              {quickActions?.map((action, index) => (
                <div key={index} className="relative group">
                  <Button
                    variant="ghost"
                    onClick={action?.action}
                    className={`w-full justify-start transition-all duration-150 ${
                      isCollapsed ? 'px-3' : 'px-3'
                    }`}
                  >
                    <Icon name={action?.icon} size={18} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="ml-3 font-medium">{action?.label}</span>
                    )}
                  </Button>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-elevation-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                      <span className="text-sm font-medium text-popover-foreground">{action?.label}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* User Role Indicator */}
        {!isCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon 
                  name={userRole === 'teacher' ? 'GraduationCap' : 'BookOpen'} 
                  size={16} 
                  className="text-primary-foreground" 
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground capitalize">
                  {userRole} Portal
                </p>
                <p className="text-xs text-muted-foreground">
                  {userRole === 'teacher' ? 'Manage & Track' : 'Learn & Grow'}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border">
        <nav className="flex items-center justify-around px-2 py-2">
          {navItems?.slice(0, 4)?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              onClick={() => handleNavigation(item?.path)}
              className="flex flex-col items-center space-y-1 px-3 py-2 min-w-0 flex-1"
            >
              <Icon name={item?.icon} size={18} />
              <span className="text-xs font-medium truncate">{item?.label}</span>
            </Button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;