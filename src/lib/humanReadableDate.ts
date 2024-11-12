type Props = {
  date: Date | string;
};

export const HumanReadableDate = ({ date }: Props) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!date || isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const year = dateObj.getFullYear();

  const formattedDate = `${day}, ${month} ${year}`;
  return formattedDate;
};
