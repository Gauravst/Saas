import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from '@radix-ui/react-label';
import { PLANS } from '@/constants';

type Props = {
  currentPlan: string;
};

const PlanOptions = ({ currentPlan }: Props) => {
  const plan = PLANS.find((element) => element.id === currentPlan);
  const otherPlans = PLANS.filter((element) => element.id !== currentPlan);
  return (
    <Card className="bg-transparent border-2">
      <CardHeader>
        <CardTitle>Plan Options</CardTitle>
        <CardDescription>Choose the best plan for your needs</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="pro" className="grid gap-4">
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="pro" id="pro" />
            <Label
              htmlFor="pro"
              className="flex flex-1 items-center justify-between"
            >
              <div>
                <div className="font-medium">{plan?.name} Plan</div>
                <div className="text-sm text-muted-foreground">
                  ${plan?.price}/month
                </div>
              </div>
              <div className="text-sm">Current Plan</div>
            </Label>
          </div>
          {otherPlans.map((item, index) => {
            if (item.id === 'FREE') return;
            return (
              <div key={index} className="flex items-center space-x-4">
                <RadioGroupItem value="enterprise" id="enterprise" />
                <Label
                  htmlFor="enterprise"
                  className="flex flex-1 items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{item.name} Plan</div>
                    <div className="text-sm text-muted-foreground">
                      ${item.price}/month
                    </div>
                  </div>
                  <Button size="sm">Upgrade</Button>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default PlanOptions;
