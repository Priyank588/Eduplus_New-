import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import AttendanceInsights from './components/AttendanceInsights';
import AttendanceCalendar from './components/AttendanceCalendar';
import SkillsDevelopment from './components/SkillsDevelopment';
import MotivationalSection from './components/MotivationalSection';
import TimetableSection from './components/TimetableSection';
import QuickActions from './components/QuickActions';
import StatusIndicators from './components/StatusIndicators';

const StudentDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Student Dashboard - EduPlus</title>
        <meta name="description" content="Personalized academic insights and skill development guidance through AI-powered interface" />
      </Helmet>
      {/* Header */}
      <Header 
        userRole="student" 
        userName="Alex Johnson"
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />
      {/* Sidebar */}
      <Sidebar 
        userRole="student"
        isCollapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      {/* Main Content */}
      <main className={`transition-all duration-300 ease-out-custom pt-16 pb-20 lg:pb-6 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="px-4 lg:px-6 py-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex! 👋</h1>
              <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>All systems operational</span>
                </div>
                <div className="text-muted-foreground">
                  {new Date()?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              Here's your personalized academic overview and skill development insights.
            </p>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Primary Content */}
            <div className="xl:col-span-2 space-y-6">
              {/* Attendance Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AttendanceInsights />
                <AttendanceCalendar />
              </div>

              {/* Skills Development */}
              <SkillsDevelopment />

              {/* Timetable Section */}
              <TimetableSection />
            </div>

            {/* Right Column - Secondary Content */}
            <div className="space-y-6">
              {/* Motivational Section */}
              <MotivationalSection />

              {/* Quick Actions */}
              <QuickActions />

              {/* Status Indicators */}
              <StatusIndicators />
            </div>
          </div>

          {/* Bottom Section - Additional Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Performance Summary */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Performance Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall GPA</span>
                  <span className="text-lg font-semibold text-primary">3.7/4.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Attendance Rate</span>
                  <span className="text-lg font-semibold text-success">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Skills Progress</span>
                  <span className="text-lg font-semibold text-secondary">65%</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Class Rank</span>
                    <span className="font-medium text-foreground">#12 of 45</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-error/10 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground text-sm">Database Project</p>
                    <p className="text-xs text-error">Due tomorrow</p>
                  </div>
                  <div className="w-2 h-2 bg-error rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground text-sm">React Assignment</p>
                    <p className="text-xs text-warning">Due in 3 days</p>
                  </div>
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground text-sm">Algorithm Quiz</p>
                    <p className="text-xs text-success">Due in 1 week</p>
                  </div>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Study Streak */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Study Streak</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">12</div>
                <p className="text-sm text-muted-foreground mb-4">Days in a row</p>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(7)]?.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < 5 ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Keep it up! You're on fire 🔥
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;