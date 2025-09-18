import React, { useState, useMemo } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AttendanceTable = ({ selectedClass, onBulkAction }) => {
  const [editingStudent, setEditingStudent] = useState(null);
  const [editedStatus, setEditedStatus] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Detained edit modal state
  const [detainedEditModalOpen, setDetainedEditModalOpen] = useState(false);
  const [detainedEditStudent, setDetainedEditStudent] = useState(null);
  const [detainedEditStatus, setDetainedEditStatus] = useState('');
  const [detainedEditAttendance, setDetainedEditAttendance] = useState('');

  // Message modal state
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messageStudent, setMessageStudent] = useState(null);
  const [messageContent, setMessageContent] = useState('');
  const [sending, setSending] = useState(false);

  // For demo: local state for students (replace with API/state as needed)
  const [studentsData, setStudentsData] = useState([
    {
      id: 'st001',
      name: 'Alice Johnson',
      rollNumber: 'CS101001',
      attendanceRecords: [
        { date: '2025-09-01', status: 'Present' },
        { date: '2025-09-02', status: 'Present' },
        { date: '2025-09-03', status: 'Absent' },
        { date: '2025-09-04', status: 'Present' },
        { date: '2025-09-05', status: 'Present' },
        { date: '2025-09-06', status: 'Present' },
        { date: '2025-09-07', status: 'Absent' }
      ],
      email: 'alice.johnson@university.edu',
      mobile: '9876543210'
    },
    {
      id: 'st002',
      name: 'Bob Smith',
      rollNumber: 'CS101002',
      attendanceRecords: [
        { date: '2025-09-01', status: 'Present' },
        { date: '2025-09-02', status: 'Absent' },
        { date: '2025-09-03', status: 'Absent' },
        { date: '2025-09-04', status: 'Present' },
        { date: '2025-09-05', status: 'Present' },
        { date: '2025-09-06', status: 'Present' },
        { date: '2025-09-07', status: 'Present' }
      ],
      email: 'bob.smith@university.edu',
      mobile: '9876543211'
    },
    {
      id: 'st003',
      name: 'Carol Davis',
      rollNumber: 'CS101003',
      attendanceRecords: [
        { date: '2025-09-01', status: 'Absent' },
        { date: '2025-09-02', status: 'Absent' },
        { date: '2025-09-03', status: 'Absent' },
        { date: '2025-09-04', status: 'Absent' },
        { date: '2025-09-05', status: 'Absent' },
        { date: '2025-09-06', status: 'Absent' },
        { date: '2025-09-07', status: 'Absent' }
      ],
      email: 'carol.davis@university.edu',
      mobile: '9876543212'
    },
    {
      id: 'st004',
      name: 'David Wilson',
      rollNumber: 'CS101004',
      attendanceRecords: [
        { date: '2025-09-01', status: 'Present' },
        { date: '2025-09-02', status: 'Present' },
        { date: '2025-09-03', status: 'Present' },
        { date: '2025-09-04', status: 'Present' },
        { date: '2025-09-05', status: 'Present' },
        { date: '2025-09-06', status: 'Present' },
        { date: '2025-09-07', status: 'Present' }
      ],
      email: 'david.wilson@university.edu',
      mobile: '9876543213'
    },
    {
      id: 'st005',
      name: 'Emma Brown',
      rollNumber: 'CS101005',
      attendanceRecords: [
        { date: '2025-09-01', status: 'Absent' },
        { date: '2025-09-02', status: 'Absent' },
        { date: '2025-09-03', status: 'Absent' },
        { date: '2025-09-04', status: 'Present' },
        { date: '2025-09-05', status: 'Absent' },
        { date: '2025-09-06', status: 'Absent' },
        { date: '2025-09-07', status: 'Absent' }
      ],
      email: 'emma.brown@university.edu',
      mobile: '9876543214'
    }
  ]);

  // Calculate attendance summary for each student
  const studentsWithSummary = useMemo(() => {
    return studentsData.map(student => {
      const totalClasses = student.attendanceRecords.length;
      const attendedClasses = student.attendanceRecords.filter(r => r.status === 'Present').length;
      const attendancePercentage = totalClasses === 0 ? 0 : Math.round((attendedClasses / totalClasses) * 100);
      const recentRecord = student.attendanceRecords[student.attendanceRecords.length - 1] || {};
      const recentStatus = recentRecord.status || 'Absent';
      const lastUpdated = recentRecord.date || '';
      return {
        ...student,
        totalClasses,
        attendedClasses,
        attendancePercentage,
        recentStatus,
        lastUpdated
      };
    });
  }, [studentsData]);

  const filteredStudents = studentsWithSummary?.filter(student =>
    student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    student?.rollNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(filteredStudents?.map(s => s?.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev?.filter(id => id !== studentId));
    }
  };

  const handleEditStudent = (studentId) => {
    setEditingStudent(studentId);
    const student = studentsWithSummary.find(s => s.id === studentId);
    setEditedStatus(student?.recentStatus || 'Present');
  };

  const handleSaveEdit = (studentId) => {
    setStudentsData(prev =>
      prev.map(s =>
        s.id === studentId
          ? {
              ...s,
              attendanceRecords: [
                ...s.attendanceRecords.slice(0, -1),
                {
                  ...s.attendanceRecords[s.attendanceRecords.length - 1],
                  status: editedStatus
                }
              ]
            }
          : s
      )
    );
    setEditingStudent(null);
  };

  // Bulk mark present
  const handleBulkMarkPresent = () => {
    setStudentsData(prev =>
      prev.map(s =>
        selectedStudents.includes(s.id)
          ? {
              ...s,
              attendanceRecords: [
                ...s.attendanceRecords.slice(0, -1),
                {
                  ...s.attendanceRecords[s.attendanceRecords.length - 1],
                  status: 'Present'
                }
              ]
            }
          : s
      )
    );
    setSelectedStudents([]);
  };

  // Bulk mark absent
  const handleBulkMarkAbsent = () => {
    setStudentsData(prev =>
      prev.map(s =>
        selectedStudents.includes(s.id)
          ? {
              ...s,
              attendanceRecords: [
                ...s.attendanceRecords.slice(0, -1),
                {
                  ...s.attendanceRecords[s.attendanceRecords.length - 1],
                  status: 'Absent'
                }
              ]
            }
          : s
      )
    );
    setSelectedStudents([]);
  };

  // Detained edit modal handlers
  const openDetainedEditModal = (student) => {
    setDetainedEditStudent(student);
    setDetainedEditStatus(student.recentStatus);
    setDetainedEditAttendance(student.attendancePercentage);
    setDetainedEditModalOpen(true);
  };

  const handleDetainedEditSave = () => {
    setStudentsData(prev =>
      prev.map(s =>
        s.id === detainedEditStudent.id
          ? {
              ...s,
              attendanceRecords: s.attendanceRecords.map((rec, idx) =>
                idx === s.attendanceRecords.length - 1
                  ? { ...rec, status: detainedEditStatus }
                  : rec
              ),
              // Optionally update attendancePercentage if you want to allow manual override
            }
          : s
      )
    );
    setDetainedEditModalOpen(false);
    setDetainedEditStudent(null);
    setDetainedEditStatus('');
    setDetainedEditAttendance('');
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getStatusBadge = (status, percentage) => {
    const isDetained = percentage < 60;
    if (isDetained) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
          <Icon name="AlertTriangle" size={12} className="mr-1" />
          Detained
        </span>
      );
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        status === 'Present' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
      }`}>
        <Icon name={status === 'Present' ? 'Check' : 'X'} size={12} className="mr-1" />
        {status}
      </span>
    );
  };

  // Message sending handler
  const handleSendMessage = async () => {
    setSending(true);
    try {
      await fetch('http://localhost:8081/api/notifications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: messageStudent.id,
          email: messageStudent.email,
          mobile: messageStudent.mobile,
          message: messageContent,
        }),
      });
      alert('Message sent!');
      setMessageModalOpen(false);
    } catch (e) {
      alert('Failed to send message.');
    }
    setSending(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Class Attendance</h2>
            <p className="text-sm text-muted-foreground">
              Manage and track student attendance records
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Input
              type="search"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-64"
            />
            {selectedStudents?.length > 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={handleBulkMarkPresent}
                  iconName="CheckSquare"
                  iconPosition="left"
                >
                  Mark Present ({selectedStudents?.length})
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBulkMarkAbsent}
                  iconName="XSquare"
                  iconPosition="left"
                  className="ml-2"
                >
                  Mark Absent ({selectedStudents?.length})
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4">
                <input
                  type="checkbox"
                  checked={selectedStudents?.length === filteredStudents?.length && filteredStudents?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">Student</th>
              <th className="text-left p-4 font-medium text-foreground">Roll Number</th>
              <th className="text-left p-4 font-medium text-foreground">Attendance %</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Last Updated</th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents?.map((student) => {
              const isDetained = student.attendancePercentage < 60;
              return (
                <tr key={student?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedStudents?.includes(student?.id)}
                      onChange={(e) => handleSelectStudent(student?.id, e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-foreground">
                          {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{student?.name}</p>
                        <p className="text-sm text-muted-foreground">{student?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-foreground">{student?.rollNumber}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${getAttendanceColor(student?.attendancePercentage)}`}>
                        {student?.attendancePercentage}%
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({student?.attendedClasses}/{student?.totalClasses})
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    {editingStudent === student?.id ? (
                      <select
                        value={editedStatus}
                        onChange={e => setEditedStatus(e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    ) : (
                      getStatusBadge(student?.recentStatus, student?.attendancePercentage)
                    )}
                  </td>
                  <td className="p-4 text-muted-foreground">{student?.lastUpdated}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {isDetained ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDetainedEditModal(student)}
                        >
                          Edit Detained
                        </Button>
                      ) : editingStudent === student?.id ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSaveEdit(student?.id)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingStudent(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStudent(student?.id)}
                          iconName="Edit"
                          iconPosition="left"
                        >
                          Edit
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MessageSquare"
                        onClick={() => {
                          setMessageStudent(student);
                          setMessageModalOpen(true);
                          setMessageContent('');
                        }}
                      >
                        Message
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {filteredStudents?.map((student) => {
          const isDetained = student.attendancePercentage < 60;
          return (
            <div key={student?.id} className="p-4 border-b border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedStudents?.includes(student?.id)}
                    onChange={(e) => handleSelectStudent(student?.id, e?.target?.checked)}
                    className="rounded border-border mt-1"
                  />
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{student?.name}</p>
                    <p className="text-sm text-muted-foreground">{student?.rollNumber}</p>
                  </div>
                </div>
                {getStatusBadge(student?.recentStatus, student?.attendancePercentage)}
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Attendance</p>
                  <p className={`font-semibold ${getAttendanceColor(student?.attendancePercentage)}`}>
                    {student?.attendancePercentage}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Classes</p>
                  <p className="font-medium text-foreground">
                    {student?.attendedClasses}/{student?.totalClasses}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Updated: {student?.lastUpdated}
                </p>
                <div className="flex items-center space-x-2">
                  {isDetained ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDetainedEditModal(student)}
                    >
                      Edit Detained
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => handleEditStudent(student?.id)}
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageSquare"
                    onClick={() => {
                      setMessageStudent(student);
                      setMessageModalOpen(true);
                      setMessageContent('');
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filteredStudents?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No students found matching your search.</p>
        </div>
      )}

      {/* Message Modal */}
      {messageModalOpen && messageStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">
              Send Message to {messageStudent.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Email: {messageStudent.email}
              <br />
              Mobile: {messageStudent.mobile}
            </p>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={4}
              placeholder="Type your message..."
              value={messageContent}
              onChange={e => setMessageContent(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setMessageModalOpen(false)}
                disabled={sending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!messageContent.trim() || sending}
              >
                {sending ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Detained Edit Modal */}
      {detainedEditModalOpen && detainedEditStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">
              Edit Detained Student: {detainedEditStudent.name}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Attendance %</label>
              <input
                type="number"
                min={0}
                max={100}
                value={detainedEditAttendance}
                onChange={e => setDetainedEditAttendance(e.target.value)}
                className="w-full border rounded px-2 py-1"
                disabled
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={detainedEditStatus}
                onChange={e => setDetainedEditStatus(e.target.value)}
                className="w-full border rounded px-2 py-1"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setDetainedEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDetainedEditSave}
                disabled={
                  detainedEditAttendance === '' ||
                  isNaN(Number(detainedEditAttendance)) ||
                  Number(detainedEditAttendance) < 0 ||
                  Number(detainedEditAttendance) > 100
                }
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;