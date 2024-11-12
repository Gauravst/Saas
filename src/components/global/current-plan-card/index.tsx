import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UsersProps } from '@/types/index.type';
import { HumanReadableDate } from '@/lib/humanReadableDate';

type Props = {
  user: UsersProps;
};

const CurrentPlan = ({ user }: Props) => {
  return (
    <Card className="bg-transparent border-2">
      <CardHeader>
        <CardTitle>Current Plan</CardTitle>
        <CardDescription>
          You are currently on the {user.subscription.plan} plan
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="font-medium">{user.subscription.plan} Plan</div>
            <div className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Active
            </div>
          </div>
          <div className="font-medium">$29/month</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Next billing date
            </p>
            <p className="text-sm text-muted-foreground">
              {HumanReadableDate({ date: user.subscription.nextBillingDate })}
            </p>
          </div>
          <Button variant="outline" className="bg-transparent">
            Cancel Subscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPlan;
