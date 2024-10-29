'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    // WOP : - here fetch users notifaction

    return { status: 400 };
  } catch (error) {
    console.log('ERROR', error);
    return { status: 500 };
  }
};
