import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    student: {
      email: 'student@eduplus.com',
      password: 'student123'
    },
    teacher: {
      email: 'teacher@eduplus.com',
      password: 'teacher123'
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockCreds = mockCredentials?.[formData?.role];
      
      if (formData?.email === mockCreds?.email && formData?.password === mockCreds?.password) {
        // Store user data in localStorage
        localStorage.setItem('userRole', formData?.role);
        localStorage.setItem('userName', formData?.role === 'student' ? 'Alex Johnson' : 'Dr. Sarah Wilson');
        localStorage.setItem('userEmail', formData?.email);
        
        // Navigate to appropriate dashboard
        if (formData?.role === 'teacher') {
          navigate('/teacher-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        setErrors({
          general: `Invalid credentials. Use ${mockCreds?.email} / ${mockCreds?.password} for ${formData?.role} login.`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
    setErrors({});
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Login as
          </label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={formData?.role === 'student' ? 'default' : 'outline'}
              onClick={() => handleRoleChange('student')}
              className="flex items-center justify-center space-x-2 py-3"
            >
              <Icon name="BookOpen" size={18} />
              <span>Student</span>
            </Button>
            <Button
              type="button"
              variant={formData?.role === 'teacher' ? 'default' : 'outline'}
              onClick={() => handleRoleChange('teacher')}
              className="flex items-center justify-center space-x-2 py-3"
            >
              <Icon name="GraduationCap" size={18} />
              <span>Teacher</span>
            </Button>
          </div>
        </div>

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="w-full"
        />

        {/* Password Input */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="w-full"
        />

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
          />
          
          <Button
            type="button"
            variant="link"
            className="text-sm text-primary hover:text-primary/80 p-0"
          >
            Forgot password?
          </Button>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          loading={isLoading}
          fullWidth
          className="py-3"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        {/* Registration Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Button
              type="button"
              variant="link"
              className="text-primary hover:text-primary/80 p-0 text-sm font-medium"
            >
              Register here
            </Button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;