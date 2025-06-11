import { Button, Card, Col, Layout, Row, Space, theme, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import MySider from '../components/MySider';
import http from '../utils/axiosUtils';



const Home: React.FC = () => {
  const homedata = { ids: ['user', 'category', 'article'], userId: null }
  const [userCount, setUserCount] = useState('');
  const [categoryCount, setCategoryCount] = useState('');
  const [isAsync, setIsAsync] = useState(false);
  const { Content } = Layout;

  const fetchHomeData = async () => {
    const respone = await http.post('/admin/fetchdata', homedata);
    setUserCount(respone.data.data[0]);
    setCategoryCount(respone.data.data[1])
    setIsAsync(false);
  }
  useEffect(() => {
    setIsAsync(true);
    fetchHomeData();
  }, [])
  const addUser = async () => {
    const respone = await http.post('/user/register');
    fetchHomeData();
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MySider />
      <Layout>
        <Content style={{ margin: '0 16px' }}>
          <Typography.Title level={2} style={{ marginBottom: 24, color: '#2c2c2c' }}>Welcome,Admin!</Typography.Title>
          <Row gutter={16} >
            <Col span={15}>
              <Card title={<span style={{ fontSize: '22px', fontWeight: 'bold' }}>Dashboard</span>} variant='borderless' loading={isAsync}>
                <Row gutter={[16, 16]} align='stretch'  >
                  <Col span={12}>
                    <Card style={{ border: '1px solid #d9d9d9', height: 60 }} bodyStyle={{ padding: '4px 8px' }} >
                      <div style={{ fontSize: 18 }} >Total User</div>
                      <div style={{ fontSize: 18 }}>{userCount}</div>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card style={{ border: '1px solid #d9d9d9', height: 60 }} bodyStyle={{ padding: '4px 8px' }}>
                      <div style={{ fontSize: 18 }} >Total Category</div>
                      <div style={{ fontSize: 18 }}>{categoryCount}</div>
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card style={{ border: '1px solid #d9d9d9', height: 60, width: '100%' }} bodyStyle={{ padding: '4px 8px' }}>
                      <div style={{ fontSize: 18 }} >Last Activity</div>
                      <div style={{ fontSize: 18 }}>3</div>
                    </Card>
                  </Col>
                </Row>


              </Card>
            </Col>

            <Col span={9}>
              <Card title={<span style={{ fontSize: '22px', fontWeight: 'bold' }}>Quick Action</span>} variant='borderless' style={{ width: '100%', height: 239 }}>
                <Space direction='vertical' style={{ width: '100%' }} >
                  <Button style={{ gap: '16px', fontSize: '16px', height: 40 }} block>Add User</Button>
                  <Button style={{ gap: '16px', fontSize: '16px', height: 40 }} block>ManageCategories</Button>
                  <Button style={{ gap: '16px', fontSize: '16px', height: 40 }} block>View Item</Button>
                </Space>
              </Card>
            </Col>
          </Row>

        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;