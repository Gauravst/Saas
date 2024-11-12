'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import NotificationCard from './_components/notification-card';
import { getNotifications } from '@/actions/notification';
import { NotificationsProps } from '@/types/index.type';
import { useQueryData } from '@/hooks/useQueryData';

type Props = {};

function page({}: Props) {
  const { data } = useQueryData(
    ['notifications'],
    getNotifications({ page: 1, pageSize: 6 })
  );
  const notifications = data?.data as NotificationsProps[];

  return (
    <Card className="bg-transparent border-2 md:col-span-2 mt-5 lg:col-span-3">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Your Recent Notifications</CardDescription>
      </CardHeader>
      <CardContent>
        {!notifications || notifications.length === 0 ? (
          <div className="flex items-center justify-center p-6 text-gray-500">
            <p>No Notification</p>
          </div>
        ) : (
          <div className="">
            {notifications.map((notification, index) => (
              <NotificationCard key={index} notification={notification} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default page;
