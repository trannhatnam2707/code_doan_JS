import axios from 'axios';
import React from 'react';
import { Button, Card, Carousel, Rate, message } from 'antd';
import { useCartStore } from '../store';

interface Book {
  _id: string;
  author: string;
  bookname: string;
  description: string;
  image: string;
  rating: number;
  price: number;
}

const contentStyle: React.CSSProperties = {
  height: '80vh',
};

const { Meta } = Card;

export default function User() {
  const [data, setData] = React.useState<Book[]>([]);
  const store = useCartStore();
  const addToCart = (book: Book) => {
    store.addToCart(book, 1);
    message.success('Thêm sản phẩm vào giỏ hàng thành công!');
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/getbooks`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Carousel arrows infinite={true} autoplay={true}>
        <div style={contentStyle}>
          <img src='https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img4.jpg?v=1024' className='w-full h-full object-cover' alt='' />
        </div>
        <div style={contentStyle}>
          <img src='https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img2.jpg?v=1024' className='w-full h-full object-cover' alt='' />
        </div>
        <div style={contentStyle}>
          <img src='https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img5.jpg?v=1024' className='w-full h-full object-cover' alt='' />
        </div>
        <div style={contentStyle}>
          <img src='https://theme.hstatic.net/200000343865/1001052087/14/ms_banner_img3.jpg?v=1024' className='w-full h-full object-cover' alt='' />
        </div>
      </Carousel>
      <div className='grid grid-cols-4 gap-8 my-20 w-full'>
        {data.map((book) => (
          <Card key={book._id} hoverable style={{ width: 240 }} cover={<img alt='example' src={book.image} style={{ height: 300 }} />}>
            <Meta title={book.bookname} description={book.author} />
            <Rate disabled defaultValue={book.rating} className='mt-3' />
            <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price)}</p>
            <Button className='mt-3' onClick={() => addToCart(book)}>
              Thêm vào giỏ
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
