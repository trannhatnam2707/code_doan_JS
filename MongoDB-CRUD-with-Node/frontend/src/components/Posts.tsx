import React from 'react';
import { Button, Rate, Typography, message, Avatar, Space, Input, Row, Col } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { render } from '@testing-library/react';

interface Book {
  _id: string;
  author: string;
  bookname: string;
  description: string;
  image: string;
  rating: number;
}

const Posts = () => {
  const [data, setData] = React.useState<Book[]>([]);
  const [search, setSearch] = React.useState<string>('');
  const { Search } = Input;

  const fetchBooks = (name = '') => {
    const query = name ? `?name=${name}` : '';
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getbooks${query}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  const HandleDelete = (id: string) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/deletebook/${id}`)
      .then((response) => {
        console.log(response);
        message.success('Book deleted');
        setData((olddata) => {
          return olddata.filter((data) => {
            return data._id !== id;
          });
        });
      })
      .catch((err) => {
        console.log(err);
        message.error('Deletion failed');
      });
  };

  const columns = [
    {
      title: 'Ảnh bìa',
      dataIndex: 'image',
      key: 'image',
      render: (url: string) => <Avatar src={url} size={64} />,
    },
    {
      title: 'Tên sách',
      dataIndex: 'bookname',
      key: 'bookname',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} className='mt-3' />,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size='middle'>
          <Link to={'/admin/editbook/' + record._id}>
            <Button className='mx-2' type='primary' icon={<EditOutlined />}></Button>
          </Link>
          <Button type='primary' onClick={() => HandleDelete(record._id)} danger icon={<DeleteOutlined />}></Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    setSearch(value);
    fetchBooks(value);
  };

  return (
    <>
      <div className='my-10'>
        <Space direction='vertical' size='large' style={{ display: 'flex' }}>
          <Row>
            <Col span={12}>
              <Search placeholder='Nhập tên sách...' onSearch={handleSearch} enterButton />
            </Col>
            <Col span={12} className='text-right'>
              <Link to='/admin/newbook'>
                <Button size='middle' type='primary'>
                  Thêm sách
                </Button>
              </Link>
            </Col>
          </Row>
          <Table columns={columns} dataSource={data} pagination={false} bordered rowKey={'_id'} style={{ width: '100%' }} />
        </Space>
      </div>
    </>
  );
};

export default Posts;
