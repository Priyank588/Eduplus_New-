import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MotivationalSection = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const quotes = [
    {
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      category: "Perseverance"
    },
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Passion"
    },
    {
      text: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela",
      category: "Education"
    },
    {
      text: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      category: "Dreams"
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
      category: "Progress"
    }
  ];

  const tips = [
    {
      icon: "Clock",
      title: "Time Management",
      description: "Use the Pomodoro Technique: 25 minutes focused work, 5 minutes break.",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: "Brain",
      title: "Active Learning",
      description: "Teach concepts to others or explain them aloud to reinforce understanding.",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: "Target",
      title: "Goal Setting",
      description: "Break large goals into smaller, achievable milestones for better progress tracking.",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: "Heart",
      title: "Well-being",
      description: "Take regular breaks and maintain a healthy work-life balance for optimal performance.",
      color: "bg-red-100 text-red-700"
    }
  ];

  const achievements = [
    { icon: "Trophy", title: "Perfect Week", description: "100% attendance for 7 days", unlocked: true },
    { icon: "Star", title: "Quick Learner", description: "Complete 3 courses this month", unlocked: true },
    { icon: "Zap", title: "Streak Master", description: "10-day attendance streak", unlocked: false },
    { icon: "Crown", title: "Top Performer", description: "Rank in top 10% of class", unlocked: false }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes?.length);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, [quotes?.length]);

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes?.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes?.length) % quotes?.length);
  };

  const currentQuote = quotes?.[currentQuoteIndex];

  return (
    <div className="space-y-6">
      {/* Daily Quote */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Daily Inspiration</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevQuote}
              className="p-1 hover:bg-white/20 rounded-full transition-colors duration-150"
            >
              <Icon name="ChevronLeft" size={16} className="text-muted-foreground" />
            </button>
            <button
              onClick={nextQuote}
              className="p-1 hover:bg-white/20 rounded-full transition-colors duration-150"
            >
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <Icon name="Quote" size={32} className="text-primary mx-auto mb-4 opacity-50" />
            <blockquote className="text-lg font-medium text-foreground mb-3 leading-relaxed">
              "{currentQuote?.text}"
            </blockquote>
            <cite className="text-muted-foreground">— {currentQuote?.author}</cite>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
              {currentQuote?.category}
            </span>
          </div>
        </div>

        {/* Quote Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {quotes?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuoteIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-150 ${
                index === currentQuoteIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Study Tips */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Study Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips?.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className={`p-2 rounded-lg ${tip?.color} flex-shrink-0`}>
                <Icon name={tip?.icon} size={16} />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">{tip?.title}</h4>
                <p className="text-sm text-muted-foreground">{tip?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievement Badges */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Achievements</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-150">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements?.map((achievement, index) => (
            <div
              key={index}
              className={`text-center p-4 rounded-lg border transition-all duration-150 ${
                achievement?.unlocked
                  ? 'bg-success/10 border-success/20 hover:bg-success/20' :'bg-muted border-border opacity-60'
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                achievement?.unlocked ? 'bg-success text-white' : 'bg-muted-foreground/20 text-muted-foreground'
              }`}>
                <Icon name={achievement?.icon} size={20} />
              </div>
              <h4 className={`font-medium text-sm mb-1 ${
                achievement?.unlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement?.title}
              </h4>
              <p className={`text-xs ${
                achievement?.unlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'
              }`}>
                {achievement?.description}
              </p>
              {achievement?.unlocked && (
                <div className="mt-2">
                  <Icon name="Check" size={14} className="text-success mx-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotivationalSection;