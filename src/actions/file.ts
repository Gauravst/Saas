'use server';
import { client } from '@/lib/prisma';
import twitterClient from '@/lib/twitter-api';
import { currentUser } from '@clerk/nextjs/server';

type Props = {
  tweetUrl?: string;
  page?: number;
  pageSize?: number;
};

const getTweetIdFromUrl = (url: string): string | null => {
  const regex = /x\.com\/(?:\w+)\/status\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const removeUrlsFromText = (text: string): string => {
  return text.replace(/https?:\/\/t\.co\/\S+/g, '');
};

const getTweetData = async (url: string) => {
  const tweetId = getTweetIdFromUrl(url);
  if (!tweetId) {
    return false;
  }
  const tweet = await twitterClient.v2.singleTweet(tweetId, {
    expansions: ['author_id', 'attachments.media_keys'],
    'tweet.fields': ['created_at', 'public_metrics', 'attachments'],
    'user.fields': ['profile_image_url', 'username', 'name'],
    'media.fields': ['url', 'type', 'preview_image_url'],
  });
  return tweet;
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

    const tweetData = await getTweetData(tweetUrl);
    if (!tweetData) {
      return { status: 404, data: 'Invalid URL' };
    }

    const author = tweetData.includes?.users?.find(
      (user) => user.id === tweetData.data.author_id
    );

    const tweetCreatedDate = new Date(tweetData?.data?.created_at);
    const newFile = await client.file.create({
      data: {
        text: removeUrlsFromText(tweetData.data.text),
        tweeetId: tweetData.data.id,
        tweetUrl: tweetUrl,
        likeCount: tweetData.data.public_metrics?.like_count ?? 0,
        bookmarkCount: tweetData.data.public_metrics?.bookmark_count ?? 0,
        impressionCount: tweetData.data.public_metrics?.impression_count ?? 0,
        quoteCount: tweetData.data.public_metrics?.quote_count ?? 0,
        retweetCount: tweetData.data.public_metrics?.retweet_count ?? 0,
        replyCount: tweetData.data.public_metrics?.reply_count ?? 0,
        authorId: author?.id ?? '',
        authorName: author?.name ?? '',
        authorUsername: author?.username ?? '',
        authorPic: author?.profile_image_url ?? '',
        authorVerified: author?.verified ?? false,
        tweetCreatedDate: tweetCreatedDate,
        tweetMedia: {
          create:
            tweetData.includes?.media?.map((media) => ({
              mediaKey: media?.media_key,
              type: media?.type?.toUpperCase(),
              url: media?.url,
            })) ?? [],
        },
        userId: authorized.id,
        preferences: {
          create: {
            bgBackground: {
              create: {},
            },
            fgBackground: {
              create: {},
            },
          },
        },
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
      },
      include: {
        files: {
          where: {
            id: id,
          },
          include: {
            preferences: {
              include: {
                fgBackground: true,
                bgBackground: true,
              },
            },
            tweetMedia: true,
          },
        },
      },
    });

    if (!data) {
      return { status: 401, data: 'User not authorized' };
    }

    return { status: 200, data: data.files[0] };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const syncFileWithTweet = async (id: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const fileData = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        files: {
          where: {
            id: id,
          },
        },
      },
    });

    if (fileData?.files && fileData?.files.length < 1) {
      return { status: 404, data: 'Tweet not found' };
    }
    const fileMainData = fileData?.files[0]!;

    const tweetData = await getTweetData(fileMainData?.tweetUrl);
    if (!tweetData) {
      return { status: 404, data: 'Tweet might be deleted' };
    }

    const metrics = tweetData?.data?.public_metrics;
    const author = tweetData.includes?.users?.find(
      (user) => user.id === tweetData.data.author_id
    );

    const data = await client.file.update({
      where: { id: fileMainData.id },
      data: {
        likeCount: metrics?.like_count ?? fileMainData.likeCount,
        bookmarkCount: metrics?.bookmark_count ?? fileMainData.bookmarkCount,
        impressionCount:
          metrics?.impression_count ?? fileMainData.impressionCount,
        quoteCount: metrics?.quote_count ?? fileMainData.quoteCount,
        retweetCount: metrics?.retweet_count ?? fileMainData.retweetCount,
        replyCount: metrics?.reply_count ?? fileMainData.replyCount,
        authorId: author?.id ?? fileMainData.authorId,
        authorName: author?.name ?? fileMainData.authorName,
        authorUsername: author?.username ?? fileMainData.authorUsername,
        authorPic: author?.profile_image_url ?? fileMainData.authorPic,
        authorVerified: author?.verified ?? fileMainData.authorVerified,
      },
    });

    if (!data) {
      return { status: 500, data: 'Something went wrong' };
    }

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: 'Internal server error' };
  }
};

export const updatePreferences = async (id: string, data) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403, data: 'User not authenticated' };
    }

    const fileData = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        files: {
          where: {
            id: id,
          },
        },
      },
    });

    if (fileData?.files && fileData?.files.length < 1) {
      return { status: 404, data: 'Tweet not found' };
    }
    const fileMainData = fileData?.files[0]!;

    const updatedFile = client.file.update({
      where: { id: fileMainData.id },
      data: {
        preferences: {
          update: data,
        },
      },
    });

    if (!updatedFile) {
      return { status: 500, data: 'Something went worng' };
    }

    return { status: 200, data: updatedFile };
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
