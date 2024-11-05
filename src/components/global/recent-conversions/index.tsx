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

interface Conversion {
  id: number;
  title: string;
  time: string;
  html: string;
}

type Props = {
  recentConversions: Conversion[];
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentConversions.map((conversion) => (
            <ImageCard key={conversion.id} conversion={conversion} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentConversions;
