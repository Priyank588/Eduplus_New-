import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsSection = ({ skillsData, onUpdateSkills }) => {
  const navigate = useNavigate();
  const [showAllSkills, setShowAllSkills] = useState(false);

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-success text-success-foreground';
      case 'Advanced': return 'bg-primary text-primary-foreground';
      case 'Intermediate': return 'bg-warning text-warning-foreground';
      case 'Beginner': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-primary';
    if (progress >= 40) return 'bg-warning';
    return 'bg-error';
  };

  const displayedSkills = showAllSkills ? skillsData?.skills : skillsData?.skills?.slice(0, 6);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="Target" size={20} className="mr-2 text-primary" />
          Skills & Development
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/skills-planner')}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Manage Skills
        </Button>
      </div>
      <div className="space-y-6">
        {/* Current Skills */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground flex items-center">
              <Icon name="Zap" size={18} className="mr-2 text-accent" />
              Current Skills
            </h3>
            {skillsData?.skills?.length > 6 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllSkills(!showAllSkills)}
              >
                {showAllSkills ? 'Show Less' : `Show All (${skillsData?.skills?.length})`}
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedSkills?.map((skill, index) => (
              <div key={index} className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Code" size={16} className="text-primary" />
                    <span className="font-medium text-foreground">{skill?.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillLevelColor(skill?.level)}`}>
                    {skill?.level}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{skill?.progress}%</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(skill?.progress)}`}
                      style={{ width: `${skill?.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">{skill?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Development Goals */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Flag" size={18} className="mr-2 text-secondary" />
            Development Goals
          </h3>
          <div className="space-y-3">
            {skillsData?.goals?.map((goal, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    goal?.status === 'completed' ? 'bg-success' :
                    goal?.status === 'in-progress'? 'bg-primary' : 'bg-muted-foreground'
                  }`}></div>
                  <div>
                    <p className="font-medium text-foreground">{goal?.title}</p>
                    <p className="text-sm text-muted-foreground">{goal?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{goal?.targetDate}</p>
                  <p className="text-xs text-muted-foreground capitalize">{goal?.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Award" size={18} className="mr-2 text-accent" />
            Certifications & Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsData?.certifications?.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 border border-border">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Trophy" size={16} className="text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{cert?.name}</p>
                    <p className="text-xs text-muted-foreground">{cert?.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{cert?.date}</span>
                  <Button variant="ghost" size="sm">
                    <Icon name="ExternalLink" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Recommendations */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-4">
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="Lightbulb" size={18} className="mr-2 text-accent" />
            AI Recommendations
          </h3>
          <div className="space-y-3">
            {skillsData?.recommendations?.map((rec, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">{rec?.title}</p>
                  <p className="text-xs text-muted-foreground">{rec?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;