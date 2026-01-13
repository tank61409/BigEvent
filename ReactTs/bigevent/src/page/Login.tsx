import { Alert, Button, Checkbox, Col, Form, Input, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../interface/userInterface';
function Login() {
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  const [form] = Form.useForm();
  const [errorMsg, setErrorMsg] = useState('');
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate();
  const onFinish = async (value: userLogin) => {
    setDisabled(true)
    // const respone = await axios.post('https://bigevent-production.up.railway.app/user/login', value)
    const respone = await axios.post('http://localhost:8080/user/login', value)
    localStorage.setItem('token', respone.data.data)
    if (respone.data.code !== 1) {
      setErrorMsg("帳號或密碼次錯誤")
      form.resetFields()
    } else {  
      console.log('登入成功')
      navigate('/home')
    }

    setDisabled(false)

  }


  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <Row justify="center" align="middle" style={{ height: '100%' }}>
          <Col>
            {errorMsg && <Alert message="帳號密碼錯誤" type="error" showIcon={true} />}
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: false }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox >Remember me</Checkbox>
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" disabled = {disabled}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Login;
