"use client";

// System Imports
import React, { useState } from "react";
import Image from "next/image";

// Stylesheet Imports
import styles from "@/app/_components/cards/VoteCard.module.scss";

// Asset Imports
import explore_feed_1 from "@/assets/images/explore_feed_1.png";
import explore_feed_2 from "@/assets/images/explore_feed_2.png";

const imageMap: { [key: string]: any } = {
  "explore_feed_1.png": explore_feed_1,
  "explore_feed_2.png": explore_feed_2,
};

interface VoteItem {
  id: string;
  image: string;
  title: string;
  description: string;
  vote: boolean | null;
  onVote: (id: string, vote: boolean) => void;
}

const VoteCard: React.FC<VoteItem> = ({
  id,
  image,
  title,
  description,
  vote,
  onVote,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleVote = (voteValue: boolean) => {
    onVote(id, voteValue);
    setIsExpanded(false);
  };

  const imageSource = imageMap[image] || explore_feed_1;

  return (
    <div className={styles.voteCard} onClick={handleClick}>
      <div className={styles.cardImage}>
        <Image src={imageSource} alt={title} layout="fill" objectFit="cover" />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.cardContent}>
        {!isExpanded ? (
          <h3>{title}</h3>
        ) : (
          <>
            <div className={styles.voteContainer}>
              <button
                className={`${styles.voteButton} ${
                  vote === true ? styles.selected : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(true);
                }}
              >
                👍
              </button>
              <p className={styles.cardBody}>{description}</p>
              <button
                className={`${styles.voteButton} ${
                  vote === false ? styles.selected : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(false);
                }}
              >
                👎
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VoteCard;
