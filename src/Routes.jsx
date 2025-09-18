import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import StudentProfile from './pages/student-profile';
import AttendanceCalendar from './pages/attendance-calendar';
import StudentDashboard from './pages/student-dashboard';
import SkillsPlanner from './pages/skills-planner';
import TeacherDashboard from './pages/teacher-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/attendance-calendar" element={<AttendanceCalendar />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/skills-planner" element={<SkillsPlanner />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;