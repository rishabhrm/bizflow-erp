import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function InventoryForm() {
  const translate = useLanguage();
  return (
    <>
      <Form.Item
        label={translate('Product Name')}
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input Product name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label={translate('SKU')} name="sku">
        <Input />
      </Form.Item>

      <Form.Item label={translate('Description')} name="description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label={translate('Stock Quantity')}
        name="quantity"
        rules={[
          {
            required: true,
            message: 'Please input Quantity!',
          },
        ]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label={translate('Unit Price')}
        name="price"
        rules={[
          {
            required: true,
            message: 'Please input Unit Price!',
          },
        ]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
    </>
  );
}