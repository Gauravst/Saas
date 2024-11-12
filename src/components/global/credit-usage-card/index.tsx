import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type Props = {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  allocationsType: string;
  title: string;
};

const CreditUsageCard = ({
  totalCredits,
  usedCredits,
  remainingCredits,
  allocationsType,
  title,
}: Props) => {
  return (
    <Card className="bg-transparent border-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          You have used {usedCredits} out of {totalCredits} credits
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={(usedCredits / totalCredits) * 100} />
          <div className="text-sm text-muted-foreground text-right">
            {remainingCredits} credits left
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditUsageCard;
