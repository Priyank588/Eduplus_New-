import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import DemoCredentials from './components/DemoCredentials';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
      if (userRole === 'teacher') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg">
          {/* Background Card */}
          <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-2xl p-8 md:p-10">
            
            {/* Welcome Header */}
            <WelcomeHeader />
            
            {/* Login Form */}
            <LoginForm />
            
            {/* Demo Credentials */}
            <DemoCredentials />
            
            {/* Trust Signals */}
            <TrustSignals />
            
            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} EduPlus. All rights reserved.
              </p>
              <div className="flex items-center justify-center space-x-4 mt-2">
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <span className="text-xs text-muted-foreground">•</span>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <span className="text-xs text-muted-foreground">•</span>
                <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@eduplus.com" className="text-primary hover:text-primary/80 font-medium">
                support@eduplus.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;