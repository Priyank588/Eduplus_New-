import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ student, onEdit, onSave, isEditing }) => {
  const [editedData, setEditedData] = useState(student);

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0 mb-4 lg:mb-0">
          <div className="relative">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-muted">
              <Image
                src={student?.avatar}
                alt={`${student?.name} profile picture`}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-background shadow-sm"
            >
              <Icon name="Camera" size={14} />
            </Button>
          </div>
        </div>

        {/* Profile Information */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div className="mb-4 sm:mb-0">
              {isEditing ? (
                <input
                  type="text"
                  value={editedData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  className="text-2xl font-bold text-foreground bg-transparent border-b border-border focus:border-primary outline-none"
                />
              ) : (
                <h1 className="text-2xl font-bold text-foreground">{student?.name}</h1>
              )}
              <p className="text-muted-foreground mt-1">Student ID: {student?.studentId}</p>
            </div>

            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => onEdit(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Icon name="Save" size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => onEdit(true)}>
                  <Icon name="Edit" size={16} className="mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="GraduationCap" size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{student?.program}</p>
                  <p className="text-xs text-muted-foreground">Program</p>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{student?.semester}</p>
                  <p className="text-xs text-muted-foreground">Semester</p>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">{student?.gpa}</p>
                  <p className="text-xs text-muted-foreground">GPA</p>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">{student?.attendanceRate}%</p>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;