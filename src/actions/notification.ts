'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

type Props = {
  page?: number;
  pageSize?: number;
};

export const createNotification = async (content: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const data = await client.user.update({
      where: { clerkid: user.id },
      data: {
        notifications: {
          create: {
            content: content,
          },
        },
      },
    });

    if (!data) {
      return { status: 401, data: 'User not authorized' };
    }

    return { status: 200, data: 'Notification created' };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const getNotifications = async ({ page, pageSize }: Props) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const data = await client.user.findUnique({
      where: { clerkid: user.id },
      select: {
        notifications: {
          orderBy: {
            createdAt: 'desc',
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        },
      },
    });

    if (!data) {
      return { status: 401, data: 'User not authorized' };
    }

    if (!data.notifications) {
      return { status: 200, data: [] };
    }

    return { status: 200, data: data.notifications };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
