import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsOverview = ({ currentGoals, onViewDetails, onAddGoal }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground font-heading">Current Goals</h2>
          <p className="text-sm text-muted-foreground mt-1">Track your active skill development</p>
        </div>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={onAddGoal}
          className="hidden sm:flex"
        >
          Add Goal
        </Button>
        <Button
          variant="outline"
          iconName="Plus"
          onClick={onAddGoal}
          className="sm:hidden"
        />
      </div>
      <div className="space-y-4">
        {currentGoals?.map((goal) => (
          <div key={goal?.id} className="bg-muted/50 rounded-lg p-4 border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{goal?.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{goal?.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  goal?.priority === 'high' ?'bg-error/10 text-error' 
                    : goal?.priority === 'medium' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                }`}>
                  {goal?.priority}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewDetails(goal?.id)}
                >
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{goal?.progress}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all duration-300"
                  style={{ width: `${goal?.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>Due {goal?.dueDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Target" size={14} />
                  <span>{goal?.completedTasks}/{goal?.totalTasks} tasks</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {goal?.nextAction && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary"
                  >
                    {goal?.nextAction}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {currentGoals?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Target" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Active Goals</h3>
            <p className="text-muted-foreground mb-4">Start your skill development journey by setting your first goal</p>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={onAddGoal}
            >
              Create Your First Goal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsOverview;