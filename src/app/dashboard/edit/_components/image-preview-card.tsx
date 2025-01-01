'use client';
import React from 'react';
import { Card } from '@/components/ui/card';
import { FormatTweetDate } from '@/lib/human-readable-date';
import { FileProps } from '@/types/index.type';
import Image from 'next/image';

import {
  Heart,
  Bookmark,
  Eye,
  MessageCircle,
  Repeat,
  Quote,
} from 'lucide-react';
import XLogo from '@/components/global/x-logo';

type Props = {
  data: FileProps;
};

const ImagePreviewCard = ({ data }: Props) => {
  const preferences = data?.preferences;
  const mediaCount = data?.tweetMedia?.length;
  const colorElement = data?.preferences?.bgBackground;
  const defaultColor = 'transparent';
  return (
    <div className="w-full h-auto flex flex-col">
      <Card
        style={
          (colorElement?.color?.includes('gradient')
            ? { background: colorElement?.color }
            : {
                backgroundColor: colorElement?.color || defaultColor,
              }) as React.CSSProperties
        }
        className={`p-${preferences.bgPadding} rounded-${preferences.bgRadius}`}
      >
        <div
          className={`w-full border bg-white max-w-md mx-auto p-${preferences.fgPadding} rounded-${preferences.fgRadius} shadow-${preferences.fgShadow}`}
        >
          <div className="flex items-start">
            {data.authorPic && (
              <Image
                src={data.authorPic}
                alt="Profile"
                width={48}
                height={48}
                className="rounded-full mr-3"
              />
            )}
            <div className="flex flex-col items-start space-x-2">
              <h3 className="font-semibold text-black">{data.authorName}</h3>
              <span className="text-gray-500 text-left text-sm">
                @{data?.authorUsername}
              </span>
            </div>

            {!data.preferences.hideLogo && (
              <div className="ml-auto flex justify-center items-center">
                <XLogo />
              </div>
            )}
          </div>

          <div className="mt-3 text-gray-800">
            <p className={`${mediaCount > 0 && 'mb-2'}`}>{data.text}</p>

            <div
              className={`grid gap-2 ${
                mediaCount === 1
                  ? 'grid-cols-1'
                  : mediaCount === 2
                    ? 'grid-cols-2'
                    : mediaCount === 3
                      ? 'grid-rows-[50%_50%] grid-cols-2'
                      : 'grid-cols-2 grid-rows-2'
              }`}
              style={
                mediaCount === 3
                  ? { gridTemplateAreas: `'a a' 'b c'` }
                  : undefined
              }
            >
              {mediaCount &&
                mediaCount > 0 &&
                data.tweetMedia.map((image, index) => (
                  <Image
                    key={index}
                    src={image.url}
                    alt={`Tweet image ${index + 1}`}
                    width={500}
                    height={500}
                    className={`rounded-md ${
                      mediaCount === 3
                        ? index === 0
                          ? 'col-span-2 row-span-1'
                          : 'col-span-1 row-span-1'
                        : 'w-full h-full'
                    }`}
                    style={
                      mediaCount === 3 && index === 0
                        ? { gridArea: 'a' }
                        : mediaCount === 3 && index === 1
                          ? { gridArea: 'b' }
                          : mediaCount === 3 && index === 2
                            ? { gridArea: 'c' }
                            : undefined
                    }
                  />
                ))}
            </div>
          </div>

          {!preferences.hideDate && (
            <p className="text-sm mt-3 text-gray-500">
              {FormatTweetDate(data?.tweetCreatedDate)}
            </p>
          )}

          {!preferences.hideMetrics && (
            <div className="flex justify-around items-center mt-3 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                <span>{data.replyCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Repeat className="w-4 h-4 text-green-500" />
                <span>{data.retweetCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Quote className="w-4 h-4 text-yellow-500" />
                <span>{data.quoteCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span>{data.likeCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bookmark className="w-4 h-4 text-purple-500" />
                <span>{data.bookmarkCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4 text-gray-500" />
                <span>{data.impressionCount}</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ImagePreviewCard;
