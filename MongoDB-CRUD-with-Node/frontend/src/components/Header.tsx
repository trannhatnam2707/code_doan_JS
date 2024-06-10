import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const HandleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='flex justify-between px-4 bg-white py-5 shadow-md rounded-sm'>
      <div className='font-poppins text-xl'>
        <Link className='no-underline text-slate-950 hover:text-slate-650 visited:no-underline' to='/'>
          Book Store
        </Link>
      </div>

      <div className='flex gap-5'>
        {window.location.pathname === '/' && (
          <Link to='/cart'>
            <Button type='link'>Giỏ hàng</Button>
          </Link>
        )}
        {localStorage.getItem('token') ? (
          <>
            {window.location.pathname !== '/' && window.location.pathname !== '/cart' && (
              <>
                <Link to='/admin/books'>
                  <Button type='link'>Sách</Button>
                </Link>

                <Link to='/admin/orders'>
                  <Button type='link'>Đơn hàng</Button>
                </Link>
              </>
            )}

            <Button onClick={HandleLogout} className='mx-3' danger type='text' icon={<LogoutOutlined />}>
              Đăng xuất
            </Button>
          </>
        ) : (
          <Link to='/login'>
            <Button size='middle' type='primary'>
              Đăng nhập
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
