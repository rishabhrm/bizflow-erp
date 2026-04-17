import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import useLanguage from '@/locale/useLanguage';
import logoIcon from '@/style/images/logo-icon.svg';
import logoText from '@/style/images/logo-text.svg';
import useResponsive from '@/hooks/useResponsive';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  CreditCardOutlined,
  MenuOutlined,
  ShopOutlined,
  WalletOutlined,
  ReconciliationOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();
  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const translate = useLanguage();
  const navigate = useNavigate();

  // Grouped Menu Items for a cleaner ERP feel
  const items = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to={'/'}>{translate('Dashboard')}</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'crm',
      label: translate('CRM & Sales'),
      type: 'group',
      children: [
        {
          key: 'lead',
          icon: <UsergroupAddOutlined />,
          label: <Link to={'/lead'}>{translate('Leads Pipeline')}</Link>,
        },
        {
          key: 'customer',
          icon: <CustomerServiceOutlined />,
          label: <Link to={'/customer'}>{translate('Customers')}</Link>,
        },
      ],
    },
    {
      key: 'finance',
      label: translate('Finance & Billing'),
      type: 'group',
      children: [
        {
          key: 'quote',
          icon: <FileSyncOutlined />,
          label: <Link to={'/quote'}>{translate('Quotes')}</Link>,
        },
        {
          key: 'invoice',
          icon: <ContainerOutlined />,
          label: <Link to={'/invoice'}>{translate('Invoices')}</Link>,
        },
        {
          key: 'payment',
          icon: <CreditCardOutlined />,
          label: <Link to={'/payment'}>{translate('Income / Payments')}</Link>,
        },
        {
          key: 'expense',
          icon: <ShoppingCartOutlined />,
          label: <Link to={'/expense'}>{translate('Expenses')}</Link>,
        },
      ],
    },
    {
      key: 'operations',
      label: translate('Operations'),
      type: 'group',
      children: [
        {
          key: 'inventory',
          icon: <InboxOutlined />,
          label: <Link to={'/inventory'}>{translate('Product Catalog')}</Link>,
        },
      ],
    },
    {
      key: 'analytics',
      label: translate('Analytics'),
      type: 'group',
      children: [
        {
          key: 'report',
          icon: <LineChartOutlined />,
          label: <Link to={'/report'}>{translate('Profit & Loss')}</Link>,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'configuration',
      label: translate('Configuration'),
      type: 'group',
      children: [
        {
          key: 'payment/mode', // Keys updated to match exact paths for active-highlighting
          icon: <WalletOutlined />,
          label: <Link to={'/payment/mode'}>{translate('Payment Modes')}</Link>,
        },
        {
          key: 'taxes',
          icon: <ShopOutlined />,
          label: <Link to={'/taxes'}>{translate('Taxes')}</Link>,
        },
        {
          key: 'settings', 
          icon: <SettingOutlined />,
          label: <Link to={'/settings'}>{translate('Settings')}</Link>,
        },
        {
          key: 'about',
          icon: <ReconciliationOutlined />,
          label: <Link to={'/about'}>{translate('About')}</Link>,
        },
      ],
    },
  ];

  useEffect(() => {
    if (location) {
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else {
          setCurrentPath(location.pathname.slice(1));
        }
      }
    }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);

  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      theme={'light'}
      style={{
        overflow: 'hidden',
        height: isMobile ? '100vh' : 'calc(100vh - 40px)', 
        position: isMobile ? 'absolute' : 'relative',
        bottom: '20px',
        ...(!isMobile && {
          left: '20px',
          top: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: 'none',
        }),
      }}
    >
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src={logoIcon} alt="Logo" style={{ height: '32px' }} />

        {!showLogoApp && (
          <img
            src={logoText}
            alt="Logo"
            style={{
              marginTop: '3px',
              marginLeft: '10px',
              height: '28px',
            }}
          />
        )}
      </div>
      <Menu
        items={items}
        mode="inline"
        theme={'light'}
        selectedKeys={[currentPath]}
        style={{
          width: 256,
          borderRight: 'none',
          height: 'calc(100vh - 100px)',
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ marginLeft: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={280}
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={visible}
        bodyStyle={{ padding: 0 }}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}