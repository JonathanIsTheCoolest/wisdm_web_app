// System Imports
import React from 'react';
import Image from "next/image";

// Stylesheet Imports
import styles from "@/app/_components/cards/NotificationCard.module.scss";

// Asset Imports
import ArrowRightBrand from "@/assets/icons/arrow_right_brand.svg";

interface NotificationProps {
  icon: string;
  title: string;
  username?: string;
  content: string;
}

const Notification: React.FC<NotificationProps> = ({ icon, title, username, content }) => {
  return (
    <div className={styles.notificationCard}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span>{icon}</span>
          {title}
        </div>
        <div className={styles.cardBody}>
          {username && <span>{username} </span>}
          {content}
        </div>
      </div>
      <div className={styles.cardArrow}>
        <Image src={ArrowRightBrand} alt="arrow-right-brand" />
      </div>
    </div>
  );
};

export default Notification;