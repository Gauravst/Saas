'use client';
import RecentConversions from '@/components/global/recent-conversions';
import { useQueryData } from '@/hooks/useQueryData';
import { getFiles } from '@/actions/file';
import { RecentConversionsProps } from '@/types/index.type';

const page = () => {
  const { data } = useQueryData(
    ['recentConversions'],
    getFiles({ page: 1, pageSize: 6 })
  );
  const recentConversions = data?.data as RecentConversionsProps[];

  return <RecentConversions recentConversions={recentConversions} />;
};

export default page;
