import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'student', userName = 'John Doe', isCollapsed = false, onToggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const teacherNavItems = [
    { label: 'Dashboard', path: '/teacher-dashboard', icon: 'LayoutDashboard' },
    { label: 'Attendance', path: '/attendance-calendar', icon: 'Calendar' },
    { label: 'Students', path: '/student-profile', icon: 'Users' },
  ];

  const studentNavItems = [
    { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
    { label: 'My Attendance', path: '/attendance-calendar', icon: 'Calendar' },
    { label: 'Skills Planner', path: '/skills-planner', icon: 'Target' },
    { label: 'Profile', path: '/student-profile', icon: 'User' },
  ];

  const navItems = userRole === 'teacher' ? teacherNavItems : studentNavItems;

  const handleNavigation = (path) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    // Close the user menu
    setShowUserMenu(false);
    
    // Navigate to login page
    navigate('/login');
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          {userRole && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="lg:hidden"
            >
              <Icon name="Menu" size={20} />
            </Button>
          )}
          
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate(userRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard')}
          >
            {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-primary-foreground"
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
            <span className="text-xl font-semibold text-foreground font-heading">
              EduPlus
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        {userRole && (
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center space-x-2 px-4 py-2"
              >
                <Icon name={item?.icon} size={16} />
                <span className="font-medium">{item?.label}</span>
              </Button>
            ))}
          </nav>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {userRole && (
            <>
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative"
                >
                  <Icon name="Bell" size={20} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-accent-foreground rounded-full"></span>
                  </span>
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg shadow-elevation-2 z-50">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-semibold text-popover-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-border hover:bg-muted transition-colors duration-150">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium text-popover-foreground">
                              {userRole === 'teacher' ? 'New attendance submission' : 'Skill assessment available'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-b border-border hover:bg-muted transition-colors duration-150">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="text-sm font-medium text-popover-foreground">
                              {userRole === 'teacher' ? 'Weekly report ready' : 'Achievement unlocked!'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t border-border">
                      <Button variant="ghost" size="sm" fullWidth>
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {userName?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                  </div>
                  <Icon name="ChevronDown" size={16} />
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-elevation-2 z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-border mb-2">
                        <p className="text-sm font-medium text-popover-foreground">{userName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleNavigation('/student-profile')}
                        className="w-full justify-start mb-1"
                      >
                        <Icon name="User" size={16} className="mr-2" />
                        Profile Settings
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full justify-start mb-1"
                      >
                        <Icon name="Settings" size={16} className="mr-2" />
                        Preferences
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full justify-start mb-1"
                      >
                        <Icon name="HelpCircle" size={16} className="mr-2" />
                        Help & Support
                      </Button>
                      
                      <div className="border-t border-border mt-2 pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLogout}
                          className="w-full justify-start text-error hover:text-error hover:bg-error/10"
                        >
                          <Icon name="LogOut" size={16} className="mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Menu Toggle */}
          {userRole && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden"
            >
              <Icon name="MoreVertical" size={20} />
            </Button>
          )}
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {showMobileMenu && userRole && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActivePath(item?.path) ? "default" : "ghost"}
                onClick={() => handleNavigation(item?.path)}
                className="w-full justify-start"
              >
                <Icon name={item?.icon} size={16} className="mr-3" />
                {item?.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
      {/* Overlay for dropdowns */}
      {(showNotifications || showUserMenu || showMobileMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;