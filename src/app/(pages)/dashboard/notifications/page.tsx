"use client";

// System Imports
import React from "react";

// API/Database Imports
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
          Object.values(notifications).length ?
          Object.entries(notifications).map(([key, notification]) => {
            const {count, action, created_at, path, username, is_read, reference_id} = notification
            return (
              <NotificationCard
                key={key}
                count={count}
                action={action}
                created_at={created_at}
                path={path}
                username={username}
                is_read={is_read}
                reference_id={reference_id}
              />
            )
          }) :
          <p>You have no notifications to display... Be more active</p>
        }
      </div>
    </div>
  );
};

export default Notifications;