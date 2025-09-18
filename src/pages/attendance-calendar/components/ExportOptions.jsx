import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExportOptions = ({ onExport, currentMonth, currentYear }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportRange, setExportRange] = useState('current');
  const [isExporting, setIsExporting] = useState(false);
  
  const formatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'excel', label: 'Excel Spreadsheet' }
  ];
  
  const rangeOptions = [
    { value: 'current', label: 'Current Month' },
    { value: 'semester', label: 'Current Semester' },
    { value: 'year', label: 'Academic Year' }
  ];
  
  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(exportFormat, exportRange);
      // Simulate export delay
      setTimeout(() => {
        setIsExporting(false);
      }, 2000);
    } catch (error) {
      setIsExporting(false);
    }
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Export Attendance</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Download your attendance records for personal use or academic requirements.
      </p>
      <div className="space-y-4 mb-6">
        <Select
          label="Export Format"
          options={formatOptions}
          value={exportFormat}
          onChange={setExportFormat}
        />
        
        <Select
          label="Date Range"
          options={rangeOptions}
          value={exportRange}
          onChange={setExportRange}
        />
      </div>
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Export Preview</span>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Format: {formatOptions?.find(f => f?.value === exportFormat)?.label}</p>
          <p>Range: {rangeOptions?.find(r => r?.value === exportRange)?.label}</p>
          <p>
            Period: {exportRange === 'current' 
              ? `${monthNames?.[currentMonth]} ${currentYear}`
              : exportRange === 'semester' ?'Fall 2024 Semester' :'2024-25 Academic Year'
            }
          </p>
        </div>
      </div>
      <Button
        variant="default"
        onClick={handleExport}
        loading={isExporting}
        iconName="Download"
        iconPosition="left"
        fullWidth
      >
        {isExporting ? 'Generating Report...' : 'Export Attendance'}
      </Button>
      <div className="mt-4 text-xs text-muted-foreground">
        <p>• Reports include detailed attendance statistics and trends</p>
        <p>• PDF format includes visual charts and summaries</p>
        <p>• CSV/Excel formats provide raw data for analysis</p>
      </div>
    </div>
  );
};

export default ExportOptions;