import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimetableUpload = ({ currentTimetable, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    if (file?.type !== 'application/pdf' && !file?.type?.includes('image')) {
      alert('Please upload a PDF or image file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="Calendar" size={20} className="mr-2 text-primary" />
          Timetable Management
        </h2>
        <Button variant="outline" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Download Current
        </Button>
      </div>
      <div className="space-y-6">
        {/* Current Timetable Preview */}
        {currentTimetable && (
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
              <Icon name="FileText" size={18} className="mr-2 text-secondary" />
              Current Timetable
            </h3>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={16} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{currentTimetable?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Uploaded on {currentTimetable?.uploadDate} • {currentTimetable?.semester}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Eye" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Edit" size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
            <Icon name="Upload" size={18} className="mr-2 text-accent" />
            Upload New Timetable
          </h3>
          
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
              dragActive 
                ? 'border-primary bg-primary/10' :'border-border bg-muted hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            
            {isUploading ? (
              <div className="space-y-4">
                <Icon name="Upload" size={48} className="mx-auto text-primary animate-pulse" />
                <div>
                  <p className="text-lg font-medium text-foreground mb-2">Uploading...</p>
                  <div className="w-full bg-background rounded-full h-2 mb-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground">{uploadProgress}% complete</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Icon 
                  name="Upload" 
                  size={48} 
                  className={`mx-auto ${dragActive ? 'text-primary' : 'text-muted-foreground'}`} 
                />
                <div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    {dragActive ? 'Drop your timetable here' : 'Upload your timetable'}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your PDF or image file here, or click to browse
                  </p>
                  <Button onClick={openFileDialog}>
                    <Icon name="FolderOpen" size={16} className="mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, JPG, PNG • Maximum file size: 10MB
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center">
            <Icon name="Zap" size={18} className="mr-2 text-accent" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start">
              <Icon name="Calendar" size={16} className="mr-2" />
              View Schedule
            </Button>
            <Button variant="outline" className="justify-start">
              <Icon name="Bell" size={16} className="mr-2" />
              Set Reminders
            </Button>
            <Button variant="outline" className="justify-start">
              <Icon name="Share" size={16} className="mr-2" />
              Share Timetable
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableUpload;