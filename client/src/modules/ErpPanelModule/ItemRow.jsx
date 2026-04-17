import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, AutoComplete } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMoney } from '@/settings';
import calculate from '@/utils/calculate';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';

export default function ItemRow({ field, remove, current }) {
  const [totalState, setTotal] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { moneyFormatter } = useMoney();
  const form = Form.useFormInstance();

  // Fetch the Inventory List to populate the dropdown
  const { result: inventoryResult } = useFetch(() => request.list({ entity: 'inventory' }));
  const inventoryList = inventoryResult || [];

  const updateQt = (value) => {
    setQuantity(value);
  };
  
  const updatePrice = (value) => {
    setPrice(value);
  };

  useEffect(() => {
    if (current) {
      const { items } = current;
      if (items) {
        const item = items[field.name];
        if (item) {
          setQuantity(item.quantity || 0);
          setPrice(item.price || 0);
        }
      }
    }
  }, [current, field.name]);

  useEffect(() => {
    const currentTotal = calculate.multiply(quantity, price);
    setTotal(currentTotal);
  }, [price, quantity]);

  // Auto-fill description and price when a product is selected
  const handleProductSelect = (value, option) => {
    const selectedProduct = option.product;
    if (selectedProduct) {
      const items = form.getFieldValue('items');
      
      // Update the specific row with the database values
      items[field.name] = {
        ...items[field.name],
        itemName: selectedProduct.name,
        description: selectedProduct.description || '',
        price: selectedProduct.price || 0,
        quantity: 1, // Default to 1 unit upon selection
      };
      
      form.setFieldsValue({ items });
      setPrice(selectedProduct.price || 0);
      setQuantity(1);
    }
  };

  return (
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
      <Col className="gutter-row" span={5}>
        <Form.Item
          name={[field.name, 'itemName']}
          rules={[
            {
              required: true,
              message: 'Required',
            },
          ]}
        >
          {/* Changed Input to AutoComplete to allow searching OR custom typing */}
          <AutoComplete
            options={inventoryList.map((item) => ({
              value: item.name,
              label: item.name,
              product: item, // Pass the whole object for auto-filling
            }))}
            onSelect={handleProductSelect}
            placeholder="Search catalog or type item"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={7}>
        <Form.Item name={[field.name, 'description']}>
          <Input placeholder="Description" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={3}>
        <Form.Item
          name={[field.name, 'quantity']}
          rules={[{ required: true, message: 'Required' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} onChange={updateQt} />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={4}>
        <Form.Item
          name={[field.name, 'price']}
          rules={[{ required: true, message: 'Required' }]}
        >
          <InputNumber
            className="moneyInput"
            onChange={updatePrice}
            min={0}
            controls={false}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={5}>
        <Form.Item name={[field.name, 'total']}>
          <Form.Item>
            <InputNumber
              readOnly
              className="moneyInput"
              value={totalState}
              min={0}
              controls={false}
              style={{ width: '100%' }}
              formatter={(value) => moneyFormatter({ amount: value })}
            />
          </Form.Item>
        </Form.Item>
      </Col>

      <div style={{ position: 'absolute', right: '-20px', top: ' 5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>
    </Row>
  );
}