// System Imports
import React from "react";
import Image, { StaticImageData } from "next/image";

// Stylesheet Imports
import styles from "@/app/_components/cards/CommentCard.module.scss";

// Asset Imports
import userIcon from "@/assets/icons/user_avatar.svg";
import upvoteIcon from "@/assets/icons/upvote.svg";
import commentIcon from "@/assets/icons/comment.svg";

interface CommentProps {
  timeline_title?: string;
  username: string;
  time: string;
  content: string;
  upvotes?: number;
  comments?: number;
  avatar?: string | StaticImageData;
}

const CommentCard: React.FC<CommentProps> = ({
  timeline_title,
  username,
  time,
  content,
  upvotes = 0,
  comments = 0,
  avatar,
}) => {
  const [imgSrc, setImgSrc] = React.useState<string | StaticImageData>(
    avatar || userIcon
  );

  return (
    <div className={styles.commentCard}>
      {" "}
      {/* Change into commentCard */}
      <div className={styles.cardContent}>
        {timeline_title && <h3>{timeline_title}</h3>}
        <div className={styles.commentContent}>
          <div className={styles.userWrapper}>
            <div className={styles.userName}>
              <div className={styles.userIcon}>
                <Image
                  src={imgSrc}
                  width={40}
                  height={40}
                  className={styles.userIcon}
                  alt={`${username}'s avatar`}
                  onError={() => setImgSrc(userIcon)}
                />
              </div>
              <span>
                {username} • {time}
              </span>
            </div>
          </div>
          <p>{content}</p>
        </div>
        <div className={styles.commentFooter}>
          <div className={styles.commentContainer}>
            <div className={styles.commentVotes}>
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

export default CommentCard;
