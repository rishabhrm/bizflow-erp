import React from 'react';
import { Form, Input, Select, Switch } from 'antd';
import SelectAsync from '@/components/SelectAsync'; // Pulls from your existing components
import useLanguage from '@/locale/useLanguage';

export default function HrManagementForm({ isUpdateForm = false }) {
  const translate = useLanguage();

  return (
    <>
      <Form.Item
        label={translate('Employee')}
        name="employee"
        rules={[{ required: true, message: 'Please select an employee!' }]}
      >
        <SelectAsync
          entity="employee"
          displayLabels={['name']} // Shows the employee's name in the dropdown
          searchFields="name"      // Allows you to search by name
        />
      </Form.Item>

      {/* Keep the rest of your Onboarding, Offboarding, and Data Fetch Form.Items exactly the same as before */}
      <Form.Item label={translate('Onboarding Status')} name="onboarding" initialValue="Pending">
        <Select style={{ width: '100%' }}>
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="In Progress">In Progress</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label={translate('Offboarding Status')} name="offboarding" initialValue="N/A">
        <Select style={{ width: '100%' }}>
          <Select.Option value="N/A">N/A</Select.Option>
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label={translate('Employee Data Fetch')} name="employeeDataFetch" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label={translate('Notice Issue')} name="noticeIssue" initialValue="None">
        <Input />
      </Form.Item>
    </>
  );
}