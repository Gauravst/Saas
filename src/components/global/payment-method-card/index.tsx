import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Plus } from 'lucide-react';

type Props = {};

const PaymentMethod = (props: Props) => {
  return (
    <Card className="bg-transparent border-2">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Manage your payment method</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RadioGroup defaultValue="card1" className="grid gap-4">
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="card1" id="card1" />
            <Label htmlFor="card1" className="flex items-center space-x-4">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Visa ending in 1234</div>
                <div className="text-sm text-muted-foreground">
                  Expires 12/24
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
        <Button variant="outline" className="w-full bg-transparent">
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
