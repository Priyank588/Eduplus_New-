import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CalendarGrid from './components/CalendarGrid';
import AttendanceSummary from './components/AttendanceSummary';
import CalendarNavigation from './components/CalendarNavigation';
import SubjectFilter from './components/SubjectFilter';
import DayDetailsModal from './components/DayDetailsModal';
import ExportOptions from './components/ExportOptions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AttendanceCalendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDayDetails, setShowDayDetails] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Get user data from localStorage
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'student');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'Alex Johnson');

  // Check authentication on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (!storedRole) {
      // Redirect to login if no authentication found
      navigate('/login');
      return;
    }
    setUserRole(storedRole);
    setUserName(localStorage.getItem('userName') || (storedRole === 'teacher' ? 'Dr. Sarah Wilson' : 'Alex Johnson'));
  }, [navigate]);

  // Mock attendance data
  const attendanceData = {
    '2024-09-01': { status: 'present', classes: [
      { subject: 'Data Structures', code: 'CS201', time: '09:00 AM', teacher: 'Dr. Smith', room: 'Lab 1', status: 'present' },
      { subject: 'Database Systems', code: 'CS301', time: '11:00 AM', teacher: 'Prof. Johnson', room: 'Room 205', status: 'present' }
    ]},
    '2024-09-02': { status: 'absent', classes: [
      { subject: 'Web Development', code: 'CS401', time: '10:00 AM', teacher: 'Dr. Wilson', room: 'Lab 2', status: 'absent', notes: 'Medical leave' }
    ]},
    '2024-09-03': { status: 'present', classes: [
      { subject: 'Software Engineering', code: 'CS501', time: '02:00 PM', teacher: 'Prof. Davis', room: 'Room 301', status: 'present' }
    ]},
    '2024-09-04': { status: 'present', classes: [
      { subject: 'Data Structures', code: 'CS201', time: '09:00 AM', teacher: 'Dr. Smith', room: 'Lab 1', status: 'present' },
      { subject: 'Machine Learning', code: 'CS601', time: '03:00 PM', teacher: 'Dr. Brown', room: 'Lab 3', status: 'present' }
    ]},
    '2024-09-05': { status: 'present', classes: [
      { subject: 'Database Systems', code: 'CS301', time: '11:00 AM', teacher: 'Prof. Johnson', room: 'Room 205', status: 'present' }
    ]},
    '2024-09-06': { status: 'absent', classes: [
      { subject: 'Web Development', code: 'CS401', time: '10:00 AM', teacher: 'Dr. Wilson', room: 'Lab 2', status: 'absent' }
    ]},
    '2024-09-09': { status: 'present', classes: [
      { subject: 'Software Engineering', code: 'CS501', time: '02:00 PM', teacher: 'Prof. Davis', room: 'Room 301', status: 'present' }
    ]},
    '2024-09-10': { status: 'present', classes: [
      { subject: 'Data Structures', code: 'CS201', time: '09:00 AM', teacher: 'Dr. Smith', room: 'Lab 1', status: 'present' }
    ]},
    '2024-09-11': { status: 'present', classes: [
      { subject: 'Database Systems', code: 'CS301', time: '11:00 AM', teacher: 'Prof. Johnson', room: 'Room 205', status: 'present' },
      { subject: 'Machine Learning', code: 'CS601', time: '03:00 PM', teacher: 'Dr. Brown', room: 'Lab 3', status: 'late', notes: 'Arrived 15 minutes late' }
    ]},
    '2024-09-12': { status: 'present', classes: [
      { subject: 'Web Development', code: 'CS401', time: '10:00 AM', teacher: 'Dr. Wilson', room: 'Lab 2', status: 'present' }
    ]},
    '2024-09-13': { status: 'present', classes: [
      { subject: 'Software Engineering', code: 'CS501', time: '02:00 PM', teacher: 'Prof. Davis', room: 'Room 301', status: 'present' }
    ]},
    '2024-09-16': { status: 'present', classes: [
      { subject: 'Data Structures', code: 'CS201', time: '09:00 AM', teacher: 'Dr. Smith', room: 'Lab 1', status: 'present' },
      { subject: 'Database Systems', code: 'CS301', time: '11:00 AM', teacher: 'Prof. Johnson', room: 'Room 205', status: 'present' }
    ]}
  };

  const subjects = [
    { name: 'Data Structures', code: 'CS201' },
    { name: 'Database Systems', code: 'CS301' },
    { name: 'Web Development', code: 'CS401' },
    { name: 'Software Engineering', code: 'CS501' },
    { name: 'Machine Learning', code: 'CS601' }
  ];

  // Calculate monthly statistics
  const calculateMonthlyStats = () => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const daysInMonth = new Date(year, month + 1, 0)?.getDate();
    
    let totalClasses = 0;
    let present = 0;
    let absent = 0;
    let streak = 0;
    let currentStreak = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
      const attendance = attendanceData?.[dateKey];
      
      if (attendance) {
        totalClasses++;
        if (attendance?.status === 'present') {
          present++;
          currentStreak++;
          streak = Math.max(streak, currentStreak);
        } else {
          absent++;
          currentStreak = 0;
        }
      }
    }
    
    const percentage = totalClasses > 0 ? (present / totalClasses) * 100 : 0;
    
    return {
      totalClasses,
      present,
      absent,
      percentage,
      streak
    };
  };

  const monthlyStats = calculateMonthlyStats();

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (day) => {
    const year = currentDate?.getFullYear();
    const month = currentDate?.getMonth();
    const dateKey = `${year}-${String(month + 1)?.padStart(2, '0')}-${String(day)?.padStart(2, '0')}`;
    const dayDetails = attendanceData?.[dateKey];
    
    if (dayDetails) {
      setSelectedDate(day);
      setShowDayDetails(true);
    }
  };

  const handleDateHover = (day) => {
    setHoveredDate(day);
  };

  const handleDateLeave = () => {
    setHoveredDate(null);
  };

  const handleExport = async (format, range) => {
    // Mock export functionality
    console.log(`Exporting ${format} for ${range}`);
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  };

  const filteredAttendanceData = selectedSubject === 'all' 
    ? attendanceData 
    : Object.fromEntries(
        Object.entries(attendanceData)?.filter(([date, data]) => 
          data?.classes?.some(cls => cls?.code === selectedSubject)
        )
      );

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole}
        userName={userName}
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Sidebar 
        userRole={userRole}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ease-out-custom pt-16 pb-20 lg:pb-8 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="px-4 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Calendar" size={28} className="text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Attendance Calendar</h1>
            </div>
            <p className="text-muted-foreground">
              Track your attendance patterns and view detailed class information
            </p>
          </div>

          {/* Subject Filter */}
          <SubjectFilter
            subjects={subjects}
            selectedSubject={selectedSubject}
            onSubjectChange={setSelectedSubject}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Calendar Section */}
            <div className="xl:col-span-2 space-y-6">
              <CalendarNavigation
                currentDate={currentDate}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
                onTodayClick={handleTodayClick}
              />
              
              <CalendarGrid
                currentDate={currentDate}
                attendanceData={filteredAttendanceData}
                onDateClick={handleDateClick}
                hoveredDate={hoveredDate}
                onDateHover={handleDateHover}
                onDateLeave={handleDateLeave}
              />
            </div>

            {/* Sidebar Information */}
            <div className="space-y-6">
              <AttendanceSummary
                monthlyStats={monthlyStats}
                selectedMonth={currentDate?.getMonth()}
                selectedYear={currentDate?.getFullYear()}
              />
              
              <ExportOptions
                onExport={handleExport}
                currentMonth={currentDate?.getMonth()}
                currentYear={currentDate?.getFullYear()}
              />
              
              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/student-dashboard')}
                    iconName="LayoutDashboard"
                    iconPosition="left"
                    fullWidth
                  >
                    View Dashboard
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/skills-planner')}
                    iconName="Target"
                    iconPosition="left"
                    fullWidth
                  >
                    Skills Planner
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/student-profile')}
                    iconName="User"
                    iconPosition="left"
                    fullWidth
                  >
                    My Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Day Details Modal */}
      <DayDetailsModal
        isOpen={showDayDetails}
        onClose={() => setShowDayDetails(false)}
        selectedDate={selectedDate}
        dayDetails={selectedDate ? attendanceData?.[`${currentDate?.getFullYear()}-${String(currentDate?.getMonth() + 1)?.padStart(2, '0')}-${String(selectedDate)?.padStart(2, '0')}`] : null}
        currentDate={currentDate}
      />
    </div>
  );
};

export default AttendanceCalendar;