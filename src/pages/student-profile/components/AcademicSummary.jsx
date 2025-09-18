import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AcademicSummary = ({ academicData }) => {
  const progressPercentage = (academicData?.completedCredits / academicData?.totalCredits) * 100;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-primary" />
          Academic Summary
        </h2>
        <Button variant="outline" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Transcript
        </Button>
      </div>
      <div className="space-y-6">
        {/* Current Semester */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-foreground">Current Semester</h3>
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              {academicData?.currentSemester}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Enrolled Courses</p>
              <p className="text-2xl font-bold text-foreground">{academicData?.enrolledCourses}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Credit Hours</p>
              <p className="text-2xl font-bold text-foreground">{academicData?.currentCredits}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current GPA</p>
              <p className="text-2xl font-bold text-foreground">{academicData?.currentGPA}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Standing</p>
              <p className="text-sm font-medium text-success">{academicData?.academicStanding}</p>
            </div>
          </div>
        </div>

        {/* Overall Progress */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-foreground">Degree Progress</h3>
            <span className="text-sm text-muted-foreground">
              {academicData?.completedCredits} / {academicData?.totalCredits} credits
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <Icon name="Trophy" size={24} className="mx-auto mb-2 text-accent" />
              <p className="text-sm text-muted-foreground">Cumulative GPA</p>
              <p className="text-xl font-bold text-foreground">{academicData?.cumulativeGPA}</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Icon name="Target" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Completion</p>
              <p className="text-xl font-bold text-foreground">{Math.round(progressPercentage)}%</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Icon name="Calendar" size={24} className="mx-auto mb-2 text-secondary" />
              <p className="text-sm text-muted-foreground">Expected Graduation</p>
              <p className="text-sm font-medium text-foreground">{academicData?.expectedGraduation}</p>
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Award" size={18} className="mr-2 text-accent" />
            Recent Achievements
          </h3>
          <div className="space-y-3">
            {academicData?.achievements?.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Star" size={16} className="text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{achievement?.title}</p>
                  <p className="text-sm text-muted-foreground">{achievement?.description}</p>
                </div>
                <span className="text-xs text-muted-foreground">{achievement?.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicSummary;