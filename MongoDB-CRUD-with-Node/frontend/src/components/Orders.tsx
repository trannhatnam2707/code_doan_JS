import React from 'react';
import { Button, Rate, Typography, message, Avatar, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

interface Book {
  _id: string;
  author: string;
  bookname: string;
  description: string;
  image: string;
  rating: number;
}

const Orders = () => {
  const [data, setData] = React.useState<Book[]>([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/orders`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Danh sách sản phẩm',
      dataIndex: 'products',
      key: 'products',
      render: (products: any) => {
        return products.map((product: any) => {
          console.log(product.product);
          return (
            <p>
              {product.product.bookname} x {product.quantity}
            </p>
          );
        });
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: any) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
      },
    },
  ];

  return (
    <>
      <div className='mt-20'>
        <Table columns={columns} dataSource={data} pagination={false} bordered rowKey={'_id'} />
      </div>
    </>
  );
};

export default Orders;
