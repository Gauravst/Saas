'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const getBilling = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const data = await client.user.findUnique({
      where: { clerkid: user.id },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        credit: {
          select: {
            totalCredits: true,
            usedCredits: true,
            allocationsType: true,
          },
        },
        billings: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!data) {
      return { status: 401, data: 'User not authorized' };
    }

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
