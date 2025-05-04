"use client";

// System Imports
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

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
  const [cardState, setCardState] = useState<"idle" | "revealed" | "voted">(
    vote === null ? "idle" : "voted"
  );
  const [votedValue, setVotedValue] = useState<boolean | null>(vote);

  const handleClick = () => {
    if (cardState === "idle") setCardState("revealed");
    else if (cardState === "revealed") setCardState("idle");
  };

  const handleVote = (voteValue: boolean) => {
    setVotedValue(voteValue);
    setCardState("voted");
    setTimeout(() => onVote(id, voteValue), 400); // allow animation
  };

  const imageSource = imageMap[image] || explore_feed_1;

  return (
    <motion.div className={styles.voteCard} onClick={handleClick}>
      <div className={styles.cardImage}>
        <Image src={imageSource} alt={title} layout="fill" objectFit="cover" />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.cardContent}>
        <AnimatePresence mode="wait">
          {cardState === "idle" && (
            <motion.h2
              key="title"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h2>
          )}
          {cardState === "revealed" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.voteContainer}
            >
              <motion.button
                className={`${styles.voteButton}`}
                whileTap={{ scale: 1.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(true);
                }}
              >
                👍
              </motion.button>
              <motion.h4 className={styles.cardBody}>{description}</motion.h4>
              <motion.button
                className={`${styles.voteButton}`}
                whileTap={{ scale: 1.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(false);
                }}
              >
                👎
              </motion.button>
            </motion.div>
          )}
          {cardState === "voted" && votedValue !== null && (
            <motion.div
              key="voted"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={styles.voteFinishedContainer}
            >
              <motion.span
                initial={{ y: votedValue ? 40 : -40, scale: 0.8 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={{ fontSize: "48px", lineHeight: "1" }}
              >
                {votedValue ? "👍" : "👎"}
              </motion.span>
              <motion.h4
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                You voted {votedValue ? "thumbs up" : "thumbs down"} to "{title}
                "
              </motion.h4>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VoteCard;
