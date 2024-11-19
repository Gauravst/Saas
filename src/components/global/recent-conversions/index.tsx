'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ImageCard from '../image-card';
import { RecentConversionsProps } from '@/types/index.type';

type Props = {
  recentConversions: RecentConversionsProps[];
};

const RecentConversions = ({ recentConversions }: Props) => {
  return (
    <Card className="bg-transparent border-2 md:col-span-2 mt-5 lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Conversions</CardTitle>
        <CardDescription>
          Your latest tweet to image conversions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!recentConversions || recentConversions.length === 0 ? (
          <div className="flex items-center justify-center p-6 text-gray-500">
            <p>No images found</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentConversions && recentConversions?.map((conversion) => (
              <ImageCard key={conversion.id} conversion={conversion} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentConversions;
