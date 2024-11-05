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

interface Conversion {
  id: number;
  title: string;
  time: string;
  html: string;
}

type Props = {
  conversion: Conversion;
};

const ImageCard = ({ conversion }: Props) => {
  const handleDelete = (id: number) => {
    console.log('deleted', id);
  };
  return (
    <Card key={conversion.id} className="w-full bg-transparent">
      <CardContent className="p-0">
        <div
          className="aspect-video w-full"
          dangerouslySetInnerHTML={{ __html: conversion.html }}
        />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">{conversion.title}</h3>
              <p className="text-xs text-muted-foreground">{conversion.time}</p>
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
