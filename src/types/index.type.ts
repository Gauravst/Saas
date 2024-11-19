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

export type FileProps = {
  id: string;
  text: string;
  tweeetId: string;
  tweetUrl: string;
  likeCount: number;
  bookmarkCount: number;
  impressionCount: number;
  quoteCount: number;
  retweetCount: number;
  replyCount: number;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorPic: string;
  authorVerified: boolean;
  tweetCreatedDate: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  tweetMedia: TweetMediaProps[];
  preferences: FilePreferencesProps;
};

export type FilePreferencesProps = {
  id: string;
  theme: string;
  fgPadding: number;
  bgPadding: number;
  fgRadius: string;
  bgRadius: string;
  bgBackground: number;
  fgBackground: number;
  fgShadow: string;
  fgTransparency: number;
  hideDate: boolean;
  hideMetrics: boolean;
  hideLogo: boolean;
};

export type TweetMediaProps = {
  id: string;
  mediaKey: string;
  url: string;
  type: string;
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
