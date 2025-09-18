import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceSummary = ({ monthlyStats, selectedMonth, selectedYear }) => {
  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-error';
  };
  
  const getAttendanceIcon = (percentage) => {
    if (percentage >= 85) return 'TrendingUp';
    if (percentage >= 75) return 'Minus';
    return 'TrendingDown';
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          {monthNames?.[selectedMonth]} {selectedYear} Summary
        </h3>
        <div className={`flex items-center space-x-2 ${getAttendanceColor(monthlyStats?.percentage)}`}>
          <Icon name={getAttendanceIcon(monthlyStats?.percentage)} size={20} />
          <span className="font-semibold">{monthlyStats?.percentage?.toFixed(1)}%</span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/30 rounded-lg">
          <div className="text-2xl font-bold text-foreground mb-1">
            {monthlyStats?.totalClasses}
          </div>
          <div className="text-sm text-muted-foreground">Total Classes</div>
        </div>
        
        <div className="text-center p-4 bg-success/10 rounded-lg">
          <div className="text-2xl font-bold text-success mb-1">
            {monthlyStats?.present}
          </div>
          <div className="text-sm text-muted-foreground">Present</div>
        </div>
        
        <div className="text-center p-4 bg-error/10 rounded-lg">
          <div className="text-2xl font-bold text-error mb-1">
            {monthlyStats?.absent}
          </div>
          <div className="text-sm text-muted-foreground">Absent</div>
        </div>
        
        <div className="text-center p-4 bg-primary/10 rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">
            {monthlyStats?.streak}
          </div>
          <div className="text-sm text-muted-foreground">Current Streak</div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Attendance Progress</span>
          <span>{monthlyStats?.percentage?.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              monthlyStats?.percentage >= 85 
                ? 'bg-success' 
                : monthlyStats?.percentage >= 75 
                ? 'bg-warning' :'bg-error'
            }`}
            style={{ width: `${Math.min(monthlyStats?.percentage, 100)}%` }}
          ></div>
        </div>
      </div>
      {/* Status Message */}
      <div className={`p-3 rounded-lg ${
        monthlyStats?.percentage >= 85 
          ? 'bg-success/10 text-success' 
          : monthlyStats?.percentage >= 75 
          ? 'bg-warning/10 text-warning' :'bg-error/10 text-error'
      }`}>
        <div className="flex items-center space-x-2">
          <Icon 
            name={monthlyStats?.percentage >= 85 ? 'CheckCircle' : monthlyStats?.percentage >= 75 ? 'AlertTriangle' : 'XCircle'} 
            size={16} 
          />
          <span className="text-sm font-medium">
            {monthlyStats?.percentage >= 85 
              ? 'Excellent attendance! Keep it up!' 
              : monthlyStats?.percentage >= 75 
              ? 'Good attendance. Try to improve further.' :'Attendance below requirement. Please improve.'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSummary;