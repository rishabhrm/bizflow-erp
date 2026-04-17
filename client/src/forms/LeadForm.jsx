import React from 'react';
import { Form, Input, Select } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function LeadForm() {
  const translate = useLanguage();

  return (
    <>
      <Form.Item
        label={translate('Lead Type')}
        name="type"
        rules={[{ required: true }]}
        initialValue="company"
      >
        <Select
          options={[
            { value: 'company', label: translate('Company') },
            { value: 'people', label: translate('Individual') },
          ]}
        />
      </Form.Item>

      <Form.Item
        label={translate('Lead Name')}
        name="name"
        rules={[{ required: true, message: 'Please input the lead name!' }]}
      >
        <Input placeholder="Contact Person or Company Name" />
      </Form.Item>

      <Form.Item label={translate('Company')} name="company">
        <Input />
      </Form.Item>

      <Form.Item label={translate('Email')} name="email">
        <Input type="email" />
      </Form.Item>

      <Form.Item label={translate('Phone')} name="phone">
        <Input />
      </Form.Item>

      <Form.Item
        label={translate('Pipeline Status')}
        name="status"
        initialValue="new"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: 'new', label: translate('New Lead') },
            { value: 'contacted', label: translate('Contacted') },
            { value: 'qualified', label: translate('Qualified') },
            { value: 'proposal', label: translate('Proposal Sent') },
            { value: 'won', label: translate('Deal Won') },
            { value: 'lost', label: translate('Deal Lost') },
          ]}
        />
      </Form.Item>

      <Form.Item label={translate('Lead Source')} name="source">
        <Input placeholder="e.g., Website, Referral, Cold Call" />
      </Form.Item>

      <Form.Item label={translate('Notes')} name="notes">
        <Input.TextArea rows={4} />
      </Form.Item>
    </>
  );
}