// System Imports
import React from "react";
import Image from "next/image";

// API/Database Imports
import { Timeline } from "@/types";

// Stylesheet Imports
import styles from "@/app/_components/cards/TimelineCard.module.scss";

// Asset Imports
import timeline_1 from "@/assets/images/timeline_1.png";

const imageMap: { [key: string]: any } = {
  "timeline_1.png": timeline_1,
};

interface TimelineCardProps extends Timeline {
  onClick?: () => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  timeline_id,
  title,
  image,
  onClick,
}) => {
  const imageSource = imageMap[image] || timeline_1;

  return (
    <div className={styles.timelineCard} onClick={onClick}>
      <div className={styles.timelineImage}>
        <Image src={imageSource} alt={title} layout="fill" objectFit="cover" />
        <div className={styles.timelineOverlay}></div>
      </div>
      <div className={styles.timelineContent}>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default TimelineCard;
