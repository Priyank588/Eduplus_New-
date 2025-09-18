import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SkillsOverview from './components/SkillsOverview';
import SkillsSelection from './components/SkillsSelection';
import AIRecommendations from './components/AIRecommendations';
import ProgressTracking from './components/ProgressTracking';
import MentorshipMatching from './components/MentorshipMatching';
import GoalSetting from './components/GoalSetting';

const SkillsPlanner = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showGoalModal, setShowGoalModal] = useState(false);

  // Mock data for current goals
  const currentGoals = [
    {
      id: 1,
      title: "Master React Development",
      category: "Technical Skills",
      priority: "high",
      progress: 75,
      dueDate: "Dec 31, 2025",
      completedTasks: 8,
      totalTasks: 12,
      nextAction: "Complete Hooks Tutorial"
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      category: "Design & Creativity",
      priority: "medium",
      progress: 45,
      dueDate: "Jan 15, 2026",
      completedTasks: 3,
      totalTasks: 8,
      nextAction: "Design System Study"
    },
    {
      id: 3,
      title: "Data Analysis with Python",
      category: "Technical Skills",
      priority: "low",
      progress: 20,
      dueDate: "Feb 28, 2026",
      completedTasks: 2,
      totalTasks: 10,
      nextAction: "Pandas Tutorial"
    }
  ];

  // Mock data for skill categories
  const skillCategories = [
    {
      id: 'technical',
      name: 'Technical Skills',
      icon: 'Code',
      skills: [
        { id: 1, name: 'React', description: 'Modern JavaScript library for building user interfaces', estimatedTime: '3 months', difficulty: 'Intermediate' },
        { id: 2, name: 'Python', description: 'Versatile programming language for web and data science', estimatedTime: '4 months', difficulty: 'Beginner' },
        { id: 3, name: 'JavaScript', description: 'Essential language for web development', estimatedTime: '2 months', difficulty: 'Beginner' },
        { id: 4, name: 'Node.js', description: 'JavaScript runtime for server-side development', estimatedTime: '2 months', difficulty: 'Intermediate' },
        { id: 5, name: 'Machine Learning', description: 'AI and predictive modeling techniques', estimatedTime: '6 months', difficulty: 'Advanced' },
        { id: 6, name: 'Cloud Computing', description: 'AWS, Azure, and cloud infrastructure', estimatedTime: '4 months', difficulty: 'Intermediate' }
      ]
    },
    {
      id: 'design',
      name: 'Design & Creativity',
      icon: 'Palette',
      skills: [
        { id: 7, name: 'UI/UX Design', description: 'User interface and experience design principles', estimatedTime: '3 months', difficulty: 'Intermediate' },
        { id: 8, name: 'Figma', description: 'Collaborative design and prototyping tool', estimatedTime: '1 month', difficulty: 'Beginner' },
        { id: 9, name: 'Adobe Creative Suite', description: 'Professional design software package', estimatedTime: '4 months', difficulty: 'Intermediate' },
        { id: 10, name: 'Design Systems', description: 'Creating consistent design frameworks', estimatedTime: '2 months', difficulty: 'Advanced' }
      ]
    },
    {
      id: 'business',
      name: 'Business & Management',
      icon: 'Briefcase',
      skills: [
        { id: 11, name: 'Project Management', description: 'Planning and executing projects effectively', estimatedTime: '2 months', difficulty: 'Intermediate' },
        { id: 12, name: 'Leadership', description: 'Leading teams and driving organizational success', estimatedTime: '3 months', difficulty: 'Advanced' },
        { id: 13, name: 'Digital Marketing', description: 'Online marketing strategies and tools', estimatedTime: '2 months', difficulty: 'Beginner' },
        { id: 14, name: 'Data Analytics', description: 'Business intelligence and data-driven decisions', estimatedTime: '3 months', difficulty: 'Intermediate' }
      ]
    }
  ];

  // Mock data for AI recommendations
  const recommendations = {
    tasks: [
      {
        id: 1,
        title: "Build a React Todo App",
        description: "Create a fully functional todo application using React hooks and context API to practice state management and component composition.",
        matchScore: 95,
        duration: "2-3 hours",
        difficulty: "Intermediate",
        skills: ["React", "JavaScript", "CSS"],
        aiReason: "Perfect for your React learning goal",
        userRating: 0
      },
      {
        id: 2,
        title: "Design a Mobile App Interface",
        description: "Create wireframes and high-fidelity mockups for a mobile application using Figma, focusing on user experience principles.",
        matchScore: 88,
        duration: "4-5 hours",
        difficulty: "Beginner",
        skills: ["UI/UX Design", "Figma", "Mobile Design"],
        aiReason: "Aligns with your design interests",
        userRating: 0
      },
      {
        id: 3,
        title: "Python Data Visualization Project",
        description: "Analyze a dataset and create interactive visualizations using Python libraries like Matplotlib and Seaborn.",
        matchScore: 82,
        duration: "3-4 hours",
        difficulty: "Intermediate",
        skills: ["Python", "Data Analysis", "Visualization"],
        aiReason: "Great for data science foundation",
        userRating: 0
      }
    ],
    courses: [
      {
        id: 1,
        title: "Advanced React Patterns",
        description: "Master advanced React concepts including render props, higher-order components, and custom hooks for building scalable applications.",
        provider: "Tech Academy",
        duration: "8 weeks",
        difficulty: "Advanced",
        price: "$199",
        matchScore: 92,
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
        skills: ["React", "JavaScript", "Advanced Patterns"],
        aiReason: "Next step in your React journey",
        userRating: 0,
        link: "https://example.com/react-course"
      },
      {
        id: 2,
        title: "UX Research Fundamentals",
        description: "Learn user research methodologies, usability testing, and how to translate insights into design decisions.",
        provider: "Design Institute",
        duration: "6 weeks",
        difficulty: "Beginner",
        price: "$149",
        matchScore: 85,
        thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
        skills: ["UX Research", "User Testing", "Design Thinking"],
        aiReason: "Foundation for your design goals",
        userRating: 0,
        link: "https://example.com/ux-course"
      }
    ],
    certifications: [
      {
        id: 1,
        title: "AWS Certified Developer",
        description: "Validate your expertise in developing and maintaining applications on the Amazon Web Services platform.",
        provider: "Amazon Web Services",
        duration: "3 months prep",
        difficulty: "Intermediate",
        price: "$150 exam fee",
        matchScore: 78,
        skills: ["Cloud Computing", "AWS", "DevOps"],
        aiReason: "High demand certification",
        userRating: 0
      },
      {
        id: 2,
        title: "Google UX Design Certificate",
        description: "Professional certificate program covering the entire UX design process from research to prototyping.",
        provider: "Google",
        duration: "6 months",
        difficulty: "Beginner",
        price: "$49/month",
        matchScore: 90,
        skills: ["UX Design", "Prototyping", "User Research"],
        aiReason: "Industry-recognized credential",
        userRating: 0
      }
    ]
  };

  // Mock data for progress tracking
  const progressData = {
    overall: {
      percentage: 68,
      completedSkills: 12,
      totalSkills: 18
    },
    activeGoals: 3,
    completedGoals: 2,
    streak: 15,
    bestStreak: 28,
    skillCategories: [
      { name: 'Technical', progress: 75 },
      { name: 'Design', progress: 60 },
      { name: 'Business', progress: 45 },
      { name: 'Communication', progress: 80 }
    ],
    weeklyTrend: [
      { week: 'Week 1', progress: 45 },
      { week: 'Week 2', progress: 52 },
      { week: 'Week 3', progress: 58 },
      { week: 'Week 4', progress: 68 }
    ]
  };

  // Mock data for milestones
  const milestones = [
    {
      id: 1,
      title: "Complete React Fundamentals",
      description: "Master the basics of React including components, props, and state management",
      progress: 90,
      completed: false,
      inProgress: true,
      dueDate: "Dec 20, 2025",
      completedTasks: 9,
      totalTasks: 10,
      skillsInvolved: 3,
      rewards: ["React Badge", "50 XP"]
    },
    {
      id: 2,
      title: "Build First Portfolio Project",
      description: "Create and deploy a complete web application showcasing your skills",
      progress: 100,
      completed: true,
      inProgress: false,
      dueDate: "Nov 30, 2025",
      completedTasks: 8,
      totalTasks: 8,
      skillsInvolved: 5,
      rewards: ["Portfolio Badge", "100 XP", "Certificate"]
    }
  ];

  // Mock data for competency mapping
  const competencyMap = {
    distribution: [
      { name: 'Beginner', value: 8 },
      { name: 'Intermediate', value: 6 },
      { name: 'Advanced', value: 3 },
      { name: 'Expert', value: 1 }
    ],
    total: 18,
    levels: [
      { name: 'Beginner', count: 8, percentage: 44, icon: 'Circle', color: 'text-success', bgColor: 'bg-success' },
      { name: 'Intermediate', count: 6, percentage: 33, icon: 'CircleDot', color: 'text-warning', bgColor: 'bg-warning' },
      { name: 'Advanced', count: 3, percentage: 17, icon: 'Target', color: 'text-primary', bgColor: 'bg-primary' },
      { name: 'Expert', count: 1, percentage: 6, icon: 'Award', color: 'text-error', bgColor: 'bg-error' }
    ],
    recentAchievements: [
      {
        id: 1,
        title: "React Hooks Master",
        description: "Completed advanced React hooks tutorial with 95% score",
        date: "2 days ago"
      },
      {
        id: 2,
        title: "Design System Creator",
        description: "Built comprehensive design system for portfolio project",
        date: "1 week ago"
      }
    ]
  };

  // Mock data for mentors
  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior React Developer at Google",
      type: "industry",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      bio: "Passionate about teaching modern web development with 8+ years of experience in React and JavaScript ecosystems.",
      expertise: ["React", "JavaScript", "TypeScript", "Node.js", "GraphQL"],
      rating: 4.9,
      mentees: 24,
      responseTime: "2 hours",
      location: "San Francisco, CA",
      availability: "available",
      isOnline: true,
      matchScore: 95,
      nextAvailable: "Today at 3:00 PM",
      isConnected: false
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "UX Design Lead at Adobe",
      type: "industry",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      bio: "Design thinking advocate with expertise in user research, prototyping, and design systems for enterprise applications.",
      expertise: ["UX Design", "Design Systems", "Figma", "User Research", "Prototyping"],
      rating: 4.8,
      mentees: 18,
      responseTime: "4 hours",
      location: "Austin, TX",
      availability: "busy",
      isOnline: true,
      matchScore: 88,
      nextAvailable: "Tomorrow at 10:00 AM",
      isConnected: false
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      title: "Computer Science Professor",
      type: "teachers",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      bio: "Academic researcher and educator specializing in machine learning and data science with 12 years of teaching experience.",
      expertise: ["Python", "Machine Learning", "Data Science", "Statistics", "Research Methods"],
      rating: 4.7,
      mentees: 32,
      responseTime: "1 day",
      location: "Boston, MA",
      availability: "available",
      isOnline: false,
      matchScore: 82,
      nextAvailable: "Monday at 2:00 PM",
      isConnected: false
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'skills', label: 'Skills Selection', icon: 'Target' },
    { id: 'recommendations', label: 'AI Recommendations', icon: 'Sparkles' },
    { id: 'progress', label: 'Progress Tracking', icon: 'TrendingUp' },
    { id: 'mentorship', label: 'Mentorship', icon: 'Users' }
  ];

  const handleSkillToggle = (skillId, skillName, category) => {
    setSelectedSkills(prev => {
      const exists = prev?.find(s => s?.id === skillId);
      if (exists) {
        return prev?.filter(s => s?.id !== skillId);
      } else {
        return [...prev, { id: skillId, name: skillName, category, priority: 'medium' }];
      }
    });
  };

  const handlePriorityChange = (skillId, priority) => {
    setSelectedSkills(prev =>
      prev?.map(skill =>
        skill?.id === skillId ? { ...skill, priority } : skill
      )
    );
  };

  const handleRateRecommendation = (itemId, rating) => {
    console.log(`Rating ${itemId} with ${rating} stars`);
  };

  const handleStartRecommendation = (itemId, type) => {
    console.log(`Starting ${type} with ID ${itemId}`);
  };

  const handleConnectMentor = (mentorId) => {
    console.log(`Connecting to mentor ${mentorId}`);
  };

  const handleViewMentorProfile = (mentorId) => {
    console.log(`Viewing mentor profile ${mentorId}`);
  };

  const handleCreateGoal = (goalData) => {
    console.log('Creating new goal:', goalData);
  };

  const handleUpdateGoal = (goalId, goalData) => {
    console.log('Updating goal:', goalId, goalData);
  };

  const handleViewGoalDetails = (goalId) => {
    console.log('Viewing goal details:', goalId);
  };

  const handleAddGoal = () => {
    setShowGoalModal(true);
  };

  const handleUpdateProgress = (milestoneId) => {
    console.log('Updating progress for milestone:', milestoneId);
  };

  useEffect(() => {
    document.title = 'Skills Planner - EduPlus';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="student"
        userName="Alex Johnson"
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Sidebar
        userRole="student"
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`pt-16 pb-20 lg:pb-6 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground font-heading">
                Skills Planner
              </h1>
              <p className="text-muted-foreground mt-1">
                Develop personalized learning paths with AI-powered recommendations
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button variant="outline" iconName="Download">
                Export Plan
              </Button>
              <GoalSetting
                onCreateGoal={handleCreateGoal}
                onUpdateGoal={handleUpdateGoal}
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Goals</p>
                  <p className="text-2xl font-bold text-foreground">{currentGoals?.length}</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={20} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Skills Selected</p>
                  <p className="text-2xl font-bold text-foreground">{selectedSkills?.length}</p>
                </div>
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckSquare" size={20} className="text-secondary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Recommendations</p>
                  <p className="text-2xl font-bold text-foreground">
                    {recommendations?.tasks?.length + recommendations?.courses?.length + recommendations?.certifications?.length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Sparkles" size={20} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Learning Streak</p>
                  <p className="text-2xl font-bold text-foreground">{progressData?.streak} days</p>
                </div>
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Flame" size={20} className="text-warning" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-6 bg-muted/50 p-1 rounded-lg overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <SkillsOverview
                currentGoals={currentGoals}
                onViewDetails={handleViewGoalDetails}
                onAddGoal={handleAddGoal}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsSelection
                skillCategories={skillCategories}
                selectedSkills={selectedSkills}
                onSkillToggle={handleSkillToggle}
                onPriorityChange={handlePriorityChange}
              />
            )}

            {activeTab === 'recommendations' && (
              <AIRecommendations
                recommendations={recommendations}
                onRateRecommendation={handleRateRecommendation}
                onStartRecommendation={handleStartRecommendation}
              />
            )}

            {activeTab === 'progress' && (
              <ProgressTracking
                progressData={progressData}
                milestones={milestones}
                competencyMap={competencyMap}
                onUpdateProgress={handleUpdateProgress}
              />
            )}

            {activeTab === 'mentorship' && (
              <MentorshipMatching
                mentors={mentors}
                onConnectMentor={handleConnectMentor}
                onViewProfile={handleViewMentorProfile}
              />
            )}
          </div>

          {/* Motivational Quote */}
          <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Quote" size={20} className="text-primary" />
              </div>
              <div>
                <blockquote className="text-lg font-medium text-foreground mb-2">
                  "The beautiful thing about learning is that no one can take it away from you."
                </blockquote>
                <cite className="text-sm text-muted-foreground">— B.B. King</cite>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SkillsPlanner;