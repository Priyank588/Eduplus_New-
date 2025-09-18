import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettings = ({ settings, onUpdate }) => {
  const [notificationSettings, setNotificationSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (category, setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [setting]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(notificationSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setNotificationSettings(settings);
    setHasChanges(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="Bell" size={20} className="mr-2 text-primary" />
          Notification Preferences
        </h2>
        {hasChanges && (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Icon name="Save" size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <div className="space-y-6">
        {/* Email Notifications */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Mail" size={18} className="mr-2 text-secondary" />
            Email Notifications
          </h3>
          <div className="space-y-4 pl-6">
            <Checkbox
              label="Attendance Reminders"
              description="Get notified about upcoming classes and attendance requirements"
              checked={notificationSettings?.email?.attendance}
              onChange={(e) => handleSettingChange('email', 'attendance', e?.target?.checked)}
            />
            <Checkbox
              label="Assignment Deadlines"
              description="Receive alerts for upcoming assignment due dates"
              checked={notificationSettings?.email?.assignments}
              onChange={(e) => handleSettingChange('email', 'assignments', e?.target?.checked)}
            />
            <Checkbox
              label="Grade Updates"
              description="Get notified when new grades are posted"
              checked={notificationSettings?.email?.grades}
              onChange={(e) => handleSettingChange('email', 'grades', e?.target?.checked)}
            />
            <Checkbox
              label="Skill Recommendations"
              description="Receive AI-powered skill development suggestions"
              checked={notificationSettings?.email?.skills}
              onChange={(e) => handleSettingChange('email', 'skills', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Smartphone" size={18} className="mr-2 text-accent" />
            Push Notifications
          </h3>
          <div className="space-y-4 pl-6">
            <Checkbox
              label="Class Reminders"
              description="Get push notifications 15 minutes before each class"
              checked={notificationSettings?.push?.classReminders}
              onChange={(e) => handleSettingChange('push', 'classReminders', e?.target?.checked)}
            />
            <Checkbox
              label="Emergency Alerts"
              description="Receive important campus-wide announcements"
              checked={notificationSettings?.push?.emergency}
              onChange={(e) => handleSettingChange('push', 'emergency', e?.target?.checked)}
            />
            <Checkbox
              label="Achievement Badges"
              description="Get notified when you earn new achievements"
              checked={notificationSettings?.push?.achievements}
              onChange={(e) => handleSettingChange('push', 'achievements', e?.target?.checked)}
            />
          </div>
        </div>

        {/* SMS Notifications */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="MessageSquare" size={18} className="mr-2 text-primary" />
            SMS Notifications
          </h3>
          <div className="space-y-4 pl-6">
            <Checkbox
              label="Critical Alerts"
              description="Receive SMS for urgent academic matters only"
              checked={notificationSettings?.sms?.critical}
              onChange={(e) => handleSettingChange('sms', 'critical', e?.target?.checked)}
            />
            <Checkbox
              label="Attendance Warnings"
              description="Get SMS alerts when attendance drops below 75%"
              checked={notificationSettings?.sms?.attendanceWarnings}
              onChange={(e) => handleSettingChange('sms', 'attendanceWarnings', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Notification Schedule */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Clock" size={18} className="mr-2 text-accent" />
            Notification Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quiet Hours Start
              </label>
              <input
                type="time"
                value={notificationSettings?.schedule?.quietStart}
                onChange={(e) => handleSettingChange('schedule', 'quietStart', e?.target?.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quiet Hours End
              </label>
              <input
                type="time"
                value={notificationSettings?.schedule?.quietEnd}
                onChange={(e) => handleSettingChange('schedule', 'quietEnd', e?.target?.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            During quiet hours, only critical notifications will be sent
          </p>
        </div>

        {/* Notification Frequency */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="BarChart3" size={18} className="mr-2 text-secondary" />
            Notification Summary
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">24</p>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">8</p>
              <p className="text-sm text-muted-foreground">Today</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">3</p>
              <p className="text-sm text-muted-foreground">Unread</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">95%</p>
              <p className="text-sm text-muted-foreground">Delivery Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;