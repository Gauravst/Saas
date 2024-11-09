import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  time: string | Date;
}

const TimeAgo = ({ time }: Props) => {
  if (!time) {
    return <p className="text-xs text-muted-foreground">some time ago</p>;
  }

  const updatedAtDate = new Date(time);
  const timeAgo = formatDistanceToNow(updatedAtDate);

  return <p className="text-xs text-muted-foreground">{timeAgo} ago</p>;
};

export default TimeAgo;
