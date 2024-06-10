import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
};

export default function Login() {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, values)
      .then((response) => {
        if (response.status == 200) {
          const { token } = response.data;
          localStorage.setItem('token', token);
          navigate('/');
        }
      })
      .catch((error) => {
        message.error('Tên đăng nhập hoặc mật khẩu không đúng!');
        new Error(error);
      });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-white p-10'>
        <h1 className='text-3xl font-semibold mb-5 uppercase text-center font-poppins'>Đăng nhập</h1>
        <Form
          name='basic'
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 15 }}
          style={{ width: 400 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'>
          <Form.Item<FieldType> label='Tên đăng nhập' name='username' rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label='Mật khẩu' name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
            <Button type='primary' htmlType='submit'>
              Đăng nhập
            </Button>
            <Link to={'/register'} className='mx-3'>
              Đăng ký
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
