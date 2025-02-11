export const notificationMessage = (username: string, count: number, action: string, created_at: string) => {
  switch(action) {
    case 'vote':
      if (count > 1) {
        `${username} was the last of ${count} people to ${action} on your comment`
      } else {
        `${username} ${action}d on your comment`
      }
    case 'comment':
      if (count > 1) {
        return `${username} was the last person to leave you a ${action}. ${`${action} total`.toUpperCase()}: ${count}`
      } else {
        return `You have ${count} ${action} from ${username}`
      }
    default:
      'idk'
  }
}