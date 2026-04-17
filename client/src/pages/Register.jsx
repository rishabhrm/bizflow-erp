import React from 'react';
import { Form, Button, Layout, Col, Divider, Typography, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '@/request';
import useLanguage from '@/locale/useLanguage';
import RegisterForm from '@/forms/RegisterForm';
import logo from '@/style/images/logo.svg';

const { Content } = Layout;
const { Title } = Typography;

export default function Register() {
  const translate = useLanguage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // Make the API call to our new backend route
    const response = await request.post({ entity: 'register', jsonData: values });
    
    if (response && response.success) {
      notification.success({ message: response.message });
      navigate('/login'); // Redirect to login on success
    } else {
      notification.error({ message: response?.message || 'Registration failed' });
    }
  };

  return (
    <Layout className="layout">
      <Content className="auth-layout">
        <Col xs={24} sm={24} md={12} lg={8} className="auth-content">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src={logo} alt="BizFlow ERP" style={{ width: '80%', maxWidth: '300px' }} />
          </div>
          <Divider />
          <div className="site-layout-content">
            <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>
              Create an Account
            </Title>
            <Form layout="vertical" onFinish={onFinish}>
              <RegisterForm />
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" size="large" block>
                  {translate('Sign Up')}
                </Button>
              </Form.Item>
              <div style={{ textAlign: 'center' }}>
                <Link to="/login">{translate('Already have an account? Login here')}</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Content>
    </Layout>
  );
}