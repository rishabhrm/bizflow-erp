import React from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Select, DatePicker } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useMoney, useDate } from '@/settings';

export default function ExpenseForm() {
  const translate = useLanguage();
  const money = useMoney();
  const { dateFormat } = useDate();

  return (
    <>
      <Form.Item
        label={translate('Expense Name')}
        name="name"
        rules={[{ required: true, message: 'Please input the expense name!' }]}
      >
        <Input placeholder="e.g., Office Supplies, Printer Ink" />
      </Form.Item>

      <Form.Item
        label={translate('Category')}
        name="expenseCategory"
        rules={[{ required: true, message: 'Please select a category!' }]}
      >
        <Select
          options={[
            { value: 'Office Supplies', label: translate('Office Supplies') },
            { value: 'Travel', label: translate('Travel') },
            { value: 'Software', label: translate('Software Subscriptions') },
            { value: 'Meals', label: translate('Meals & Entertainment') },
            { value: 'Utilities', label: translate('Utilities') },
            { value: 'Other', label: translate('Other') },
          ]}
        />
      </Form.Item>

      <Form.Item
        label={translate('Amount')}
        name="amount"
        rules={[{ required: true, message: 'Please input the amount!' }]}
      >
        <InputNumber
          className="moneyInput"
          style={{ width: '100%' }}
          min={0}
          controls={false}
          addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
          addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
        />
      </Form.Item>

      <Form.Item
        label={translate('Date')}
        name="date"
        rules={[{ required: true, type: 'object' }]}
        initialValue={dayjs()}
      >
        <DatePicker style={{ width: '100%' }} format={dateFormat} />
      </Form.Item>

      <Form.Item label={translate('Reference / Vendor')} name="ref">
        <Input placeholder="Receipt number or Vendor name" />
      </Form.Item>

      <Form.Item label={translate('Description')} name="description">
        <Input.TextArea />
      </Form.Item>
    </>
  );
}