import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TimetableSection = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const timetableData = {
    Monday: [
      { time: '9:00 AM', subject: 'Data Structures', room: 'CS-101', instructor: 'Dr. Smith' },
      { time: '11:00 AM', subject: 'Database Systems', room: 'CS-205', instructor: 'Prof. Johnson' },
      { time: '2:00 PM', subject: 'Software Engineering', room: 'CS-301', instructor: 'Dr. Brown' },
      { time: '4:00 PM', subject: 'Web Development Lab', room: 'CS-Lab-1', instructor: 'Mr. Wilson' }
    ],
    Tuesday: [
      { time: '10:00 AM', subject: 'Computer Networks', room: 'CS-102', instructor: 'Dr. Davis' },
      { time: '12:00 PM', subject: 'Operating Systems', room: 'CS-201', instructor: 'Prof. Miller' },
      { time: '3:00 PM', subject: 'Algorithm Analysis', room: 'CS-302', instructor: 'Dr. Taylor' }
    ],
    Wednesday: [
      { time: '9:00 AM', subject: 'Machine Learning', room: 'CS-401', instructor: 'Dr. Anderson' },
      { time: '11:00 AM', subject: 'Mobile App Development', room: 'CS-Lab-2', instructor: 'Ms. Garcia' },
      { time: '2:00 PM', subject: 'Cybersecurity', room: 'CS-303', instructor: 'Prof. White' }
    ],
    Thursday: [
      { time: '10:00 AM', subject: 'Cloud Computing', room: 'CS-402', instructor: 'Dr. Lee' },
      { time: '1:00 PM', subject: 'Project Management', room: 'CS-304', instructor: 'Mr. Clark' },
      { time: '3:30 PM', subject: 'Internship Seminar', room: 'CS-Hall', instructor: 'Career Team' }
    ],
    Friday: [
      { time: '9:00 AM', subject: 'AI Ethics', room: 'CS-403', instructor: 'Dr. Martinez' },
      { time: '11:00 AM', subject: 'Capstone Project', room: 'CS-Lab-3', instructor: 'Multiple' },
      { time: '2:00 PM', subject: 'Industry Guest Lecture', room: 'Main Auditorium', instructor: 'Guest Speaker' }
    ]
  };

  const upcomingClasses = [
    { subject: 'Data Structures', time: '9:00 AM', room: 'CS-101', status: 'next' },
    { subject: 'Database Systems', time: '11:00 AM', room: 'CS-205', status: 'upcoming' },
    { subject: 'Software Engineering', time: '2:00 PM', room: 'CS-301', status: 'upcoming' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'next': return 'bg-primary text-primary-foreground';
      case 'upcoming': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      // Mock file upload process
      console.log('Uploading timetable file:', file?.name);
      setShowUploadModal(false);
      // In real implementation, this would integrate with ERP system
    }
  };

  return (
    <div className="space-y-6">
      {/* Timetable Header */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">My Timetable</h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Wifi" size={16} className="text-success" />
              <span>ERP Synced</span>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors duration-150"
            >
              <Icon name="Upload" size={16} />
              <span>Upload</span>
            </button>
          </div>
        </div>

        {/* Day Navigation */}
        <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1 overflow-x-auto">
          {weekDays?.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 whitespace-nowrap ${
                selectedDay === day
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Timetable Content */}
        <div className="space-y-3">
          {timetableData?.[selectedDay]?.map((class_, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-150">
              <div className="text-center min-w-[80px]">
                <div className="text-sm font-semibold text-foreground">{class_?.time}</div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{class_?.subject}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{class_?.room}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="User" size={14} />
                    <span>{class_?.instructor}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-background rounded-lg transition-colors duration-150">
                <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Today's Classes */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Today's Classes</h3>
        <div className="space-y-3">
          {upcomingClasses?.map((class_, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(class_?.status)}`}>
                  {class_?.status === 'next' ? 'Next' : 'Upcoming'}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{class_?.subject}</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{class_?.time}</span>
                    <span>•</span>
                    <span>{class_?.room}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-background rounded-lg transition-colors duration-150">
                  <Icon name="Bell" size={16} className="text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-background rounded-lg transition-colors duration-150">
                  <Icon name="Navigation" size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Upload Timetable</h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-150"
              >
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Drop your timetable file here or</p>
                <label className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors duration-150">
                  <span>Browse Files</span>
                  <input
                    type="file"
                    accept=".pdf,.xlsx,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-muted-foreground mt-2">Supports PDF, Excel, CSV files</p>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Info" size={16} />
                <span>Files will be automatically synced with ERP system</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableSection;