import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';

const PersonalInfoCard = ({ student, isEditing, onUpdate }) => {
  const [formData, setFormData] = useState({
    email: student?.email,
    phone: student?.phone,
    address: student?.address,
    dateOfBirth: student?.dateOfBirth,
    emergencyContact: student?.emergencyContact,
    emergencyPhone: student?.emergencyPhone
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    onUpdate(field, value);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          <Icon name="User" size={20} className="mr-2 text-primary" />
          Personal Information
        </h2>
        <Icon name="Shield" size={16} className="text-muted-foreground" />
      </div>
      <div className="space-y-6">
        {/* Contact Information */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="Mail" size={16} className="mr-2 text-secondary" />
            Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              disabled={!isEditing}
              className="bg-background"
            />
            <Input
              label="Phone Number"
              type="tel"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              disabled={!isEditing}
              className="bg-background"
            />
          </div>
        </div>

        {/* Personal Details */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="Calendar" size={16} className="mr-2 text-accent" />
            Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date of Birth"
              type="date"
              value={formData?.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
              disabled={!isEditing}
              className="bg-background"
            />
            <div className="md:col-span-2">
              <Input
                label="Address"
                value={formData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
                disabled={!isEditing}
                className="bg-background"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="Phone" size={16} className="mr-2 text-error" />
            Emergency Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Emergency Contact Name"
              value={formData?.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
              disabled={!isEditing}
              className="bg-background"
            />
            <Input
              label="Emergency Contact Phone"
              type="tel"
              value={formData?.emergencyPhone}
              onChange={(e) => handleInputChange('emergencyPhone', e?.target?.value)}
              disabled={!isEditing}
              className="bg-background"
            />
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
            Verification Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={14} className="text-success" />
              <span className="text-sm text-foreground">Email Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={14} className="text-success" />
              <span className="text-sm text-foreground">Phone Verified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={14} className="text-warning" />
              <span className="text-sm text-foreground">Documents Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;