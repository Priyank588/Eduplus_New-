import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DayDetailsModal = ({ 
  isOpen, 
  onClose, 
  selectedDate, 
  dayDetails, 
  currentDate 
}) => {
  if (!isOpen || !selectedDate || !dayDetails) return null;
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const formatDate = () => {
    const month = monthNames?.[currentDate?.getMonth()];
    return `${month} ${selectedDate}, ${currentDate?.getFullYear()}`;
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'text-success bg-success/10';
      case 'absent': return 'text-error bg-error/10';
      case 'late': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return 'CheckCircle';
      case 'absent': return 'XCircle';
      case 'late': return 'Clock';
      default: return 'Minus';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg border border-border shadow-elevation-3 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Class Details
            </h3>
            <p className="text-sm text-muted-foreground">{formatDate()}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {dayDetails?.classes && dayDetails?.classes?.length > 0 ? (
            <div className="space-y-4">
              {dayDetails?.classes?.map((classItem, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-muted/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {classItem?.subject}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {classItem?.code} • {classItem?.time}
                      </p>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(classItem?.status)}`}>
                      <Icon name={getStatusIcon(classItem?.status)} size={14} />
                      <span className="capitalize">{classItem?.status}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Teacher:</span>
                      <p className="font-medium text-foreground">{classItem?.teacher}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Room:</span>
                      <p className="font-medium text-foreground">{classItem?.room}</p>
                    </div>
                  </div>
                  
                  {classItem?.notes && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <span className="text-muted-foreground text-sm">Notes:</span>
                      <p className="text-sm text-foreground mt-1">{classItem?.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">No Classes</h4>
              <p className="text-muted-foreground">
                No classes were scheduled for this day.
              </p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DayDetailsModal;