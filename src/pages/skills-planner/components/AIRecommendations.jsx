import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AIRecommendations = ({ recommendations, onRateRecommendation, onStartRecommendation }) => {
  const [activeTab, setActiveTab] = useState('tasks');

  const tabs = [
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'courses', label: 'Courses', icon: 'BookOpen' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' }
  ];

  const renderStars = (rating, onRate, itemId) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <button
            key={star}
            onClick={() => onRate(itemId, star)}
            className="text-warning hover:text-warning/80 transition-colors"
          >
            <Icon
              name={star <= rating ? "Star" : "Star"}
              size={14}
              className={star <= rating ? "fill-current" : ""}
            />
          </button>
        ))}
      </div>
    );
  };

  const renderRecommendationCard = (item, type) => (
    <div key={item?.id} className="bg-muted/30 rounded-lg p-4 border border-border/50">
      <div className="flex items-start space-x-4">
        {type === 'courses' && (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item?.thumbnail}
              alt={item?.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h4 className="font-medium text-foreground text-sm mb-1">{item?.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{item?.description}</p>
            </div>
            <div className="flex items-center space-x-2 ml-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item?.matchScore >= 90
                  ? 'bg-success/10 text-success'
                  : item?.matchScore >= 70
                  ? 'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
              }`}>
                {item?.matchScore}% match
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
            {item?.duration && (
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={12} />
                <span>{item?.duration}</span>
              </div>
            )}
            {item?.difficulty && (
              <div className="flex items-center space-x-1">
                <Icon name="TrendingUp" size={12} />
                <span>{item?.difficulty}</span>
              </div>
            )}
            {item?.provider && (
              <div className="flex items-center space-x-1">
                <Icon name="Building" size={12} />
                <span>{item?.provider}</span>
              </div>
            )}
            {item?.price && (
              <div className="flex items-center space-x-1">
                <Icon name="DollarSign" size={12} />
                <span>{item?.price}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">Rate:</span>
                {renderStars(item?.userRating || 0, onRateRecommendation, item?.id)}
              </div>
              {item?.aiReason && (
                <div className="flex items-center space-x-1">
                  <Icon name="Sparkles" size={12} className="text-primary" />
                  <span className="text-xs text-primary">{item?.aiReason}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {type === 'courses' && item?.link && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(item?.link, '_blank')}
                >
                  <Icon name="ExternalLink" size={14} />
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onStartRecommendation(item?.id, type)}
              >
                {type === 'tasks' ? 'Start Task' : type === 'courses' ? 'Enroll' : 'View Details'}
              </Button>
            </div>
          </div>

          {item?.skills && (
            <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-border/30">
              {item?.skills?.slice(0, 3)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {item?.skills?.length > 3 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                  +{item?.skills?.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Sparkles" size={20} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground font-heading">AI Recommendations</h2>
            <p className="text-sm text-muted-foreground">Personalized suggestions based on your goals</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="RefreshCw" size={16} />
          <span>Updated 2 hours ago</span>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted/50 p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
              {recommendations?.[tab?.id]?.length || 0}
            </span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="space-y-4">
        {recommendations?.[activeTab]?.length > 0 ? (
          recommendations?.[activeTab]?.map((item) => renderRecommendationCard(item, activeTab))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Sparkles" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Recommendations Yet</h3>
            <p className="text-muted-foreground mb-4">
              Complete your skills selection to get personalized AI recommendations
            </p>
            <Button variant="outline">
              Refresh Recommendations
            </Button>
          </div>
        )}
      </div>
      {recommendations?.[activeTab]?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="Info" size={16} />
              <span>Recommendations update based on your progress and feedback</span>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="RefreshCw" size={14} className="mr-2" />
              Refresh All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;