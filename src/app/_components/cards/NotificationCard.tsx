// System Imports
import React from 'react';
import Image from "next/image";
import {useRouter} from 'next/navigation'

// Stylesheet Imports
import styles from "@/app/_components/cards/NotificationCard.module.scss";

// Asset Imports
import ArrowRightBrand from "@/assets/icons/arrow_right_brand.svg";

import { DisplayNotification } from '@/redux_lib/features/notificationsSlice';

import { notificationMessage } from '@/app/_lib/helper/response/notifications';

const NotificationCard: React.FC<DisplayNotification> = ({ 
  count, action, created_at, path, username, is_read, reference_id
}) => {
  const router = useRouter();
  const extractPath = (path: string, keyword: string): string | null => {
    const regex = new RegExp(`${keyword}=([^?]*)`);
    const match = path.match(regex);
    return match ? match[1] : null;
  };
  const newPath = `notifications/view?source_id=${extractPath(path, 'timeline_id')}&reference_id=${reference_id}`
  return (
    <div className={styles.notificationCard}>
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <span>🔔</span>
          {action}
        </div>
        <div className={styles.cardBody}>
          {notificationMessage(username, count, action, created_at)}
        </div>
      </div>
      <div 
        onClick={() => router.push(newPath)}
        className={styles.cardArrow}>
        <Image src={ArrowRightBrand} alt="arrow-right-brand" />
      </div>
    </div>
  );
};

export default NotificationCard;