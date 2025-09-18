import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ClassSelector = ({ selectedClass, onClassChange, selectedDateRange, onDateRangeChange }) => {
  const classOptions = [
    { value: 'cs-101', label: 'Computer Science 101', description: '45 students enrolled' },
    { value: 'cs-201', label: 'Data Structures 201', description: '38 students enrolled' },
    { value: 'cs-301', label: 'Database Systems 301', description: '42 students enrolled' },
    { value: 'math-101', label: 'Mathematics 101', description: '52 students enrolled' },
    { value: 'eng-101', label: 'English Literature 101', description: '35 students enrolled' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'semester', label: 'Current Semester' },
    { value: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Filter" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Class & Period Selection</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Select Class"
          placeholder="Choose a class to manage"
          options={classOptions}
          value={selectedClass}
          onChange={onClassChange}
          searchable
          required
        />
        
        <Select
          label="Date Range"
          placeholder="Select time period"
          options={dateRangeOptions}
          value={selectedDateRange}
          onChange={onDateRangeChange}
          required
        />
      </div>
      {selectedClass && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Selected Class:</span>
            <span className="font-medium text-foreground">
              {classOptions?.find(c => c?.value === selectedClass)?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSelector;