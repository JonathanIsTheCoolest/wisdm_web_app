"use client";

// System Imports
import React from "react";

// API/Database Imports
import placeholderData from "@/assets/placeholderData.json";
import { useAppSelector } from "@/redux_lib/hooks";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/notifications/Notifications.module.scss";

// Component Imports
import NotificationCard from "@/app/_components/cards/NotificationCard";

const Notifications = () => {
  const notifications = useAppSelector(state => state.notifications)
  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageTitle}>
        <h1>Notifications</h1>
      </header>
      <div className={styles.pageWrapper}>
        {
          Object.entries(notifications).map(([key, notification]) => {
            const {count, action, created_at, path, username, is_read} = notification
            return (
              <NotificationCard
                key={key}
                count={count}
                action={action}
                created_at={created_at}
                path={path}
                username={username}
                is_read={is_read}
              />
            )
          })
        }
      </div>
    </div>
  );
};

export default Notifications;