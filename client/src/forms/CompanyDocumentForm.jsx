import React from 'react';
import { Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

export default function CompanyDocumentForm({ isUpdateForm = false }) {
  const translate = useLanguage();

  // This ensures the file is extracted properly from the AntD Upload event
  const normFile = (e) => {
    if (Array.isArray(e)) { return e; }
    return e?.fileList;
  };

  return (
    <>
      <Form.Item label={translate('Document Name')} name="documentName" rules={[{ required: true }]}>
        <Input placeholder="e.g., Employee Handbook 2024" />
      </Form.Item>

      <Form.Item label={translate('Description')} name="description">
        <Input.TextArea rows={2} />
      </Form.Item>

      <Form.Item
        label={translate('Upload File')}
        name="file"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: !isUpdateForm, message: 'Please upload a file!' }]}
      >
        <Upload 
          beforeUpload={() => false} // Prevents immediate browser upload, holds it for the form submit
          maxCount={1}
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>{translate('Select File')}</Button>
        </Upload>
      </Form.Item>

      <Form.Item label={translate('Access Control')} name="accessControl" initialValue="Admins Only">
        <Select style={{ width: '100%' }}>
          <Select.Option value="All Employees">All Employees (Public)</Select.Option>
          <Select.Option value="Managers Only">Managers Only</Select.Option>
          <Select.Option value="HR Only">HR Only</Select.Option>
          <Select.Option value="Admins Only">Admins Only (Private)</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}