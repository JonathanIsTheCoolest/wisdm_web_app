// System Imports
import React from "react";
import Image from "next/image";

// Stylesheet Imports
import styles from "@/app/_components/cards/ActivityCard.module.scss";

// Asset Imports
import upvoteIcon from "@/assets/icons/upvote.svg";
import commentIcon from "@/assets/icons/comment.svg";

interface ActivityProps {
  topic?: string;
  content: string;
  upvotes?: number;
  comments?: number;
}

const ActivityCard: React.FC<ActivityProps> = ({
  topic,
  content,
  upvotes = 0,
  comments = 0,
}) => {
  return (
    <div className={styles.activityCard}>
      <div className={styles.cardContent}>
        {topic && <h3>{topic}</h3>}
        <div className={styles.commentContent}>
          <p className={styles.commentText}>{content}</p>
        </div>
        <div className={styles.commentFooter}>
          <div className={styles.commentContainer}>
            <Image
              src={upvoteIcon}
              className={styles.upvoteIcon}
              alt="Upvote"
            />
            <span>{upvotes}</span>
            <Image
              src={upvoteIcon}
              className={styles.downvoteIcon}
              alt="Downvote"
            />
          </div>
          <div className={styles.commentCount}>
            <Image src={commentIcon} alt="Comment" />
            <span>{comments} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
