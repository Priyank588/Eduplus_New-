import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SkillsDevelopment = () => {
  const [selectedTab, setSelectedTab] = useState('recommendations');

  const recommendations = [
    {
      id: 1,
      type: 'course',
      title: 'Advanced React Development',
      provider: 'TechEdu',
      duration: '6 weeks',
      difficulty: 'Intermediate',
      rating: 4.8,
      progress: 0,
      description: 'Master advanced React concepts including hooks, context, and performance optimization.',
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: 2,
      type: 'task',
      title: 'Build a Portfolio Website',
      provider: 'AI Mentor',
      duration: '2 weeks',
      difficulty: 'Beginner',
      rating: 4.6,
      progress: 25,
      description: 'Create a professional portfolio showcasing your projects and skills.',
      tags: ['HTML', 'CSS', 'Portfolio']
    },
    {
      id: 3,
      type: 'certification',
      title: 'AWS Cloud Practitioner',
      provider: 'Amazon Web Services',
      duration: '4 weeks',
      difficulty: 'Intermediate',
      rating: 4.9,
      progress: 0,
      description: 'Get certified in AWS cloud fundamentals and services.',
      tags: ['AWS', 'Cloud', 'DevOps']
    }
  ];

  const skillProgress = [
    { skill: 'JavaScript', level: 75, target: 85 },
    { skill: 'React', level: 60, target: 80 },
    { skill: 'Node.js', level: 45, target: 70 },
    { skill: 'Database Design', level: 30, target: 60 }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course': return 'BookOpen';
      case 'task': return 'CheckSquare';
      case 'certification': return 'Award';
      default: return 'Star';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-700';
      case 'task': return 'bg-green-100 text-green-700';
      case 'certification': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600';
      case 'Intermediate': return 'text-yellow-600';
      case 'Advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Skills Development</h2>
        <div className="flex items-center space-x-2">
          <Icon name="Sparkles" size={20} className="text-accent" />
          <span className="text-sm font-medium text-accent">AI Powered</span>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        <button
          onClick={() => setSelectedTab('recommendations')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
            selectedTab === 'recommendations' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Recommendations
        </button>
        <button
          onClick={() => setSelectedTab('progress')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
            selectedTab === 'progress' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Progress
        </button>
      </div>
      {/* Recommendations Tab */}
      {selectedTab === 'recommendations' && (
        <div className="space-y-4">
          {recommendations?.map((item) => (
            <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-150">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(item?.type)}`}>
                    <Icon name={getTypeIcon(item?.type)} size={16} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{item?.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item?.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{item?.provider}</span>
                      <span>•</span>
                      <span>{item?.duration}</span>
                      <span>•</span>
                      <span className={getDifficultyColor(item?.difficulty)}>{item?.difficulty}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-yellow-500" />
                        <span>{item?.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150">
                  <Icon name="Play" size={14} />
                  <span>{item?.progress > 0 ? 'Continue' : 'Start'}</span>
                </button>
              </div>

              {/* Progress Bar */}
              {item?.progress > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{item?.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item?.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Progress Tab */}
      {selectedTab === 'progress' && (
        <div className="space-y-6">
          {skillProgress?.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">{skill?.skill}</h3>
                <div className="text-sm text-muted-foreground">
                  {skill?.level}% / {skill?.target}%
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(skill?.level / skill?.target) * 100}%` }}
                  ></div>
                </div>
                <div
                  className="absolute top-0 h-3 w-1 bg-secondary rounded-full"
                  style={{ left: `${(skill?.target / 100) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Current: {skill?.level}%</span>
                <span>Target: {skill?.target}%</span>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-border">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors duration-150">
              <Icon name="Target" size={16} />
              <span>Set New Goals</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsDevelopment;