import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { request } from '@/request';
import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';

export default function Report() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const [data, setData] = useState({ totalIncome: 0, totalExpense: 0, profit: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Because we mapped the API to /report/summary, the existing frontend request wrapper handles it automatically!
      const response = await request.summary({ entity: 'report' });
      if (response && response.success) {
        setData(response.result);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '0 20px' }}>
      <PageHeader 
        title={translate('Profit & Loss Report')} 
        subTitle="Financial overview based on actual payments and expenses."
        ghost={false}
        style={{ padding: '20px 0px' }}
      />
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={8}>
          <Card loading={loading} bordered={false}>
            <Statistic
              title={translate('Total Income')}
              value={data.totalIncome}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              formatter={(value) => moneyFormatter({ amount: value })}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card loading={loading} bordered={false}>
            <Statistic
              title={translate('Total Expense')}
              value={data.totalExpense}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              formatter={(value) => moneyFormatter({ amount: value })}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card loading={loading} bordered={false} style={{ backgroundColor: '#f0f2f5' }}>
            <Statistic
              title={translate('Net Profit')}
              value={data.profit}
              precision={2}
              valueStyle={{ color: data.profit >= 0 ? '#3f8600' : '#cf1322', fontWeight: 'bold' }}
              formatter={(value) => moneyFormatter({ amount: value })}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}