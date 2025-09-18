import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySettings = ({ securityData, onUpdate }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securityData?.twoFactorEnabled);
  const [loginAlerts, setLoginAlerts] = useState(securityData?.loginAlerts);

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = () => {
    if (passwordData?.new !== passwordData?.confirm) {
      alert('New passwords do not match');
      return;
    }
    // Handle password change
    onUpdate('password', passwordData);
    setPasswordData({ current: '', new: '', confirm: '' });
    setShowChangePassword(false);
  };

  const handleTwoFactorToggle = (enabled) => {
    setTwoFactorEnabled(enabled);
    onUpdate('twoFactor', enabled);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-primary" />
          Security & Privacy
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-sm text-success font-medium">Account Secured</span>
        </div>
      </div>
      <div className="space-y-6">
        {/* Password Management */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Key" size={18} className="mr-2 text-secondary" />
            Password Management
          </h3>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium text-foreground">Password</p>
                <p className="text-sm text-muted-foreground">
                  Last changed on {securityData?.lastPasswordChange}
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowChangePassword(!showChangePassword)}
              >
                <Icon name="Edit" size={16} className="mr-2" />
                Change Password
              </Button>
            </div>

            {showChangePassword && (
              <div className="space-y-4 pt-4 border-t border-border">
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordData?.current}
                  onChange={(e) => handlePasswordChange('current', e?.target?.value)}
                  placeholder="Enter current password"
                />
                <Input
                  label="New Password"
                  type="password"
                  value={passwordData?.new}
                  onChange={(e) => handlePasswordChange('new', e?.target?.value)}
                  placeholder="Enter new password"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordData?.confirm}
                  onChange={(e) => handlePasswordChange('confirm', e?.target?.value)}
                  placeholder="Confirm new password"
                />
                <div className="flex space-x-2">
                  <Button onClick={handlePasswordSubmit}>
                    Update Password
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowChangePassword(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Smartphone" size={18} className="mr-2 text-accent" />
            Two-Factor Authentication
          </h3>
          
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium text-foreground">2FA Status</p>
                <p className="text-sm text-muted-foreground">
                  {twoFactorEnabled ? 'Enhanced security enabled' : 'Additional security recommended'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${twoFactorEnabled ? 'bg-success' : 'bg-warning'}`}></span>
                <span className={`text-sm font-medium ${twoFactorEnabled ? 'text-success' : 'text-warning'}`}>
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Enable Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                checked={twoFactorEnabled}
                onChange={(e) => handleTwoFactorToggle(e?.target?.checked)}
              />
              
              {twoFactorEnabled && (
                <div className="pl-6 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm text-foreground">Authenticator app configured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm text-foreground">Backup codes generated</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Icon name="RefreshCw" size={14} className="mr-2" />
                    Regenerate Backup Codes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Login Activity */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Activity" size={18} className="mr-2 text-primary" />
            Login Activity
          </h3>
          
          <div className="space-y-3">
            {securityData?.recentLogins?.map((login, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Monitor" size={16} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{login?.device}</p>
                    <p className="text-sm text-muted-foreground">
                      {login?.location} • {login?.timestamp}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${login?.status === 'success' ? 'bg-success' : 'bg-error'}`}></span>
                  <span className="text-sm text-muted-foreground capitalize">{login?.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Eye" size={18} className="mr-2 text-secondary" />
            Privacy Settings
          </h3>
          
          <div className="space-y-4">
            <Checkbox
              label="Login Alerts"
              description="Get notified of new login attempts"
              checked={loginAlerts}
              onChange={(e) => setLoginAlerts(e?.target?.checked)}
            />
            <Checkbox
              label="Profile Visibility"
              description="Allow other students to view your profile"
              checked={securityData?.profileVisible}
              onChange={(e) => onUpdate('profileVisible', e?.target?.checked)}
            />
            <Checkbox
              label="Activity Status"
              description="Show when you're online to classmates"
              checked={securityData?.showActivity}
              onChange={(e) => onUpdate('showActivity', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-error/10 rounded-lg p-4 border border-error/20">
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="AlertTriangle" size={18} className="mr-2 text-error" />
            Account Actions
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Export Account Data</p>
                <p className="text-sm text-muted-foreground">Download all your account information</p>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently remove your account</p>
              </div>
              <Button variant="destructive" size="sm">
                <Icon name="Trash2" size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;