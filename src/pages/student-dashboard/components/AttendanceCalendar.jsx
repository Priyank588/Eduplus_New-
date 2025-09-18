import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

// CalendarDay component for each day cell
const CalendarDay = ({ status, date }) => {
  let bgColor = "bg-gray-200 border";
  let content = "";
  if (status === "Present") {
    bgColor = "bg-green-500 border-green-600 text-white";
    content = "✓";
  }
  if (status === "Absent") {
    bgColor = "bg-red-500 border-red-600 text-white";
    content = "✗";
  }
  if (status === "NoClass") {
    bgColor = "bg-gray-300 border-gray-400 text-gray-500";
    content = "";
  }

  return (
    <div className={`w-10 h-10 flex flex-col items-center justify-center rounded ${bgColor} border`}>
      <span className="text-xs text-gray-700">{date.getDate()}</span>
      <span className="text-lg font-bold">{content}</span>
    </div>
  );
};

// Helper to generate a month's calendar grid with attendance
function getMonthCalendar(year, month, attendanceMap) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const calendar = [];
  let week = [];

  // Fill initial empty days
  for (let i = 0; i < firstDay.getDay(); i++) {
    week.push(null);
  }

  // Fill days with attendance status
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dateStr = date.toISOString().slice(0, 10); // "YYYY-MM-DD"
    const status = attendanceMap[dateStr] || "NoClass";
    week.push({ date, status });
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }
  // Fill trailing empty days
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    calendar.push(week);
  }
  return calendar;
}

// Main AttendanceCalendar component
const AttendanceCalendar = () => {
  // Example: September 2025
  const year = 2025;
  const month = 8; // 0-indexed (8 = September)
  // Example attendance data for September 2025
  const attendance = {
    "2025-09-01": "Present",
    "2025-09-02": "Absent",
    "2025-09-03": "NoClass",
    "2025-09-04": "Present",
    "2025-09-05": "Absent",
    "2025-09-06": "Present",
    "2025-09-07": "NoClass",
    "2025-09-08": "Present",
    "2025-09-09": "Present",
    "2025-09-10": "Absent",
    "2025-09-11": "Present",
    "2025-09-12": "Absent",
    "2025-09-13": "NoClass",
    "2025-09-14": "Present",
    // ...add more dates as needed
  };

  const calendar = getMonthCalendar(year, month, attendance);

  // Weekday labels
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Attendance Calendar</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Present</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Absent</span>
            </div>
          </div>
        </div>
      </div>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
        >
          <Icon name="ChevronLeft" size={20} className="text-muted-foreground" />
        </button>
        
        <h3 className="text-lg font-semibold text-foreground">{monthName}</h3>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
        >
          <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
        </button>
      </div>
      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days?.map((day, index) => {
          const status = getAttendanceStatus(day);
          const isToday = day && 
            currentMonth?.getFullYear() === new Date()?.getFullYear() &&
            currentMonth?.getMonth() === new Date()?.getMonth() &&
            day === new Date()?.getDate();

          return (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center text-sm relative rounded-lg transition-colors duration-150 ${
                day ? 'hover:bg-muted cursor-pointer' : ''
              } ${isToday ? 'ring-2 ring-primary' : ''}`}
            >
              {day && (
                <>
                  <span className={`font-medium ${isToday ? 'text-primary' : 'text-foreground'}`}>
                    {day}
                  </span>
                  {status && (
                    <div
                      className={`absolute bottom-1 right-1 w-2 h-2 rounded-full ${
                        status === 'present' ? 'bg-success' : 'bg-error'
                      }`}
                    ></div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Calendar Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">This month:</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-foreground font-medium">15 Present</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span className="text-foreground font-medium">3 Absent</span>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-150">
            <Icon name="Download" size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;