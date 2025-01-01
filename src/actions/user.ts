'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
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
      },
    });

    if (userExist) {
      return { status: 200, data: userExist };
    }

    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        subscription: {
          create: {},
        },
        credit: {
          create: {},
        },
        setting: {
          create: {},
        },
      },
      include: {
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
      },
    });

    if (newUser) {
      return { status: 201, data: newUser };
    }

    return { status: 400 };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
