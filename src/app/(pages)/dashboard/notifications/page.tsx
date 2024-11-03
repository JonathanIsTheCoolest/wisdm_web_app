"use client";

// System Imports
import React from "react";

// API/Database Imports
import placeholderData from "@/assets/placeholderData.json";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/notifications/Notifications.module.scss";

// Component Imports
import NotificationCard from "@/app/_components/cards/NotificationCard";

interface NotificationItem {
  icon: string;
  title: string;
  username?: string;
  content: string;
}

const Notifications = () => {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageTitle}>
        <h1>Notifications</h1>
      </header>
      <div className={styles.pageWrapper}>
        {placeholderData.notificationItems.map((notification, index) => (
          <NotificationCard
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