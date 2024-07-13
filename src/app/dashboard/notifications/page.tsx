import React from "react";
import styles from "@/styles/dashboard/notifications/Notifications.module.scss";

const notifications = [
  {
    icon: "🔔",
    title: "New Reply Alert!",
    username: "UserNameHere",
    content: "has responded to your comment. Click here to join the conversation!",
  },
  {
    icon: "🛑",
    title: "Moderation Update.",
    content: "Your recent post has been moderated. Tap to learn more and see your options.",
  },
  {
    icon: "🏆",
    title: "Achievement Unlocked!",
    content: "Your comment just hit 100 upvotes! Tap to view.",
  },
  {
    icon: "🔔",
    title: "New Reply Alert!",
    username: "UserNameHere",
    content: "has responded to your comment. Click here to join the conversation!",
  },
  {
    icon: "🗣️",
    title: "You’re Being Quoted!",
    content: "Tap how your words are sparking more conversation.",
  },
];

const Notifications = () => {
  return (
    <div className={styles.notificationsContainer}>
      <header className={styles.header}>
        <h1>Notifications</h1>
      </header>
      {notifications.map((notification, index) => (
        <div key={index} className={styles.notificationItem}>
          <div className={styles.notificationContent}>
            <div className={styles.notificationTitle}>
              <span className={styles.notificationIcon}>{notification.icon}</span>
              {notification.title}
            </div>
            <div className={styles.notificationText}>
              {notification.username && <span className={styles.username}>{notification.username} </span>}
              {notification.content}
            </div>
          </div>
          <div className={styles.notificationArrow}>➔</div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;