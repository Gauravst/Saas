'use server';
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

type Props = {
  tweetUrl?: string;
  page?: number;
  pageSize?: number;
};

const getTweetData = async (url: string) => {
  // work going on
  return {
    fileTitle: 'temp title',
    fileHtml: '<h1>temp htmp</h1>',
  };
};

export const createFile = async ({ tweetUrl }: Props) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    if (!tweetUrl) {
      return { status: 404, data: 'Tweet URL required' };
    }

    const authorized = await client.user.findUnique({
      where: { clerkid: user.id },
      select: {
        id: true,
        subscription: { select: { plan: true } },
        credit: {
          select: {
            totalCredits: true,
            usedCredits: true,
            allocationsType: true,
          },
        },
      },
    });

    if (!authorized) {
      return { status: 401, data: 'User not authorized' };
    }

    if (!authorized.credit) {
      return { status: 403, data: 'No credit information found for user' };
    }

    const remainingCredits =
      authorized.credit.totalCredits - authorized.credit.usedCredits;

    if (remainingCredits == 0) {
      return { status: 403, data: 'Insufficient credits to create a file' };
    }

    const { fileTitle, fileHtml } = await getTweetData(tweetUrl);

    const newFile = await client.file.create({
      data: {
        title: fileTitle,
        tweetUrl: tweetUrl,
        htmlContent: fileHtml,
        userId: authorized.id,
      },
    });

    if (!newFile) {
      return { status: 500, data: 'Unknown error during file creation' };
    }

    const updatedUser = await client.user.update({
      where: { clerkid: user.id },
      data: {
        credit: {
          update: {
            usedCredits: { increment: 1 },
          },
        },
      },
    });

    if (updatedUser) {
      return { status: 201, data: newFile };
    }

    return { status: 500, data: 'Something went worng' };
  } catch (error) {
    console.error('ERROR', error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const getFiles = async ({ page, pageSize }: Props) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const data = await client.user.findUnique({
      where: { clerkid: user.id },
      select: {
        files: {
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

    if (!data.files) {
      return { status: 200, data: [] };
    }

    return { status: 200, data: data.files };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const getOneFile = async (id: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const data = await client.user.findUnique({
      where: {
        clerkid: user.id,
        files: {
          some: {
            id: id,
          },
        },
      },
      select: {
        files: true,
      },
    });

    if (!data) {
      return { status: 401, data: 'User not authorized' };
    }

    return { status: 200, data: data.files };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const deleteFile = async (id: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const deletedFile = await client.file.delete({
      where: {
        id: id,
        user: {
          clerkid: user.id,
        },
      },
    });

    if (!deletedFile) {
      return { status: 404, data: 'File not found or already deleted' };
    }

    return { status: 200, data: 'File deleted successfully', deletedFile };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};
