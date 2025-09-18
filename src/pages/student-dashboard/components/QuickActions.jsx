import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const quickActionItems = [
    {
      icon: 'Calendar',
      title: 'View Attendance',
      description: 'Check your attendance record',
      color: 'bg-blue-100 text-blue-700',
      action: () => console.log('Navigate to attendance')
    },
    {
      icon: 'Target',
      title: 'Skills Planner',
      description: 'Plan your skill development',
      color: 'bg-green-100 text-green-700',
      action: () => console.log('Navigate to skills planner')
    },
    {
      icon: 'BookOpen',
      title: 'Study Resources',
      description: 'Access learning materials',
      color: 'bg-purple-100 text-purple-700',
      action: () => console.log('Navigate to resources')
    },
    {
      icon: 'MessageSquare',
      title: 'Give Feedback',
      description: 'Rate AI recommendations',
      color: 'bg-orange-100 text-orange-700',
      action: () => setShowFeedback(true)
    }
  ];

  const recentActivities = [
    {
      icon: 'CheckCircle',
      title: 'Completed React Course Module 3',
      time: '2 hours ago',
      type: 'achievement'
    },
    {
      icon: 'Calendar',
      title: 'Attended Database Systems class',
      time: '4 hours ago',
      type: 'attendance'
    },
    {
      icon: 'Star',
      title: 'Earned "Quick Learner" badge',
      time: '1 day ago',
      type: 'badge'
    },
    {
      icon: 'BookOpen',
      title: 'Started AWS Cloud Practitioner course',
      time: '2 days ago',
      type: 'course'
    }
  ];

  const upcomingTasks = [
    {
      title: 'Complete Portfolio Website',
      dueDate: 'Due in 3 days',
      priority: 'high',
      progress: 75
    },
    {
      title: 'Submit Database Assignment',
      dueDate: 'Due in 5 days',
      priority: 'medium',
      progress: 30
    },
    {
      title: 'Prepare for Algorithm Quiz',
      dueDate: 'Due in 1 week',
      priority: 'low',
      progress: 10
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'achievement': return 'CheckCircle';
      case 'attendance': return 'Calendar';
      case 'badge': return 'Star';
      case 'course': return 'BookOpen';
      default: return 'Activity';
    }
  };

  const handleFeedbackSubmit = () => {
    if (feedbackRating > 0) {
      console.log('Feedback submitted:', { rating: feedbackRating, text: feedbackText });
      setShowFeedback(false);
      setFeedbackRating(0);
      setFeedbackText('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActionItems?.map((item, index) => (
            <button
              key={index}
              onClick={item?.action}
              className="flex flex-col items-center p-4 bg-muted rounded-lg hover:bg-muted/80 transition-all duration-150 group"
            >
              <div className={`p-3 rounded-lg ${item?.color} mb-3 group-hover:scale-110 transition-transform duration-150`}>
                <Icon name={item?.icon} size={20} />
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1 text-center">{item?.title}</h3>
              <p className="text-xs text-muted-foreground text-center">{item?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Activities */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-150">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentActivities?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{activity?.title}</p>
                <p className="text-xs text-muted-foreground">{activity?.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Tasks */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Tasks</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-150">
            Manage Tasks
          </button>
        </div>
        <div className="space-y-4">
          {upcomingTasks?.map((task, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">{task?.title}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task?.priority)}`}>
                  {task?.priority}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{task?.dueDate}</span>
                <span className="text-muted-foreground">{task?.progress}% complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${task?.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Rate AI Recommendations</h3>
              <button
                onClick={() => setShowFeedback(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
              >
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  How helpful were our recommendations?
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5]?.map((star) => (
                    <button
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className={`p-1 transition-colors duration-150 ${
                        star <= feedbackRating ? 'text-yellow-500' : 'text-muted-foreground'
                      }`}
                    >
                      <Icon name="Star" size={24} fill={star <= feedbackRating ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e?.target?.value)}
                  placeholder="Tell us how we can improve..."
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleFeedbackSubmit}
                  disabled={feedbackRating === 0}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
                >
                  Submit Feedback
                </button>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="px-4 py-2 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;