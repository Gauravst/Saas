'use client';
import React from 'react';

import { MoreVertical, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { redirect } from 'next/navigation';
import { RecentConversionsProps } from '@/types/index.type';
import TimeAgo from '../time-ago';

type Props = {
  conversion: RecentConversionsProps;
};

const ImageCard = ({ conversion }: Props) => {
  const handleDelete = (id: number) => {
    console.log('deleted', id);
  };

  const handleCardClick = () => {
    return redirect(`/dashboard/edit/${conversion.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      key={conversion.id}
      className="hover:cursor-pointer w-full bg-transparent"
    >
      <CardContent className="p-0">
        <div
          className="aspect-video w-full"
          dangerouslySetInnerHTML={{ __html: conversion.htmlContent }}
        />
        <div className="p-4 hover:cursor-default">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium hover:underline hover:cursor-pointer">
                {conversion.title}
              </h3>
              <TimeAgo time={conversion.updatedAt} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => handleDelete(conversion.id)}>
                  <Download className="mr-2 h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDelete(conversion.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
