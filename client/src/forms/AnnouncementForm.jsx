import React from 'react';
import { Form, Input, Select } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function AnnouncementForm({ isUpdateForm = false }) {
  const translate = useLanguage();

  return (
    <>
      <Form.Item
        label={translate('Announcement Title')}
        name="title"
        rules={[{ required: true, message: 'Please input the title!' }]}
      >
        <Input placeholder="e.g., System Maintenance This Friday" />
      </Form.Item>

      <Form.Item
        label={translate('Content / Details')}
        name="content"
        rules={[{ required: true, message: 'Please input the content!' }]}
      >
        <Input.TextArea rows={4} placeholder="Write your update here..." />
      </Form.Item>

      <Form.Item
        label={translate('Status')}
        name="status"
        initialValue="Active"
      >
        <Select style={{ width: '100%' }}>
          <Select.Option value="Active">Active (Visible on Dashboard)</Select.Option>
          <Select.Option value="Archived">Archived (Hidden)</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}