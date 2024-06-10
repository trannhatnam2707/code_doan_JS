import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ children }: any) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  return <>{children}</>;
}
