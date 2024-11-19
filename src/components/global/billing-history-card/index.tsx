import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BillingsProps } from '@/types/index.type';
import { HumanReadableDate } from '@/lib/human-readable-date';

type Props = {
  billings: BillingsProps[];
};

const BillingHistory = ({ billings }: Props) => {
  return (
    <Card className="bg-transparent border-2">
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>View your recent invoices</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {billings.slice(0, 2).map((bill, index) => {
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {HumanReadableDate({ date: bill.billingDate })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {bill.plan} Plan
                </p>
              </div>
              <div className="font-medium">
                {bill.amount} {bill.currency}
              </div>
            </div>
          );
        })}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full bg-transparent">
          View All Invoices
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BillingHistory;
