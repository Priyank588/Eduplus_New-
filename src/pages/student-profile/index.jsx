import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProfileHeader from './components/ProfileHeader';
import PersonalInfoCard from './components/PersonalInfoCard';
import AcademicSummary from './components/AcademicSummary';
import AttendanceOverview from './components/AttendanceOverview';
import SkillsSection from './components/SkillsSection';
import TimetableUpload from './components/TimetableUpload';
import NotificationSettings from './components/NotificationSettings';
import SecuritySettings from './components/SecuritySettings';

const StudentProfile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock student data
  const [studentData, setStudentData] = useState({
    name: "Prince chouhan",
    studentId: "STU2024001",
    email: "Prince.chouhan@university.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Campus Drive, University City, UC 12345",
    dateOfBirth: "2002-03-15",
    emergencyContact: "Priyank Arya",
    emergencyPhone: "+1 (555) 987-6543",
    program: "Computer Science",
    semester: "6th Semester",
    gpa: "3.85",
    attendanceRate: 87,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
  });

  const academicData = {
    currentSemester: "Spring 2024",
    enrolledCourses: 6,
    currentCredits: 18,
    currentGPA: "3.85",
    academicStanding: "Good Standing",
    completedCredits: 108,
    totalCredits: 120,
    cumulativeGPA: "3.78",
    expectedGraduation: "May 2025",
    achievements: [
      {
        title: "Dean\'s List",
        description: "Achieved GPA above 3.5 for consecutive semesters",
        date: "Fall 2023"
      },
      {
        title: "Programming Excellence Award",
        description: "Outstanding performance in Data Structures course",
        date: "Spring 2023"
      },
      {
        title: "Research Assistant",
        description: "Selected for AI research project under Dr. Smith",
        date: "Summer 2023"
      }
    ]
  };

  const attendanceData = {
    overall: 87,
    classesNeeded: 3,
    subjects: [
      { name: "Advanced Algorithms", present: 28, total: 32, percentage: 88, status: "Good" },
      { name: "Machine Learning", present: 25, total: 30, percentage: 83, status: "Good" },
      { name: "Database Systems", present: 30, total: 32, percentage: 94, status: "Excellent" },
      { name: "Software Engineering", present: 26, total: 32, percentage: 81, status: "Good" },
      { name: "Computer Networks", present: 22, total: 30, percentage: 73, status: "Warning" }
    ]
  };

  const skillsData = {
    skills: [
      { name: "JavaScript", level: "Advanced", progress: 85, description: "Frontend and backend development" },
      { name: "Python", level: "Expert", progress: 95, description: "Data science and web development" },
      { name: "React", level: "Advanced", progress: 80, description: "Modern web application development" },
      { name: "Machine Learning", level: "Intermediate", progress: 65, description: "ML algorithms and models" },
      { name: "Database Design", level: "Advanced", progress: 78, description: "SQL and NoSQL databases" },
      { name: "Cloud Computing", level: "Beginner", progress: 35, description: "AWS and Azure basics" }
    ],
    goals: [
      { title: "Complete AWS Certification", description: "Target: Solutions Architect Associate", targetDate: "Jun 2024", status: "in-progress" },
      { title: "Master Docker & Kubernetes", description: "Container orchestration skills", targetDate: "Aug 2024", status: "planned" },
      { title: "Build Full-Stack Project", description: "MERN stack application", targetDate: "May 2024", status: "in-progress" }
    ],
    certifications: [
      { name: "Python Programming", issuer: "Coursera", date: "Dec 2023" },
      { name: "React Developer", issuer: "Meta", date: "Oct 2023" },
      { name: "Git & GitHub", issuer: "GitHub", date: "Sep 2023" }
    ],
    recommendations: [
      { title: "Learn TypeScript", description: "Enhance your JavaScript skills with type safety" },
      { title: "Explore GraphQL", description: "Modern API development approach" },
      { title: "Study System Design", description: "Prepare for technical interviews" }
    ]
  };

  const currentTimetable = {
    name: "Spring 2024 Timetable",
    uploadDate: "January 15, 2024",
    semester: "Spring 2024"
  };

  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      attendance: true,
      assignments: true,
      grades: true,
      skills: false
    },
    push: {
      classReminders: true,
      emergency: true,
      achievements: true
    },
    sms: {
      critical: true,
      attendanceWarnings: true
    },
    schedule: {
      quietStart: "22:00",
      quietEnd: "08:00"
    }
  });

  const securityData = {
    twoFactorEnabled: true,
    loginAlerts: true,
    profileVisible: true,
    showActivity: false,
    lastPasswordChange: "March 1, 2024",
    recentLogins: [
      { device: "MacBook Pro", location: "University Campus", timestamp: "2 hours ago", status: "success" },
      { device: "iPhone 14", location: "Dormitory", timestamp: "1 day ago", status: "success" },
      { device: "Windows PC", location: "Library", timestamp: "3 days ago", status: "success" }
    ]
  };

  const handleProfileSave = (updatedData) => {
    setStudentData(updatedData);
    setIsEditing(false);
  };

  const handlePersonalInfoUpdate = (field, value) => {
    setStudentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillsUpdate = (updatedSkills) => {
    // Handle skills update
    console.log('Skills updated:', updatedSkills);
  };

  const handleTimetableUpload = (file) => {
    console.log('Timetable uploaded:', file?.name);
  };

  const handleNotificationUpdate = (settings) => {
    setNotificationSettings(settings);
  };

  const handleSecurityUpdate = (type, data) => {
    console.log('Security updated:', type, data);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'academic', label: 'Academic', icon: 'BookOpen' },
    { id: 'attendance', label: 'Attendance', icon: 'Calendar' },
    { id: 'skills', label: 'Skills', icon: 'Target' },
    { id: 'timetable', label: 'Timetable', icon: 'Clock' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'security', label: 'Security', icon: 'Shield' }
  ];

  useEffect(() => {
    document.title = 'Student Profile - EduPlus';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="student" 
        userName={studentData?.name}
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Sidebar 
        userRole="student"
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-all duration-300 ease-out-custom pt-16 pb-20 lg:pb-6 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Profile Header */}
          <ProfileHeader
            student={studentData}
            onEdit={setIsEditing}
            onSave={handleProfileSave}
            isEditing={isEditing}
          />

          {/* Tab Navigation */}
          <div className="bg-card rounded-lg border border-border mb-6">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
                    activeTab === tab?.id
                      ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-lg">
                    {tab?.icon === 'User' && '👤'}
                    {tab?.icon === 'BookOpen' && '📚'}
                    {tab?.icon === 'Calendar' && '📅'}
                    {tab?.icon === 'Target' && '🎯'}
                    {tab?.icon === 'Clock' && '🕐'}
                    {tab?.icon === 'Bell' && '🔔'}
                    {tab?.icon === 'Shield' && '🛡️'}
                  </span>
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <PersonalInfoCard
                  student={studentData}
                  isEditing={isEditing}
                  onUpdate={handlePersonalInfoUpdate}
                />
                <AcademicSummary academicData={academicData} />
              </div>
            )}

            {activeTab === 'academic' && (
              <AcademicSummary academicData={academicData} />
            )}

            {activeTab === 'attendance' && (
              <AttendanceOverview attendanceData={attendanceData} />
            )}

            {activeTab === 'skills' && (
              <SkillsSection
                skillsData={skillsData}
                onUpdateSkills={handleSkillsUpdate}
              />
            )}

            {activeTab === 'timetable' && (
              <TimetableUpload
                currentTimetable={currentTimetable}
                onUpload={handleTimetableUpload}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationSettings
                settings={notificationSettings}
                onUpdate={handleNotificationUpdate}
              />
            )}

            {activeTab === 'security' && (
              <SecuritySettings
                securityData={securityData}
                onUpdate={handleSecurityUpdate}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;