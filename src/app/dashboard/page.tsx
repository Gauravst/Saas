import { onAuthenticateUser } from '@/actions/user';
// import { getNotifications } from '@/actions/notification';

import { redirect } from 'next/navigation';
import DashboardPage from './_components/dashboad-page';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const Dashboard = async () => {
  const auth = await onAuthenticateUser();

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect('/auth/sign-in');
  }

  const query = new QueryClient();

  // await query.prefetchQuery({
  //   queryKey: ['notifications'],
  //   queryFn: () => getNotifications(),
  // });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div>
        <DashboardPage
          subscription={auth.user.subscription}
          credit={auth.user.credit}
        />
      </div>
    </HydrationBoundary>
  );
};

export default Dashboard;
