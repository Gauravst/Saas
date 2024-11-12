import TimeAgo from '@/components/global/time-ago';
import { NotificationsProps } from '@/types/index.type';
import { Info, Check, AlertTriangle } from 'lucide-react';
import React from 'react';

type Props = {
  notification: NotificationsProps;
};

const NotificationTypeIcon = (type: string) => {
  if (type === 'WARNING') {
    return (
      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
    );
  } else if (type === 'SUCCESS') {
    return <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />;
  } else {
    return <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />;
  }
};

const NotificationCard = ({ notification }: Props) => {
  return (
    <div className="p-4 border-b">
      {NotificationTypeIcon(notification.type)}
      <div className="flex items-start gap-3">
        <div>
          <p className="text-sm">{notification.content}</p>
          {/*<p className="text-xs text-muted-foreground mt-1">5 hours ago</p>*/}
          <TimeAgo time={notification.createdAt} />
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
