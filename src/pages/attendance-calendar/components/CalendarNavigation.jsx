import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarNavigation = ({ 
  currentDate, 
  onPreviousMonth, 
  onNextMonth, 
  onTodayClick 
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentMonth = monthNames?.[currentDate?.getMonth()];
  const currentYear = currentDate?.getFullYear();
  const today = new Date();
  
  const isCurrentMonth = () => {
    return currentDate?.getMonth() === today?.getMonth() && 
           currentDate?.getFullYear() === today?.getFullYear();
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-bold text-foreground">
          {currentMonth} {currentYear}
        </h2>
        {!isCurrentMonth() && (
          <Button
            variant="outline"
            size="sm"
            onClick={onTodayClick}
            iconName="Calendar"
            iconPosition="left"
          >
            Today
          </Button>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPreviousMonth}
          className="h-10 w-10"
        >
          <Icon name="ChevronLeft" size={16} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onNextMonth}
          className="h-10 w-10"
        >
          <Icon name="ChevronRight" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CalendarNavigation;