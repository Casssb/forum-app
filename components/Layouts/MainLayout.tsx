/* eslint-disable arrow-body-style */
import React, { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default MainLayout;
