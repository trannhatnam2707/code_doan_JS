import { Avatar, Button, Form, FormProps, message, Input, Modal, Space, Table } from 'antd';
import React, { useState } from 'react';
import { useCartStore } from '../store';
import { DeleteOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';

type FieldType = {
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  note?: string;
  products?: any[];
  amount?: number;
};

export default function Cart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const store = useCartStore();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        values.products = store.cart;
        values.amount = store.cart.reduce((total, item) => total + item.quantity * item.product.price, 0);
        console.log(values);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/order`, values).then((response) => {
          if (response.status === 200) {
            store.clearCart();
            message.success('Đặt đơn hàng thành công!');
          }
        });
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'Ảnh bìa',
      dataIndex: ['product', 'image'],
      key: 'image',
      render: (url: string) => <Avatar src={url} size={64} />,
    },
    {
      title: 'Tên sách',
      dataIndex: ['product', 'bookname'],
      key: 'bookname',
    },
    {
      title: 'Tác giả',
      dataIndex: ['product', 'author'],
      key: 'author',
    },
    {
      title: 'Đơn giá',
      dataIndex: ['product', 'price'],
      key: 'price',
      render: (_: any, record: any) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.product.price);
      },
    },
    {
      title: 'Số lượng',
      key: 'quantity',
      render: (_: any, record: any) => {
        return (
          <div>
            <Button
              onClick={() => {
                store.decreaseQuantity(record.product);
              }}>
              -
            </Button>
            <span className='px-2'>{record.quantity}</span>
            <Button
              onClick={() => {
                store.increaseQuantity(record.product);
              }}>
              +
            </Button>
          </div>
        );
      },
    },
    {
      title: 'Thành tiền',
      key: 'total',
      render: (_: any, record: any) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(record.product.price * record.quantity);
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => store.removeFromCart(record.product)} danger icon={<DeleteOutlined />}></Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className='mt-20'>
        <Table
          columns={columns}
          footer={() =>
            'Tổng tiền: ' +
            new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
              store.cart.reduce((total, current) => total + current.quantity * current.product.price, 0)
            )
          }
          dataSource={store.cart}
          pagination={false}
          bordered
          rowKey={(product) => product.product._id}
        />
        <div className='flex justify-end'>
          <Button className='mt-5' size='large' type='primary' onClick={showModal} disabled={store.cart.length === 0}>
            <span className='uppercase'>Thanh toán</span>
          </Button>
        </div>

        <Modal title='Thông tin chi tiết đơn hàng' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form name='basic' form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} autoComplete='off'>
            <Form.Item<FieldType> label='Họ tên' name='fullName' rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}>
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label='Địa chỉ' name='address' rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhận hàng!' }]}>
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label='Số điện thoại' name='phoneNumber' rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label='Ghi chú' name='note'>
              <TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
