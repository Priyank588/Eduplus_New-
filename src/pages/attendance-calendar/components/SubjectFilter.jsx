import React from 'react';
import Select from '../../../components/ui/Select';

const SubjectFilter = ({ subjects, selectedSubject, onSubjectChange }) => {
  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    ...subjects?.map(subject => ({
      value: subject?.code,
      label: `${subject?.name} (${subject?.code})`
    }))
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Filter Options</h3>
          <p className="text-sm text-muted-foreground">
            View attendance for specific subjects or all classes
          </p>
        </div>
        
        <div className="w-full sm:w-64">
          <Select
            label="Subject"
            options={subjectOptions}
            value={selectedSubject}
            onChange={onSubjectChange}
            searchable={subjects?.length > 5}
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectFilter;