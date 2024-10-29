import React from 'react';
import Sidebar from '@/components/global/sidebar';
import GlobalHeader from '@/components/global/global-header';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="w-full pt-28 p-6 overflow-x-hidden">
        <GlobalHeader />
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
