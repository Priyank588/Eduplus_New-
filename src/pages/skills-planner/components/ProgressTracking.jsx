import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracking = ({ progressData, milestones, competencyMap, onUpdateProgress }) => {
  const [activeView, setActiveView] = useState('overview');

  const views = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'milestones', label: 'Milestones', icon: 'Flag' },
    { id: 'competency', label: 'Competency', icon: 'Target' }
  ];

  const COLORS = ['#2563EB', '#059669', '#F59E0B', '#EF4444', '#8B5CF6'];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">Total Progress</h4>
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {progressData?.overall?.percentage}%
          </div>
          <p className="text-sm text-muted-foreground">
            {progressData?.overall?.completedSkills} of {progressData?.overall?.totalSkills} skills
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">Active Goals</h4>
            <Icon name="Target" size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {progressData?.activeGoals}
          </div>
          <p className="text-sm text-muted-foreground">
            {progressData?.completedGoals} completed this month
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-foreground">Learning Streak</h4>
            <Icon name="Flame" size={16} className="text-warning" />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">
            {progressData?.streak} days
          </div>
          <p className="text-sm text-muted-foreground">
            Keep it up! Personal best: {progressData?.bestStreak} days
          </p>
        </div>
      </div>

      {/* Skills Progress Chart */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <h4 className="font-medium text-foreground mb-4">Skills Progress by Category</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={progressData?.skillCategories}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="progress" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Progress Trend */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <h4 className="font-medium text-foreground mb-4">Weekly Progress Trend</h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData?.weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="week" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-4">
      {milestones?.map((milestone) => (
        <div key={milestone?.id} className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                milestone?.completed
                  ? 'bg-success text-success-foreground'
                  : milestone?.inProgress
                  ? 'bg-warning text-warning-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon 
                  name={milestone?.completed ? "Check" : milestone?.inProgress ? "Clock" : "Circle"} 
                  size={16} 
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{milestone?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{milestone?.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">{milestone?.progress}%</div>
              <div className="text-xs text-muted-foreground">{milestone?.dueDate}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="w-full bg-border rounded-full h-2">
              <div
                className={`rounded-full h-2 transition-all duration-300 ${
                  milestone?.completed
                    ? 'bg-success'
                    : milestone?.inProgress
                    ? 'bg-warning' :'bg-muted-foreground'
                }`}
                style={{ width: `${milestone?.progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4 text-muted-foreground">
                <span>{milestone?.completedTasks}/{milestone?.totalTasks} tasks</span>
                <span>{milestone?.skillsInvolved} skills involved</span>
              </div>
              {!milestone?.completed && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdateProgress(milestone?.id)}
                >
                  Update Progress
                </Button>
              )}
            </div>
          </div>

          {milestone?.rewards && milestone?.rewards?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Gift" size={14} className="text-primary" />
                <span className="text-muted-foreground">Rewards:</span>
                <div className="flex space-x-2">
                  {milestone?.rewards?.map((reward, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {reward}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderCompetency = () => (
    <div className="space-y-6">
      {/* Competency Distribution */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <h4 className="font-medium text-foreground mb-4">Competency Distribution</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={competencyMap?.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {competencyMap?.distribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3">
            {competencyMap?.distribution?.map((item, index) => (
              <div key={item?.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                  />
                  <span className="text-sm font-medium text-foreground">{item?.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item?.value} skills ({Math.round((item?.value / competencyMap?.total) * 100)}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Level Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {competencyMap?.levels?.map((level) => (
          <div key={level?.name} className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-foreground">{level?.name}</h5>
              <Icon name={level?.icon} size={16} className={level?.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{level?.count}</div>
            <p className="text-sm text-muted-foreground">{level?.percentage}% of skills</p>
            <div className="mt-2">
              <div className="w-full bg-border rounded-full h-1">
                <div
                  className={`rounded-full h-1 ${level?.bgColor}`}
                  style={{ width: `${level?.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Achievements */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <h4 className="font-medium text-foreground mb-4">Recent Achievements</h4>
        <div className="space-y-3">
          {competencyMap?.recentAchievements?.map((achievement) => (
            <div key={achievement?.id} className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border/50">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <Icon name="Award" size={16} className="text-success" />
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-foreground">{achievement?.title}</h5>
                <p className="text-sm text-muted-foreground">{achievement?.description}</p>
              </div>
              <div className="text-sm text-muted-foreground">{achievement?.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground font-heading">Progress Tracking</h2>
          <p className="text-sm text-muted-foreground mt-1">Monitor your skill development journey</p>
        </div>
        <Button variant="outline" iconName="Download">
          Export Report
        </Button>
      </div>
      {/* View Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted/50 p-1 rounded-lg">
        {views?.map((view) => (
          <button
            key={view?.id}
            onClick={() => setActiveView(view?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeView === view?.id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={view?.icon} size={16} />
            <span>{view?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div>
        {activeView === 'overview' && renderOverview()}
        {activeView === 'milestones' && renderMilestones()}
        {activeView === 'competency' && renderCompetency()}
      </div>
    </div>
  );
};

export default ProgressTracking;