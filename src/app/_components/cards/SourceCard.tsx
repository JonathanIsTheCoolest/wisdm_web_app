// System Imports
import React from "react";
import { motion } from "motion/react";

// Stylesheet Imports
import styles from "@/app/_components/cards/SourceCard.module.scss";

// Types
export interface SourceCardProps {
  title: string;
  author?: string;
  publication: string;
  date?: string;
  url?: string;
  imageUrl?: string;
  variant?: "default" | "left" | "right";
  animate?: boolean;
}

const SourceCard: React.FC<SourceCardProps> = ({
  title,
  author,
  publication,
  date,
  url,
  imageUrl,
  variant = "default",
  animate = false,
}) => {
  const hasImage = imageUrl && imageUrl.length > 0;

  const Container = animate ? motion.div : "div";
  return (
    <Container
      className={`${styles.sourceCard} ${styles[variant]}`}
      style={{
        backgroundImage: hasImage ? `url(${imageUrl})` : undefined,
        cursor: url ? "pointer" : "default",
        color: "inherit",
      }}
      {...(animate && {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.3,
          type: "tween",
          ease: "easeOut",
        },
      })}
      onClick={() => {
        if (url) {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      }}
    >
      <div className={styles.sourceCardOverlay}>
        <h3 className={styles.sourceCardTitle}>{title}</h3>
        <div className={styles.sourceCardDetails}>
          {author && <span className={styles.sourceCardAuthor}>{author}</span>}
          <span className={styles.sourceCardPublication}>{publication}</span>
          {date && <span className={styles.sourceCardDate}>{date}</span>}
        </div>
      </div>
    </Container>
  );
};

export default SourceCard;
