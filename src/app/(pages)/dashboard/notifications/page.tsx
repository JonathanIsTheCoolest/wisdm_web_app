"use client";

// System Imports
import React from "react";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/notifications/Notifications.module.scss";

// Component Imports
import Notification from "@/app/_components/cards/NotificationCard";

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
    <div className={styles.pageContainer}>
      <header className={styles.pageTitle}>
        <h1>Notifications</h1>
      </header>
      <div className={styles.pageWrapper}>
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