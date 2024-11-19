import { getOneFile } from '@/actions/file';
import { FileProps } from '@/types/index.type';
import EditPage from '../_components/edit-page';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const response = await getOneFile(id);
  const data = response.data as FileProps;

  if (response.status !== 200) {
    return redirect('/dashboard');
  }

  return (
    <>
      <EditPage data={data} />
    </>
  );
};

export default Page;
