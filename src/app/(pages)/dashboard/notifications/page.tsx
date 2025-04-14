"use client";

// System Imports
import React, { useEffect } from "react";

// API/Database Imports
import { useAppSelector } from "@/redux_lib/hooks";

// Stylesheet Imports
import styles from "@/app/(pages)/dashboard/notifications/Notifications.module.scss";

// Component Imports
import NotificationCard from "@/app/_components/cards/NotificationCard";
import { useLoadingState } from "@/hooks/useLoadingState";
import LoadingSpinner from "@/app/_components/loading/LoadingSpinner";

const Notifications = () => {
  const notifications = useAppSelector((state) => state.notifications);
  const { isLoading, setLoaded } = useLoadingState(["notifications"]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // ... existing fetch code ...
      } finally {
        setLoaded("notifications");
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <header className={styles.pageTitle}>
        <h1>Notifications</h1>
      </header>
      <div className={styles.pageWrapper}>
        {isLoading ? (
          <div className={styles.spinnerWrapper}>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {Object.values(notifications).length ? (
              Object.entries(notifications).map(([key, notification]) => {
                const {
                  count,
                  action,
                  created_at,
                  path,
                  username,
                  is_read,
                  reference_id,
                } = notification;
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
                );
              })
            ) : (
              <p>You have no notifications to display... Be more active</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notifications;
