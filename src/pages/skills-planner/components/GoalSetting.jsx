import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const GoalSetting = ({ onCreateGoal, onUpdateGoal, existingGoal = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: existingGoal?.title || '',
    description: existingGoal?.description || '',
    category: existingGoal?.category || '',
    priority: existingGoal?.priority || 'medium',
    targetDate: existingGoal?.targetDate || '',
    skills: existingGoal?.skills || [],
    milestones: existingGoal?.milestones || [{ title: '', description: '', dueDate: '' }],
    isPublic: existingGoal?.isPublic || false,
    reminderFrequency: existingGoal?.reminderFrequency || 'weekly'
  });

  const categories = [
    { id: 'technical', name: 'Technical Skills', icon: 'Code' },
    { id: 'design', name: 'Design & Creativity', icon: 'Palette' },
    { id: 'business', name: 'Business & Management', icon: 'Briefcase' },
    { id: 'communication', name: 'Communication', icon: 'MessageCircle' },
    { id: 'personal', name: 'Personal Development', icon: 'User' }
  ];

  const availableSkills = [
    'React', 'JavaScript', 'Python', 'UI/UX Design', 'Data Analysis',
    'Project Management', 'Public Speaking', 'Leadership', 'Machine Learning',
    'Mobile Development', 'Cloud Computing', 'Digital Marketing'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev?.skills?.includes(skill)
        ? prev?.skills?.filter(s => s !== skill)
        : [...prev?.skills, skill]
    }));
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev?.milestones, { title: '', description: '', dueDate: '' }]
    }));
  };

  const updateMilestone = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev?.milestones?.map((milestone, i) =>
        i === index ? { ...milestone, [field]: value } : milestone
      )
    }));
  };

  const removeMilestone = (index) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev?.milestones?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (existingGoal) {
      onUpdateGoal(existingGoal?.id, formData);
    } else {
      onCreateGoal(formData);
    }
    setIsOpen(false);
    // Reset form if creating new goal
    if (!existingGoal) {
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        targetDate: '',
        skills: [],
        milestones: [{ title: '', description: '', dueDate: '' }],
        isPublic: false,
        reminderFrequency: 'weekly'
      });
    }
  };

  const isFormValid = formData?.title && formData?.category && formData?.targetDate;

  return (
    <>
      <Button
        variant="default"
        iconName="Plus"
        iconPosition="left"
        onClick={() => setIsOpen(true)}
      >
        {existingGoal ? 'Edit Goal' : 'Create New Goal'}
      </Button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground font-heading">
                {existingGoal ? 'Edit Goal' : 'Create New Goal'}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Basic Information</h3>
                
                <Input
                  label="Goal Title"
                  type="text"
                  placeholder="e.g., Master React Development"
                  value={formData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe your goal and what you want to achieve..."
                    value={formData?.description}
                    onChange={(e) => handleInputChange('description', e?.target?.value)}
                    className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category
                    </label>
                    <select
                      value={formData?.category}
                      onChange={(e) => handleInputChange('category', e?.target?.value)}
                      className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    >
                      <option value="">Select category</option>
                      {categories?.map((category) => (
                        <option key={category?.id} value={category?.id}>
                          {category?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Priority
                    </label>
                    <select
                      value={formData?.priority}
                      onChange={(e) => handleInputChange('priority', e?.target?.value)}
                      className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <Input
                  label="Target Completion Date"
                  type="date"
                  value={formData?.targetDate}
                  onChange={(e) => handleInputChange('targetDate', e?.target?.value)}
                  required
                />
              </div>

              {/* Skills Selection */}
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Related Skills</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableSkills?.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                    >
                      <Checkbox
                        checked={formData?.skills?.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                      />
                      <span className="text-sm text-foreground">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">Milestones</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={addMilestone}
                  >
                    Add Milestone
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData?.milestones?.map((milestone, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-foreground">Milestone {index + 1}</h4>
                        {formData?.milestones?.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMilestone(index)}
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Input
                          label="Milestone Title"
                          type="text"
                          placeholder="e.g., Complete React Fundamentals"
                          value={milestone?.title}
                          onChange={(e) => updateMilestone(index, 'title', e?.target?.value)}
                        />

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Description
                          </label>
                          <textarea
                            placeholder="Describe this milestone..."
                            value={milestone?.description}
                            onChange={(e) => updateMilestone(index, 'description', e?.target?.value)}
                            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                            rows={2}
                          />
                        </div>

                        <Input
                          label="Due Date"
                          type="date"
                          value={milestone?.dueDate}
                          onChange={(e) => updateMilestone(index, 'dueDate', e?.target?.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <h3 className="font-medium text-foreground">Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Reminder Frequency
                    </label>
                    <select
                      value={formData?.reminderFrequency}
                      onChange={(e) => handleInputChange('reminderFrequency', e?.target?.value)}
                      className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="none">No Reminders</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2 pt-6">
                    <Checkbox
                      checked={formData?.isPublic}
                      onChange={(e) => handleInputChange('isPublic', e?.target?.checked)}
                    />
                    <label className="text-sm text-foreground">
                      Make this goal public (visible to mentors and peers)
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  disabled={!isFormValid}
                >
                  {existingGoal ? 'Update Goal' : 'Create Goal'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GoalSetting;