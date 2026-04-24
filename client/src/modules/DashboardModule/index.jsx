import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Typography, Tag, Space, Tabs, Divider, List } from 'antd';
import {
  RiseOutlined,
  FallOutlined,
  MoneyCollectOutlined,
  WarningOutlined,
  UsergroupAddOutlined,
  InboxOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  NotificationOutlined // <-- Added new Icon
} from '@ant-design/icons';

import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';

import RecentTable from './components/RecentTable';
import PreviewCard from './components/PreviewCard';
import CustomerPreviewCard from './components/CustomerPreviewCard';

import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { TabPane } = Tabs;

export default function DashboardModule() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);

  const getStatsData = async ({ entity, currency }) => {
    return await request.summary({ entity, options: { currency } });
  };

  const { result: invoiceResult, isLoading: invoiceLoading, onFetch: fetchInvoicesStats } = useOnFetch();
  const { result: quoteResult, isLoading: quoteLoading, onFetch: fetchQuotesStats } = useOnFetch();
  const { result: paymentResult, isLoading: paymentLoading, onFetch: fetchPayemntsStats } = useOnFetch();
  const { result: clientResult, isLoading: clientLoading } = useFetch(() => request.summary({ entity: 'client' }));

  useEffect(() => {
    const currency = money_format_settings.default_currency_code || null;
    if (currency) {
      fetchInvoicesStats(getStatsData({ entity: 'invoice', currency }));
      fetchQuotesStats(getStatsData({ entity: 'quote', currency }));
      fetchPayemntsStats(getStatsData({ entity: 'payment', currency }));
    }
  }, [money_format_settings.default_currency_code]);

  const [loadingNew, setLoadingNew] = useState(true);
  const [financials, setFinancials] = useState({ totalIncome: 0, totalExpense: 0, profit: 0 });
  const [counts, setCounts] = useState({ leads: 0, products: 0 });
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  
  // NEW: State for Announcements
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchNewDashboardData = async () => {
      try {
        const reportRes = await request.summary({ entity: 'report' });
        if (reportRes && reportRes.success) setFinancials(reportRes.result);

        const leadRes = await request.summary({ entity: 'lead' });
        const productRes = await request.summary({ entity: 'inventory' });

        setCounts({
          leads: leadRes?.success ? leadRes.result : 0,
          products: productRes?.success ? productRes.result : 0,
        });

        const leadsList = await request.list({ entity: 'lead' });
        if (leadsList && leadsList.success) setRecentLeads((leadsList.result?.items || leadsList.result || []).slice(0, 4));

        const expenseList = await request.list({ entity: 'expense' });
        if (expenseList && expenseList.success) setRecentExpenses((expenseList.result?.items || expenseList.result || []).slice(0, 4));

        // NEW: Fetch Announcements, filter only Active ones, and grab the latest 5
        const annRes = await request.list({ entity: 'announcement' });
        if (annRes && annRes.success) {
          const activeAnns = (annRes.result?.items || annRes.result || [])
            .filter((a) => a.status === 'Active')
            .slice(0, 5);
          setAnnouncements(activeAnns);
        }

      } catch (error) {
        console.error('Error fetching new dashboard data', error);
      } finally {
        setLoadingNew(false);
      }
    };
    fetchNewDashboardData();
  }, []);

  const minimalLeadColumns = [
    { title: translate('Name'), dataIndex: 'name' },
    {
      title: translate('Status'),
      dataIndex: 'status',
      render: (status) => {
        const colors = { new: 'blue', contacted: 'cyan', qualified: 'purple', proposal: 'orange', won: 'green', lost: 'red' };
        return <Tag color={colors[status] || 'default'}>{status?.toUpperCase()}</Tag>;
      },
    },
  ];

  const minimalExpenseColumns = [
    { title: translate('Expense'), dataIndex: 'name' },
    {
      title: translate('Amount'),
      dataIndex: 'amount',
      align: 'right',
      render: (amount) => moneyFormatter({ amount }),
    },
  ];

  const minimalBillingColumns = [
    { title: translate('Number'), dataIndex: 'number' },
    {
      title: translate('Total'),
      dataIndex: 'total',
      align: 'right',
      render: (total, record) => moneyFormatter({ amount: total, currency_code: record.currency }),
    },
    { title: translate('Status'), dataIndex: 'status' },
  ];

  const cardStyle = { borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };

  const entityData = [
    { result: invoiceResult, isLoading: invoiceLoading, entity: 'invoice', title: translate('Invoices') },
    { result: quoteResult, isLoading: quoteLoading, entity: 'quote', title: translate('Quotes') },
  ];

  const statisticCards = entityData.map((data, index) => {
    const { result, entity, isLoading, title } = data;
    return (
      <Col span={12} key={index}>
        <PreviewCard
          title={title}
          isLoading={isLoading}
          entity={entity}
          statistics={
            !isLoading &&
            result?.performance?.map((item) => ({
              tag: item?.status,
              color: 'blue',
              value: item?.percentage,
            }))
          }
        />
      </Col>
    );
  });

  if (!money_format_settings) return <></>;

  return (
    <div style={{ padding: '10px 20px 20px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        
        {/* ROW 1: Key Financial Health */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Card loading={loadingNew} bordered={false} style={cardStyle}>
              <Statistic title={translate('Total Income')} value={financials.totalIncome} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<RiseOutlined />} formatter={(v) => moneyFormatter({ amount: v })} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card loading={loadingNew} bordered={false} style={cardStyle}>
              <Statistic title={translate('Total Expenses')} value={financials.totalExpense} precision={2} valueStyle={{ color: '#cf1322' }} prefix={<FallOutlined />} formatter={(v) => moneyFormatter({ amount: v })} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card loading={loadingNew} bordered={false} style={{...cardStyle, backgroundColor: financials.profit >= 0 ? '#f6ffed' : '#fff1f0'}}>
              <Statistic title={translate('Net Profit')} value={financials.profit} precision={2} valueStyle={{ color: financials.profit >= 0 ? '#3f8600' : '#cf1322', fontWeight: 'bold' }} prefix={<MoneyCollectOutlined />} formatter={(v) => moneyFormatter({ amount: v })} />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card loading={invoiceLoading} bordered={false} style={cardStyle}>
              <Statistic title={translate('Unpaid Invoices')} value={invoiceResult?.total_undue} precision={2} valueStyle={{ color: '#fa8c16' }} prefix={<WarningOutlined />} formatter={(v) => moneyFormatter({ amount: v })} />
            </Card>
          </Col>
        </Row>

        {/* ROW 2: Main Dashboard Grid */}
        <Row gutter={[24, 24]}>
          
          <Col xs={24} lg={16}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Card bordered={false} style={{ ...cardStyle, padding: '0' }} bodyStyle={{ padding: '0' }}>
                <Row gutter={[0, 0]}>
                  {statisticCards}
                </Row>
              </Card>

              <Card bordered={false} style={cardStyle}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab={translate('Billing & Payments')} key="1">
                    <Row gutter={[24, 24]}>
                      <Col xs={24} sm={12}>
                        <Title level={5} style={{ marginBottom: 16 }}>{translate('Recent Invoices')}</Title>
                        <RecentTable entity={'invoice'} dataTableColumns={minimalBillingColumns} />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Title level={5} style={{ marginBottom: 16 }}>{translate('Recent Quotes')}</Title>
                        <RecentTable entity={'quote'} dataTableColumns={minimalBillingColumns} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab={translate('CRM & Expenses')} key="2">
                    <Row gutter={[24, 24]}>
                      <Col xs={24} sm={12}>
                        <Title level={5} style={{ marginBottom: 16 }}>{translate('Recent Leads')}</Title>
                        <Table columns={minimalLeadColumns} dataSource={recentLeads} rowKey="_id" pagination={false} size="small" />
                      </Col>
                      <Col xs={24} sm={12}>
                        <Title level={5} style={{ marginBottom: 16 }}>{translate('Recent Expenses')}</Title>
                        <Table columns={minimalExpenseColumns} dataSource={recentExpenses} rowKey="_id" pagination={false} size="small" />
                      </Col>
                    </Row>
                  </TabPane>
                </Tabs>
              </Card>
            </Space>
          </Col>

          <Col xs={24} lg={8}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              
              {/* NEW: Announcements Feed */}
              <Card 
                title={translate('Company Updates')} 
                bordered={false} 
                style={{ ...cardStyle, maxHeight: '350px', overflowY: 'auto' }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={announcements}
                  locale={{ emptyText: translate('No active announcements.') }}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<NotificationOutlined style={{ fontSize: '20px', color: '#1890ff', marginTop: '4px' }} />}
                        title={<span style={{ fontWeight: '600' }}>{item.title}</span>}
                        description={<span style={{ fontSize: '13px' }}>{item.content}</span>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
              
              <div style={cardStyle}>
                <CustomerPreviewCard 
                  isLoading={clientLoading} 
                  activeCustomer={clientResult?.active} 
                  newCustomer={clientResult?.new} 
                />
              </div>
              
              <Card title={translate('Monthly Activity')} bordered={false} style={cardStyle}>
                <Row gutter={[0, 16]}>
                  <Col span={12}>
                    <Statistic title={translate('Invoices')} value={invoiceResult?.total} prefix={<FileTextOutlined style={{ color: '#1890ff' }}/>} />
                  </Col>
                  <Col span={12}>
                    <Statistic title={translate('Quotes')} value={quoteResult?.total} prefix={<FileTextOutlined style={{ color: '#fa8c16' }}/>} />
                  </Col>
                  <Divider style={{ margin: '8px 0' }} />
                  <Col span={24}>
                    <Statistic title={translate('Payments Collected')} value={paymentResult?.total} prefix={<CheckCircleOutlined style={{ color: '#52c41a' }}/>} />
                  </Col>
                </Row>
              </Card>

              <Card title={translate('Operational Metrics')} bordered={false} style={cardStyle}>
                 <Row gutter={[0, 16]}>
                  <Col span={12}>
                    <Statistic title={translate('Pipeline Leads')} value={counts.leads} prefix={<UsergroupAddOutlined style={{ color: '#722ed1' }} />} />
                  </Col>
                  <Col span={12}>
                    <Statistic title={translate('Catalog Products')} value={counts.products} prefix={<InboxOutlined style={{ color: '#13c2c2' }} />} />
                  </Col>
                 </Row>
              </Card>

            </Space>
          </Col>
        </Row>
      </Space>
    </div>
  );
}