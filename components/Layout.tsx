import { NextComponentType, NextPageContext } from 'next/types';
import { ReactNode } from 'react';

import { Footer, Header } from '.';
import '../styles/globals.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: NextComponentType<NextPageContext, null, LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
