import React from 'react';
import styles from '@/styles/components/comments/Comment.module.scss';

interface CommentProps {
  topic?: string;
  username: string;
  time: string;
  tag?: string;
  content: string;
  upvotes?: number;
  comments?: number;
}

const CommentCard: React.FC<CommentProps> = ({
  topic,
  username,
  time,
  tag,
  content,
  upvotes,
  comments
}) => {
  return (
    <div className={styles.commentWrapper}>
      {topic && <h3>{topic}</h3>}
      <div className={styles.commentContent}>
        <div className={styles.userWrapper}>
          <div className={styles.userName}>
            <div className={styles.userIcon}></div> {/* TODO: Add user icon */}
            <span>{username} • {time}</span>
          </div>
          {tag && <div className={styles.userTag}>{tag}</div>}
        </div>
        <p>{content}</p>
      </div>
      {(upvotes !== undefined || comments !== undefined) && (
        <div className={styles.commentFooter}>
          {upvotes !== undefined && (
            <div>
              <span>👍 {upvotes} 👎</span>
            </div>
          )}
          {comments !== undefined && (
            <div>
              <span>💬 {comments}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentCard;