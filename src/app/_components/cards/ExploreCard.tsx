// System Imports
import React from "react";
import Image from "next/image";

// Stylesheet Imports
import styles from "@/app/_components/cards/ExploreCard.module.scss";

// Asset Imports
import explore_feed_1 from "@/assets/images/explore_feed_1.png";
import explore_feed_2 from "@/assets/images/explore_feed_2.png";
import explore_feed_3 from "@/assets/images/explore_feed_3.png";
import explore_feed_4 from "@/assets/images/explore_feed_4.png";
import explore_feed_5 from "@/assets/images/explore_feed_5.png";
import explore_feed_6 from "@/assets/images/explore_feed_6.png";

const imageMap: { [key: string]: any } = {
  "explore_feed_1.png": explore_feed_1,
  "explore_feed_2.png": explore_feed_2,
  "explore_feed_3.png": explore_feed_3,
  "explore_feed_4.png": explore_feed_4,
  "explore_feed_5.png": explore_feed_5,
  "explore_feed_6.png": explore_feed_6,
};

interface ExploreCardProps {
  image: any;
  index: number;
}

const ExploreCard: React.FC<ExploreCardProps> = ({ image, index }) => {
  const imageSource = imageMap[image] || explore_feed_1;
  return (
    <div className={styles.exploreItem}>
      <Image
        src={image}
        alt={`Featured ${index + 1}`}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw,
               (max-width: 1200px) 50vw,
               33vw"
      />
    </div>
  );
};

export default ExploreCard;
