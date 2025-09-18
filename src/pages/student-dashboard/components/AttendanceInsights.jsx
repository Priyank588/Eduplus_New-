import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceInsights = () => {
  const attendanceData = {
    overall: 78,
    trend: 'up',
    streak: 5,
    totalClasses: 120,
    attended: 94,
    absent: 26
  };

  const monthlyTrends = [
    { month: 'Sep', percentage: 85 },
    { month: 'Oct', percentage: 72 },
    { month: 'Nov', percentage: 80 },
    { month: 'Dec', percentage: 78 }
  ];

  const getStreakBadge = (streak) => {
    if (streak >= 10) return { color: 'bg-yellow-500', icon: 'Crown', label: 'Champion' };
    if (streak >= 5) return { color: 'bg-blue-500', icon: 'Star', label: 'Rising Star' };
    return { color: 'bg-green-500', icon: 'Zap', label: 'Getting Started' };
  };

  const badge = getStreakBadge(attendanceData?.streak);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Attendance Insights</h2>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 ${badge?.color} rounded-full flex items-center justify-center`}>
            <Icon name={badge?.icon} size={16} className="text-white" />
          </div>
          <span className="text-sm font-medium text-foreground">{badge?.label}</span>
        </div>
      </div>
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-3xl font-bold text-primary mb-1">{attendanceData?.overall}%</div>
          <div className="text-sm text-muted-foreground">Overall Attendance</div>
          <div className="flex items-center justify-center mt-2">
            <Icon 
              name={attendanceData?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              className={attendanceData?.trend === 'up' ? 'text-success' : 'text-error'} 
            />
            <span className={`text-sm ml-1 ${attendanceData?.trend === 'up' ? 'text-success' : 'text-error'}`}>
              {attendanceData?.trend === 'up' ? '+2.5%' : '-2.5%'}
            </span>
          </div>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-3xl font-bold text-secondary mb-1">{attendanceData?.streak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
          <div className="flex items-center justify-center mt-2">
            <Icon name="Calendar" size={16} className="text-secondary" />
            <span className="text-sm ml-1 text-secondary">Keep it up!</span>
          </div>
        </div>

        <div className="text-center p-4 bg-muted rounded-lg">
          <div className="text-3xl font-bold text-accent mb-1">{attendanceData?.attended}</div>
          <div className="text-sm text-muted-foreground">Classes Attended</div>
          <div className="text-xs text-muted-foreground mt-1">
            out of {attendanceData?.totalClasses}
          </div>
        </div>
      </div>
      {/* Monthly Trends */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-foreground mb-3">Monthly Trends</h3>
        <div className="flex items-end space-x-4 h-20">
          {monthlyTrends?.map((month, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-primary rounded-t-sm transition-all duration-300 hover:bg-primary/80"
                style={{ height: `${month?.percentage}%` }}
              ></div>
              <div className="text-xs text-muted-foreground mt-2">{month?.month}</div>
              <div className="text-xs font-medium text-foreground">{month?.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <button className="flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors duration-150">
          <Icon name="Calendar" size={16} />
          <span>View Calendar</span>
        </button>
        <button className="flex items-center space-x-2 px-3 py-2 bg-secondary/10 text-secondary rounded-lg text-sm font-medium hover:bg-secondary/20 transition-colors duration-150">
          <Icon name="BarChart3" size={16} />
          <span>Detailed Report</span>
        </button>
      </div>
    </div>
  );
};

export default AttendanceInsights;