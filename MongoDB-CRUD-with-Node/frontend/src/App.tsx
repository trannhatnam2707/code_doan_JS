import React from 'react';
import Header from './components/Header';
import Posts from './components/Posts';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import { Routes, Route, useMatch } from 'react-router-dom';
import Login from './pages/Login';
import MasterLayout from './layouts/MasterLayout';
import Register from './pages/Register';
import Auth from './components/Auth';
import User from './pages/User';
import Cart from './pages/Cart';
import Orders from './components/Orders';

const App: React.FC = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-9/12'>
        <Routes>
          <Route
            path='/admin'
            element={
              <Auth>
                <MasterLayout>
                  <Posts />
                </MasterLayout>
              </Auth>
            }
          />
          <Route
            path='/admin/books'
            element={
              <Auth>
                <MasterLayout>
                  <Posts />
                </MasterLayout>
              </Auth>
            }
          />
          <Route
            path='/admin/orders'
            element={
              <Auth>
                <MasterLayout>
                  <Orders />
                </MasterLayout>
              </Auth>
            }
          />
          <Route
            path='/admin/newbook'
            element={
              <Auth>
                <MasterLayout>
                  <AddBook />
                </MasterLayout>
              </Auth>
            }
          />
          <Route
            path='/admin/editbook/:id'
            element={
              <Auth>
                <MasterLayout>
                  <EditBook />
                </MasterLayout>
              </Auth>
            }
          />
          <Route
            path='/'
            element={
              <MasterLayout>
                <User />
              </MasterLayout>
            }
          />
          <Route
            path='/cart'
            element={
              <MasterLayout>
                <Cart />
              </MasterLayout>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
