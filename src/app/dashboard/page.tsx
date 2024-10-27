import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

type Props = {};

const DasboardPage = async (props: Props) => {
  const auth = await onAuthenticateUser();

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect('/auth/sign-in');
  }
};

export default DasboardPage;
