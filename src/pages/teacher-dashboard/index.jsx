import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ClassSelector from './components/ClassSelector';
import AttendanceTable from './components/AttendanceTable';
import AttendanceTrends from './components/AttendanceTrends';
import NotificationCenter from './components/NotificationCenter';
import QuickActions from './components/QuickActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('week');
  const [activeView, setActiveView] = useState('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Mock teacher data
  const teacherData = {
    name: 'Dr. Sarah Johnson',
    employeeId: 'EMP001',
    department: 'Computer Science',
    totalClasses: 4,
    totalStudents: 180,
    averageAttendance: 82.5
  };

  useEffect(() => {
    // Set default class on component mount
    setSelectedClass('cs-101');
  }, []);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleClassChange = (classValue) => {
    setSelectedClass(classValue);
  };

  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleBulkAction = (action, studentIds) => {
    console.log('Bulk action:', action, 'for students:', studentIds);
    // Bulk action logic would go here
  };

  const handleQuickAction = (action, data) => {
    switch (action) {
      case 'mark-attendance': navigate('/attendance-calendar');
        break;
      case 'generate-report': console.log('Generating report:', data);
        break;
      case 'send-notification':
        setActiveView('notifications');
        break;
      case 'sync-erp': console.log('Syncing with ERP system');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'attendance', label: 'Attendance', icon: 'Users' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
    { id: 'notifications', label: 'Notifications', icon: 'MessageSquare' },
    { id: 'actions', label: 'Quick Actions', icon: 'Zap' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="teacher" 
        userName={teacherData?.name}
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      <Sidebar 
        userRole="teacher"
        isCollapsed={sidebarCollapsed}
        onToggle={handleToggleSidebar}
      />
      {/* Main Content */}
      <main className={`transition-all duration-300 ease-out-custom pt-16 pb-20 lg:pb-6 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="px-4 lg:px-6 py-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Welcome back, {teacherData?.name?.split(' ')?.[1]}! 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your classes and track student progress from your dashboard
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={16} />
                    <span>{teacherData?.totalStudents} Students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="BookOpen" size={16} />
                    <span>{teacherData?.totalClasses} Classes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={16} />
                    <span>{teacherData?.averageAttendance}% Avg</span>
                  </div>
                </div>
                
                <Button
                  variant="default"
                  onClick={() => navigate('/attendance-calendar')}
                  iconName="Plus"
                  iconPosition="left"
                  className="hidden sm:flex"
                >
                  Take Attendance
                </Button>
              </div>
            </div>
          </div>

          {/* Class Selector */}
          <ClassSelector
            selectedClass={selectedClass}
            onClassChange={handleClassChange}
            selectedDateRange={selectedDateRange}
            onDateRangeChange={handleDateRangeChange}
          />

          {/* Mobile View Selector */}
          <div className="lg:hidden mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Dashboard Sections</h3>
              <div className="grid grid-cols-2 gap-2">
                {viewOptions?.map((option) => (
                  <Button
                    key={option?.id}
                    variant={activeView === option?.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveView(option?.id)}
                    iconName={option?.icon}
                    iconPosition="left"
                    className="justify-start"
                  >
                    {option?.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Main Content Area */}
              <div className="xl:col-span-2 space-y-6">
                <AttendanceTable
                  selectedClass={selectedClass}
                  onBulkAction={handleBulkAction}
                />
                
                <AttendanceTrends selectedClass={selectedClass} />
              </div>

              {/* Sidebar Content */}
              <div className="space-y-6">
                <NotificationCenter selectedClass={selectedClass} />
                <QuickActions
                  selectedClass={selectedClass}
                  onAction={handleQuickAction}
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {activeView === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4 text-center">
                    <Icon name="Users" size={24} className="mx-auto text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{teacherData?.totalStudents}</p>
                    <p className="text-xs text-muted-foreground">Total Students</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 text-center">
                    <Icon name="BookOpen" size={24} className="mx-auto text-secondary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{teacherData?.totalClasses}</p>
                    <p className="text-xs text-muted-foreground">Classes</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 text-center">
                    <Icon name="TrendingUp" size={24} className="mx-auto text-success mb-2" />
                    <p className="text-2xl font-bold text-foreground">{teacherData?.averageAttendance}%</p>
                    <p className="text-xs text-muted-foreground">Avg Attendance</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 text-center">
                    <Icon name="Calendar" size={24} className="mx-auto text-warning mb-2" />
                    <p className="text-2xl font-bold text-foreground">5</p>
                    <p className="text-xs text-muted-foreground">Classes Today</p>
                  </div>
                </div>
                
                <AttendanceTrends selectedClass={selectedClass} />
              </div>
            )}

            {activeView === 'attendance' && (
              <AttendanceTable
                selectedClass={selectedClass}
                onBulkAction={handleBulkAction}
              />
            )}

            {activeView === 'trends' && (
              <AttendanceTrends selectedClass={selectedClass} />
            )}

            {activeView === 'notifications' && (
              <NotificationCenter selectedClass={selectedClass} />
            )}

            {activeView === 'actions' && (
              <QuickActions
                selectedClass={selectedClass}
                onAction={handleQuickAction}
              />
            )}
          </div>

          {/* No Class Selected State */}
          {!selectedClass && (
            <div className="text-center py-12">
              <Icon name="BookOpen" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select a Class to Get Started
              </h3>
              <p className="text-muted-foreground mb-6">
                Choose a class from the dropdown above to view attendance data and manage students.
              </p>
              <Button
                variant="default"
                onClick={() => setSelectedClass('cs-101')}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Select Default Class
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;