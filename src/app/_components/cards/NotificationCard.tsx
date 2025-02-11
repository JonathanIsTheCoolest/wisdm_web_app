// System Imports
import React from 'react';
import Image from "next/image";
import {useRouter} from 'next/navigation'

// Stylesheet Imports
import styles from "@/app/_components/cards/NotificationCard.module.scss";

// Asset Imports
import ArrowRightBrand from "@/assets/icons/arrow_right_brand.svg";

import { DisplayNotification } from '@/redux_lib/features/notificationsSlice';

import { standardizePathAnchorIds } from '@/app/_lib/helper/navigation/path';
import { notificationMessage } from '@/app/_lib/helper/response/notifications';

const NotificationCard: React.FC<DisplayNotification> = ({ 
  count, action, created_at, path, username, is_read, reference_id
}) => {
  const router = useRouter();
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
        // onClick={() => router.push(`${path}#${standardizePathAnchorIds(reference_id)}`)}
        onClick={() => router.push(path)}
        className={styles.cardArrow}>
        <Image src={ArrowRightBrand} alt="arrow-right-brand" />
      </div>
    </div>
  );
};

export default NotificationCard;