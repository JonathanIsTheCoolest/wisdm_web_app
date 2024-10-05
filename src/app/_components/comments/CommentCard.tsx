import React from 'react';
import Image from 'next/image';
import styles from '@/styles/components/comments/Comment.module.scss';

import userIcon from '@/assets/icons/user_avatar.svg';
import upvoteIcon from '@/assets/icons/upvote.svg';
//import downvoteIcon from '@/assets/icons/downvote.svg';
import commentIcon from '@/assets/icons/comment.svg';

interface CommentProps {
  topic?: string;
  username: string;
  time: string;
  tag?: string;
  tagClassName?: string;
  content: string;
  upvotes?: number;
  comments?: number;
}

const CommentCard: React.FC<CommentProps> = ({
  topic,
  username,
  time,
  tag,
  tagClassName,
  content,
  upvotes = 0,
  comments = 0,
}) => {
  return (
    <div className={styles.commentWrapper}>
      {topic && <h3 className={styles.topic}>{topic}</h3>}
      <div className={styles.commentContent}>
        <div className={styles.userWrapper}>
          <div className={styles.userName}>
            <div className={styles.userIcon}>
              <Image src={userIcon} alt={`${username}'s avatar`} />
            </div>
            <span>
              {username} • {time}
            </span>
          </div>
          {tag && (
            <div
              className={`${styles.userTag} ${
                tagClassName ? styles[tagClassName] : ''
              }`}
            >
              {tag}
            </div>
          )}
        </div>
        <p>{content}</p>
      </div>
      <div className={styles.commentFooter}>
        <div className={styles.voteContainer}>
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
        <div className={styles.commentContainer}>
          <Image
            src={commentIcon}
            className={styles.commentIcon}
            alt="Comment"
          />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;