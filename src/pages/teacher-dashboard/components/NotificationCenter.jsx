import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const NotificationCenter = ({ selectedClass }) => {
  const [activeTab, setActiveTab] = useState('compose');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [messageType, setMessageType] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const recipientOptions = [
    { value: 'all-students', label: 'All Students in Class', description: '45 students' },
    { value: 'present-students', label: 'Present Students Only', description: '38 students' },
    { value: 'absent-students', label: 'Absent Students Only', description: '7 students' },
    { value: 'detained-students', label: 'Detained Students', description: '3 students' },
    { value: 'custom', label: 'Select Individual Students', description: 'Custom selection' }
  ];

  const messageTypeOptions = [
    { value: 'attendance-reminder', label: 'Attendance Reminder' },
    { value: 'assignment-alert', label: 'Assignment Alert' },
    { value: 'exam-notification', label: 'Exam Notification' },
    { value: 'general-announcement', label: 'General Announcement' },
    { value: 'parent-notification', label: 'Parent Notification' }
  ];

  const recentNotifications = [
    {
      id: 1,
      type: 'Attendance Reminder',
      recipients: 'All Students',
      subject: 'Attendance Below 75% - Action Required',
      sentAt: '2025-09-16 14:30',
      status: 'Delivered',
      readCount: 42
    },
    {
      id: 2,
      type: 'Assignment Alert',
      recipients: 'CS101 Students',
      subject: 'Assignment Due Tomorrow',
      sentAt: '2025-09-16 10:15',
      status: 'Delivered',
      readCount: 38
    },
    {
      id: 3,
      type: 'Exam Notification',
      recipients: 'All Students',
      subject: 'Mid-term Exam Schedule Released',
      sentAt: '2025-09-15 16:45',
      status: 'Delivered',
      readCount: 45
    }
  ];

  const quickTemplates = [
    {
      name: 'Attendance Warning',
      subject: 'Attendance Below Required Threshold',
      content: `Dear Student,\n\nYour attendance percentage has fallen below the required 75% threshold. Please ensure regular attendance to avoid academic penalties.\n\nCurrent Attendance: [PERCENTAGE]%\nRequired: 75%\n\nBest regards,\n[TEACHER_NAME]`
    },
    {
      name: 'Assignment Reminder',
      subject: 'Assignment Submission Reminder',
      content: `Dear Students,\n\nThis is a reminder that your assignment is due tomorrow. Please ensure timely submission to avoid late penalties.\n\nAssignment: [ASSIGNMENT_NAME]\nDue Date: [DUE_DATE]\n\nBest regards,\n[TEACHER_NAME]`
    },
    {
      name: 'Class Cancellation',
      subject: 'Class Cancelled - [DATE]',
      content: `Dear Students,\n\nDue to unforeseen circumstances, today's class has been cancelled. We will reschedule and notify you of the new timing.\n\nThank you for your understanding.\n\nBest regards,\n[TEACHER_NAME]`
    }
  ];

  const handleSendNotification = () => {
    // Send notification logic would go here
    console.log('Sending notification:', {
      recipients: selectedRecipients,
      type: messageType,
      subject: messageSubject,
      content: messageContent,
      scheduledTime
    });
    
    // Reset form
    setSelectedRecipients([]);
    setMessageType('');
    setMessageSubject('');
    setMessageContent('');
    setScheduledTime('');
  };

  const handleTemplateSelect = (template) => {
    setMessageSubject(template?.subject);
    setMessageContent(template?.content);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-success';
      case 'Pending': return 'text-warning';
      case 'Failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Notification Center</h2>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setActiveTab('compose')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'compose' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Edit" size={16} className="inline mr-2" />
            Compose
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'history' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="History" size={16} className="inline mr-2" />
            History
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'templates' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="FileText" size={16} className="inline mr-2" />
            Templates
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'compose' && (
          <div className="space-y-6">
            {/* Recipients */}
            <Select
              label="Select Recipients"
              placeholder="Choose who will receive this notification"
              options={recipientOptions}
              value={selectedRecipients}
              onChange={setSelectedRecipients}
              multiple
              searchable
              required
            />

            {/* Message Type */}
            <Select
              label="Message Type"
              placeholder="Select notification type"
              options={messageTypeOptions}
              value={messageType}
              onChange={setMessageType}
              required
            />

            {/* Subject */}
            <Input
              label="Subject"
              type="text"
              placeholder="Enter notification subject"
              value={messageSubject}
              onChange={(e) => setMessageSubject(e?.target?.value)}
              required
            />

            {/* Message Content */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message Content
              </label>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e?.target?.value)}
                placeholder="Type your message here..."
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none bg-input text-foreground"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                {messageContent?.length}/500 characters
              </p>
            </div>

            {/* Schedule Options */}
            <div className="flex items-center space-x-4">
              <Checkbox
                label="Schedule for later"
                checked={!!scheduledTime}
                onChange={(e) => setScheduledTime(e?.target?.checked ? new Date()?.toISOString()?.slice(0, 16) : '')}
              />
              
              {scheduledTime && (
                <Input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e?.target?.value)}
                  className="flex-1"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="Save">
                  Save Draft
                </Button>
                <Button variant="ghost" size="sm" iconName="Eye">
                  Preview
                </Button>
              </div>
              
              <Button
                variant="default"
                onClick={handleSendNotification}
                disabled={!selectedRecipients?.length || !messageSubject || !messageContent}
                iconName="Send"
                iconPosition="left"
              >
                {scheduledTime ? 'Schedule' : 'Send Now'}
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {recentNotifications?.map((notification) => (
              <div key={notification?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{notification?.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      {notification?.type} • {notification?.recipients}
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(notification?.status)}`}>
                    {notification?.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Sent: {notification?.sentAt}</span>
                  <span>Read by {notification?.readCount} students</span>
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  <Button variant="ghost" size="sm" iconName="Eye">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Copy">
                    Duplicate
                  </Button>
                  <Button variant="ghost" size="sm" iconName="BarChart3">
                    Analytics
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Quick templates to speed up your communication
              </p>
              <Button variant="outline" size="sm" iconName="Plus">
                Create Template
              </Button>
            </div>
            
            {quickTemplates?.map((template, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{template?.name}</h4>
                    <p className="text-sm text-muted-foreground">{template?.subject}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTemplateSelect(template)}
                    iconName="Copy"
                  >
                    Use Template
                  </Button>
                </div>
                
                <div className="bg-muted/50 rounded p-3 mt-3">
                  <p className="text-sm text-foreground whitespace-pre-line">
                    {template?.content?.substring(0, 150)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;