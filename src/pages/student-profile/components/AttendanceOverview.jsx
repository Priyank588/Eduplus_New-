import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceOverview = ({ attendanceData }) => {
  const navigate = useNavigate();

  const getAttendanceColor = (percentage) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-error';
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 85) return 'Excellent';
    if (percentage >= 75) return 'Good';
    if (percentage >= 60) return 'Warning';
    return 'Critical';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="Calendar" size={20} className="mr-2 text-primary" />
          Attendance Overview
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/attendance-calendar')}
        >
          <Icon name="ExternalLink" size={16} className="mr-2" />
          View Calendar
        </Button>
      </div>
      <div className="space-y-6">
        {/* Overall Attendance */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground">Overall Attendance</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              attendanceData?.overall >= 85 ? 'bg-success text-success-foreground' :
              attendanceData?.overall >= 75 ? 'bg-warning text-warning-foreground': 'bg-error text-error-foreground'
            }`}>
              {getAttendanceStatus(attendanceData?.overall)}
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Current Semester</span>
                <span className={`text-2xl font-bold ${getAttendanceColor(attendanceData?.overall)}`}>
                  {attendanceData?.overall}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    attendanceData?.overall >= 85 ? 'bg-success' :
                    attendanceData?.overall >= 75 ? 'bg-warning': 'bg-error'
                  }`}
                  style={{ width: `${attendanceData?.overall}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <Icon 
                name={attendanceData?.overall >= 75 ? "TrendingUp" : "TrendingDown"} 
                size={32} 
                className={getAttendanceColor(attendanceData?.overall)} 
              />
            </div>
          </div>
        </div>

        {/* Subject-wise Attendance */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="BookOpen" size={18} className="mr-2 text-secondary" />
            Subject-wise Breakdown
          </h3>
          <div className="space-y-3">
            {attendanceData?.subjects?.map((subject, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    subject?.percentage >= 85 ? 'bg-success' :
                    subject?.percentage >= 75 ? 'bg-warning': 'bg-error'
                  }`}></div>
                  <div>
                    <p className="font-medium text-foreground">{subject?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {subject?.present} / {subject?.total} classes
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getAttendanceColor(subject?.percentage)}`}>
                    {subject?.percentage}%
                  </p>
                  <p className="text-xs text-muted-foreground">{subject?.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Insights */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="BarChart3" size={18} className="mr-2 text-accent" />
            Insights & Recommendations
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Attendance Alert</p>
                <p className="text-xs text-muted-foreground">
                  You need to attend {attendanceData?.classesNeeded} more classes to maintain 75% attendance
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="TrendingUp" size={16} className="text-success mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Improvement Trend</p>
                <p className="text-xs text-muted-foreground">
                  Your attendance has improved by 5% compared to last month
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Target" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Goal Progress</p>
                <p className="text-xs text-muted-foreground">
                  You're {attendanceData?.overall >= 85 ? 'exceeding' : 'approaching'} your 85% attendance goal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverview;