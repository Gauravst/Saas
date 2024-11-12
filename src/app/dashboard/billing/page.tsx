import { getBilling } from '@/actions/billing';
import BillingHistory from '@/components/global/billing-history-card';
import CreditUsageCard from '@/components/global/credit-usage-card';
import CurrentPlan from '@/components/global/current-plan-card';
import PaymentMethod from '@/components/global/payment-method-card';
import PlanOptions from '@/components/global/plan-options-card';
import { UsersProps } from '@/types/index.type';
import React from 'react';

const page = async () => {
  const auth = await getBilling();
  const user = auth?.data as UsersProps;
  const credit = user?.credit;
  const billings = user?.billings;

  const totalCredits = credit.totalCredits;
  const usedCredits = credit.usedCredits;
  const remainingCredits = totalCredits - usedCredits;
  const allocationsType = credit.allocationsType;

  return (
    <div className="grid gap-5">
      <CurrentPlan user={user} />
      <CreditUsageCard
        totalCredits={totalCredits}
        usedCredits={usedCredits}
        remainingCredits={remainingCredits}
        allocationsType={allocationsType}
        title={'Credits Usage'}
      />
      <PaymentMethod />
      <BillingHistory billings={billings} />
      <PlanOptions currentPlan={user.subscription.plan} />
    </div>
  );
};

export default page;
