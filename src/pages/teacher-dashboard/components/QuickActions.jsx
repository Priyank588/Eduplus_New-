import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ selectedClass, onAction }) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportFormat, setExportFormat] = useState('');
  const [reportType, setReportType] = useState('');

  const exportFormatOptions = [
    { value: 'pdf', label: 'PDF Document', description: 'Formatted report' },
    { value: 'excel', label: 'Excel Spreadsheet', description: 'Data analysis ready' },
    { value: 'csv', label: 'CSV File', description: 'Raw data export' }
  ];

  const reportTypeOptions = [
    { value: 'daily', label: 'Daily Attendance', description: 'Today\'s attendance record' },
    { value: 'weekly', label: 'Weekly Summary', description: 'Past 7 days overview' },
    { value: 'monthly', label: 'Monthly Report', description: 'Complete month analysis' },
    { value: 'detained', label: 'Detained Students', description: 'Students below 60%' },
    { value: 'custom', label: 'Custom Range', description: 'Select date range' }
  ];

  const systemStatus = {
    erpConnection: 'connected',
    lastSync: '2025-09-16 15:45',
    pendingUpdates: 3,
    systemHealth: 'good'
  };

  const handleMarkAttendance = () => {
    onAction('mark-attendance');
  };

  const handleGenerateReport = () => {
    if (exportFormat && reportType) {
      onAction('generate-report', { format: exportFormat, type: reportType });
      setShowExportOptions(false);
      setExportFormat('');
      setReportType('');
    }
  };

  const handleSendBulkNotification = () => {
    onAction('send-notification');
  };

  const handleSyncERP = () => {
    onAction('sync-erp');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'disconnected': return 'text-error';
      case 'syncing': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Zap" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="default"
            onClick={handleMarkAttendance}
            iconName="CheckSquare"
            iconPosition="left"
            className="h-12"
            disabled={!selectedClass}
          >
            Mark Attendance
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowExportOptions(!showExportOptions)}
            iconName="FileText"
            iconPosition="left"
            className="h-12"
            disabled={!selectedClass}
          >
            Generate Report
          </Button>
          
          <Button
            variant="secondary"
            onClick={handleSendBulkNotification}
            iconName="MessageSquare"
            iconPosition="left"
            className="h-12"
            disabled={!selectedClass}
          >
            Send Notification
          </Button>
        </div>

        {/* Export Options */}
        {showExportOptions && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <h3 className="text-sm font-medium text-foreground mb-4">Export Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Select
                label="Report Type"
                placeholder="Select report type"
                options={reportTypeOptions}
                value={reportType}
                onChange={setReportType}
                required
              />
              
              <Select
                label="Export Format"
                placeholder="Choose format"
                options={exportFormatOptions}
                value={exportFormat}
                onChange={setExportFormat}
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExportOptions(false)}
              >
                Cancel
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={handleGenerateReport}
                disabled={!exportFormat || !reportType}
                iconName="Download"
                iconPosition="left"
              >
                Generate & Download
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* System Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">System Status</h2>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleSyncERP}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Sync Now
          </Button>
        </div>
        
        <div className="space-y-4">
          {/* ERP Connection Status */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                systemStatus?.erpConnection === 'connected' ? 'bg-success' : 'bg-error'
              }`}></div>
              <div>
                <p className="text-sm font-medium text-foreground">ERP Connection</p>
                <p className="text-xs text-muted-foreground">
                  Last sync: {systemStatus?.lastSync}
                </p>
              </div>
            </div>
            <span className={`text-sm font-medium capitalize ${getStatusColor(systemStatus?.erpConnection)}`}>
              {systemStatus?.erpConnection}
            </span>
          </div>

          {/* Pending Updates */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={16} className="text-warning" />
              <div>
                <p className="text-sm font-medium text-foreground">Pending Updates</p>
                <p className="text-xs text-muted-foreground">
                  Attendance records waiting for sync
                </p>
              </div>
            </div>
            <span className="text-sm font-medium text-warning">
              {systemStatus?.pendingUpdates} items
            </span>
          </div>

          {/* System Health */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={16} className={getHealthColor(systemStatus?.systemHealth)} />
              <div>
                <p className="text-sm font-medium text-foreground">System Health</p>
                <p className="text-xs text-muted-foreground">
                  Overall system performance
                </p>
              </div>
            </div>
            <span className={`text-sm font-medium capitalize ${getHealthColor(systemStatus?.systemHealth)}`}>
              {systemStatus?.systemHealth}
            </span>
          </div>
        </div>
      </div>
      {/* Bulk Operations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Settings" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Bulk Operations</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            iconName="Users"
            iconPosition="left"
            disabled={!selectedClass}
          >
            Mark All Present
          </Button>
          
          <Button
            variant="outline"
            iconName="UserX"
            iconPosition="left"
            disabled={!selectedClass}
          >
            Mark All Absent
          </Button>
          
          <Button
            variant="outline"
            iconName="Mail"
            iconPosition="left"
            disabled={!selectedClass}
          >
            Email Parents
          </Button>
          
          <Button
            variant="outline"
            iconName="FileSpreadsheet"
            iconPosition="left"
            disabled={!selectedClass}
          >
            Import Attendance
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;