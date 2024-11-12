export type UsersProps = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: Date;
  updatedAt: Date;
  clerkid: string;
  role: string;
  subscription: {
    plan: string;
    generationMonth: Date;
    nextBillingDate: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  credit: {
    totalCredits: number;
    usedCredits: number;
    allocationsType: string;
    createdAt: Date;
    updatedAt: Date;
  };
  billings: BillingsProps[];
};

export type BillingsProps = {
  id: string;
  amount: number;
  currency: string;
  billingDate: Date;
  status: string;
  plan: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RecentConversionsProps = {
  id: string;
  title: string;
  tweetUrl: string;
  htmlContent: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type NotificationsProps = {
  id: string;
  userId: string;
  content: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
};
