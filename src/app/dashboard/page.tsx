import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';
import DashboardPage from './_components/dashboad-page';

const Dashboard = async () => {
  const auth = await onAuthenticateUser();

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect('/auth/sign-in');
  }

  const user = auth.data;

  return (
    <>
      <DashboardPage subscription={user?.subscription} credit={user?.credit} />
    </>
  );
};

export default Dashboard;
