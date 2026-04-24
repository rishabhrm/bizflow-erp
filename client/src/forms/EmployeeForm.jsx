import React from 'react';
import { Form, Input, DatePicker, InputNumber, Select } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function EmployeeForm({ isUpdateForm = false }) {
  const translate = useLanguage();

  return (
    <>
      <Form.Item
        label={translate('Full Name')}
        name="name"
        rules={[{ required: true, message: 'Please input the employee name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={translate('Date of Birth')}
        name="dob"
        rules={[{ required: true, message: 'Please select date of birth!' }]}
      >
        <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label={translate('Designation')}
        name="designation"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={translate('Date of Joining')}
        name="dateOfJoining"
        rules={[{ required: true }]}
      >
        <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label={translate('Attendance (Monthly)')}
        name="attendance"
        tooltip="Enter the total number of days the employee was present this month."
        rules={[
          { 
            type: 'number', 
            max: 31, 
            message: 'A month cannot have more than 31 days!' 
          }
        ]}
      >
        <InputNumber 
          style={{ width: '100%' }} 
          min={0} 
          max={31} 
          addonAfter="Days"
          placeholder="e.g. 24"
        />
      </Form.Item>

      <Form.Item
        label={translate('Employee Status')}
        name="status"
        initialValue="active"
        rules={[{ required: true, message: 'Please select the employee status!' }]}
      >
        <Select style={{ width: '100%' }}>
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="former">Former</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}