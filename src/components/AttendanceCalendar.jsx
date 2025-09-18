import React from 'react';

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
    <div>
      <h2 className="text-lg font-semibold mb-2">Attendance Calendar - September 2025</h2>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-center font-semibold text-xs text-gray-500">{day}</div>
        ))}
      </div>
      {calendar.map((week, i) => (
        <div key={i} className="grid grid-cols-7 gap-2 mb-1">
          {week.map((cell, idx) =>
            cell ? (
              <CalendarDay key={cell.date} status={cell.status} date={cell.date} />
            ) : (
              <div key={idx}></div>
            )
          )}
        </div>
      ))}
      <div className="flex space-x-4 mt-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 border-green-600 border rounded mr-1"></div>
          <span className="text-sm">Present</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 border-red-600 border rounded mr-1"></div>
          <span className="text-sm">Absent</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-300 border-gray-400 border rounded mr-1"></div>
          <span className="text-sm">No Class</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;

// Example usage:
// <AttendanceCalendar
//   year={2025}
//   month={8} // September (0-indexed)
//   attendance={{
//     "2025-09-01": "Present",
//     "2025-09-02": "Absent",
//     "2025-09-03": "NoClass",
//     "2025-09-04": "Present",
//     "2025-09-05": "Absent",
//     "2025-09-06": "Present",
//     // ...etc
//   }}
// />