export const getElapsedTime = (createdTimestamp: string): string => {
  const createdTime: Date = new Date(createdTimestamp);
  const currentTime: Date = new Date();
  const differenceInMilliseconds = currentTime.getTime() - createdTime.getTime();

  const seconds = Math.floor(differenceInMilliseconds / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};