import React from 'react';
import Sidebar from '@/components/global/sidebar';
import GlobalHeader from '@/components/global/global-header';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getNotifications } from '@/actions/notification';
import { getFiles } from '@/actions/file';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
  });

  await query.prefetchQuery({
    queryKey: ['recentConversions'],
    queryFn: () => getFiles({ page : 1, pageSize : 6}),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <div className="w-full pt-28 p-6 overflow-x-hidden">
          <GlobalHeader />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
