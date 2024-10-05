"use client";

import React from "react";
import styles from "@/styles/dashboard/notifications/Notifications.module.scss";
import Notification from "@/app/_components/notifications/notification";

interface NotificationItem {
  icon: string;
  title: string;
  username?: string;
  content: string;
}

const notifications: NotificationItem[] = [
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
        <h1 className={styles.pageTitle}>Notifications</h1>
      </header>
      <div className={styles.notificationsList}>
        {notifications.map((notification, index) => (
          <Notification
            key={index}
            icon={notification.icon}
            title={notification.title}
            username={notification.username}
            content={notification.content}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;