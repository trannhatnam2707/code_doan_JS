import React, { useEffect } from 'react';
import Header from '../components/Header';

export default function MasterLayout({ children }: any) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
