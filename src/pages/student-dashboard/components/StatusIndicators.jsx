import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const StatusIndicators = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [offlineStatus, setOfflineStatus] = useState(false);
  const [syncStatus, setSyncStatus] = useState('synced');
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  // Mock sync status updates
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ['synced', 'syncing', 'error'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setSyncStatus(randomStatus);
      
      if (randomStatus === 'synced') {
        setLastSyncTime(new Date());
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Mock offline detection
  useEffect(() => {
    const handleOnline = () => setOfflineStatus(false);
    const handleOffline = () => setOfflineStatus(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real implementation, this would update the global theme
    document.documentElement?.classList?.toggle('dark');
  };

  const getSyncStatusInfo = () => {
    switch (syncStatus) {
      case 'synced':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          text: 'All synced',
          description: `Last sync: ${lastSyncTime?.toLocaleTimeString()}`
        };
      case 'syncing':
        return {
          icon: 'RefreshCw',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          text: 'Syncing...',
          description: 'Updating data from ERP'
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          color: 'text-error',
          bgColor: 'bg-error/10',
          text: 'Sync failed',
          description: 'Tap to retry sync'
        };
      default:
        return {
          icon: 'Cloud',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          text: 'Unknown',
          description: 'Status unknown'
        };
    }
  };

  const syncInfo = getSyncStatusInfo();

  const systemStats = [
    { label: 'Memory Usage', value: '68%', color: 'bg-blue-500' },
    { label: 'Storage', value: '45%', color: 'bg-green-500' },
    { label: 'Network', value: '92%', color: 'bg-yellow-500' }
  ];

  const notifications = [
    { type: 'info', message: 'New course recommendations available', time: '5m ago' },
    { type: 'warning', message: 'Attendance below 75% threshold', time: '1h ago' },
    { type: 'success', message: 'Assignment submitted successfully', time: '2h ago' }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info': return 'Info';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'info': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'success': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">System Status</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Icon name={darkMode ? 'Moon' : 'Sun'} size={18} />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Theme</h3>
                <p className="text-sm text-muted-foreground">{darkMode ? 'Dark' : 'Light'} mode</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                darkMode ? 'bg-primary' : 'bg-muted-foreground/20'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Offline Status */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                offlineStatus ? 'bg-error/10 text-error' : 'bg-success/10 text-success'
              }`}>
                <Icon name={offlineStatus ? 'WifiOff' : 'Wifi'} size={18} />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Connection</h3>
                <p className="text-sm text-muted-foreground">
                  {offlineStatus ? 'Offline' : 'Online'}
                </p>
              </div>
            </div>
            <div className={`w-3 h-3 rounded-full ${
              offlineStatus ? 'bg-error' : 'bg-success'
            }`} />
          </div>

          {/* Sync Status */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${syncInfo?.bgColor} ${syncInfo?.color}`}>
                <Icon 
                  name={syncInfo?.icon} 
                  size={18} 
                  className={syncStatus === 'syncing' ? 'animate-spin' : ''} 
                />
              </div>
              <div>
                <h3 className="font-medium text-foreground">ERP Sync</h3>
                <p className="text-sm text-muted-foreground">{syncInfo?.text}</p>
              </div>
            </div>
            <button
              onClick={() => setSyncStatus('syncing')}
              className="p-2 hover:bg-background rounded-lg transition-colors duration-150"
              disabled={syncStatus === 'syncing'}
            >
              <Icon name="RefreshCw" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* System Performance */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">System Performance</h3>
          {systemStats?.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat?.label}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${stat?.color} transition-all duration-300`}
                    style={{ width: stat?.value }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-10 text-right">
                  {stat?.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">System Notifications</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-150">
            Clear All
          </button>
        </div>
        
        <div className="space-y-3">
          {notifications?.map((notification, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className={`mt-0.5 ${getNotificationColor(notification?.type)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{notification?.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
              </div>
              <button className="p-1 hover:bg-background rounded transition-colors duration-150">
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusIndicators;