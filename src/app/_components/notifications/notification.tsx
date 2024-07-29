import React from 'react';
import Image from "next/image";
import styles from "@/styles/components/notifications/Notification.module.scss";

import ArrowRightBrand from "@/assets/icons/arrow_right_brand.svg";

interface NotificationProps {
  icon: string;
  title: string;
  username?: string;
  content: string;
}

const Notification: React.FC<NotificationProps> = ({ icon, title, username, content }) => {
  return (
    <div className={styles.notificationItem}>
      <div className={styles.notificationContent}>
        <div className={styles.notificationTitle}>
          <span className={styles.notificationIcon}>{icon}</span>
          {title}
        </div>
        <div className={styles.notificationText}>
          {username && <span className={styles.username}>{username} </span>}
          {content}
        </div>
      </div>
      <div className={styles.notificationArrow}>
        <Image src={ArrowRightBrand} alt="arrow-right-brand" />
      </div>
    </div>
  );
};

export default Notification;