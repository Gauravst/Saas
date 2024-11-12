'use client';
import { useState } from 'react';
import { Bolt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RecentConversions from '@/components/global/recent-conversions';
import { useQueryData } from '@/hooks/useQueryData';
import { getFiles } from '@/actions/file';
import { RecentConversionsProps } from '@/types/index.type';
import CreditUsageCard from '@/components/global/credit-usage-card';

type Props = {
  subscription: {
    plan: string;
  };
  credit: {
    totalCredits: number;
    usedCredits: number;
    allocationsType: string;
  };
};

const DashboardPage = ({ subscription, credit }: Props) => {
  const totalCredits = credit.totalCredits;
  const remainingCredits = credit.totalCredits - credit.usedCredits;
  const usedCredits = credit.usedCredits;
  const allocationsType = credit.allocationsType;
  const currentPlan = subscription.plan;
  const nextPlan =
    subscription.plan === 'FREE'
      ? 'PRO'
      : subscription.plan === 'PRO'
        ? 'LIFETIME'
        : '';

  const { data } = useQueryData(
    ['recentConversions'],
    getFiles({ page: 1, pageSize: 6 })
  );
  const recentConversions = data?.data as RecentConversionsProps[];

  // interface Conversion {
  //   id: number;
  //   title: string;
  //   time: string;
  //   html: string;
  // }

  // const [recentConversions, setRecentConversions] = useState<Conversion[]>([
  //   {
  //     id: 1,
  //     title: 'Tweet about AI',
  //     time: '2 hours ago',
  //     html: "<div style='width: 100%; height : 100%; border-radius : 10px 10px 0px 0px; background: linear-gradient(45deg, #2C3E50, #4CA1AF); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;'><p style='text-align: center;'>Your tweet content here</p></div>",
  //   },
  //   {
  //     id: 2,
  //     title: 'Announcement Tweet',
  //     time: '5 hours ago',
  //     html: "<div style='width: 100%; height : 100%; border-radius : 10px 10px 0px 0px; background: linear-gradient(45deg, #2C3E50, #4CA1AF); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;'><p style='text-align: center;'>Your tweet content here</p></div>",
  //   },
  //   {
  //     id: 3,
  //     title: 'Product Launch',
  //     time: '1 day ago',
  //     html: "<div style='width: 100%; height : 100%; border-radius : 10px 10px 0px 0px; background: linear-gradient(45deg, #2C3E50, #4CA1AF); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;'><p style='text-align: center;'>Your tweet content here</p></div>",
  //   },
  // ]);

  return (
    <div className="overflow-hidden">
      <div className="grid gap-5 md:grid-cols-2">
        {/* Credit Bar */}
        <CreditUsageCard
          totalCredits={totalCredits}
          usedCredits={usedCredits}
          remainingCredits={remainingCredits}
          allocationsType={allocationsType}
          title={'Credits Remaining'}
        />

        {/* Plan Information */}
        <Card className="bg-transparent border-2">
          <CardHeader>
            <CardTitle>Current Plan : {currentPlan}</CardTitle>
            <CardDescription>
              Upgrade to {nextPlan} for more features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bolt className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">View Details</span>
              </div>
              <Button variant="outline" className="bg-transparent">
                Upgrade
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <RecentConversions recentConversions={recentConversions} />
    </div>
  );
};

export default DashboardPage;
