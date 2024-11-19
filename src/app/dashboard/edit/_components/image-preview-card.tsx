'use client';
import { Card } from '@/components/ui/card';
import { BG_HTML_DEFAULT_CSS } from '@/constants';
import { FormatTweetDate } from '@/lib/human-readable-date';
import { FileProps } from '@/types/index.type';
import Image from 'next/image';
import React from 'react';

type Props = {
  data: FileProps;
};

const ImagePreviewCard = ({ data }: Props) => {
  const preferences = data?.preferences;
  return (
    <div className="w-full flex flex-col">
      <Card
        className={`${BG_HTML_DEFAULT_CSS} p-${preferences.bgPadding} rounded-${preferences.bgRadius}`}
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
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{data.authorName}</h3>
                <span className="text-gray-500">@{data?.authorUsername}</span>
              </div>
              <p className="text-sm text-gray-500">
                {FormatTweetDate(data?.tweetCreatedDate)}
              </p>
            </div>
          </div>
          <div className="mt-3 text-gray-800">
            <p>{data.text}</p>
          </div>
          <div className="mt-2 flex space-x-2">
            <span className="text-blue-500">#hashtags</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ImagePreviewCard;
