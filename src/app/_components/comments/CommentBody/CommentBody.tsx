import React, { useEffect, useState } from "react";
import { Comment } from "@/src/types";
import Image from "next/image";
import userDefaultImage from '@/src/assets/icons/user_avatar.svg';
import { getElapsedTime } from "@/src/app/_lib/getElapsedTime";

import commentSVG from '@/src/assets/icons/comment.svg';
import styles from './CommentBody.module.scss';

import VoteContainer from "../VoteContainer/VoteContainer";
import NestedCommentInput from "../NestedCommentInput/NestedCommentInput";

interface CommentBodyProps {
  comment: Comment;
  threadId: string;
  comment_count: number;
}

const CommentBody: React.FC<CommentBodyProps> = ({ comment, threadId, comment_count }) => {
  const { body, user_photo_url, vote_count, vote, username, created_at, comment_id } = comment;
  const [elapsedTime, setElapsedTime] = useState(getElapsedTime(created_at));
  const [ isReplying, setIsReplying ] = useState<boolean>(false)

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setElapsedTime(getElapsedTime(created_at));
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [created_at]);

  return (
    <div className={styles.commentBody}>
      <div className={styles.commentHeader}>
        <Image
          id={comment_id}
          src={user_photo_url || userDefaultImage} 
          alt={`${username}'s user photo`}
          width={50}
          height={50}
          className={styles.userPhoto}
        />
        <div className={styles.usernameElapsed}>{username} · {elapsedTime}</div>
      </div>
      <div className={styles.commentContent}>
        <div className={styles.commentText}>{body}</div>
        <div className={styles.commentFooter}>
          <VoteContainer
            vote={vote}
            vote_count={vote_count}
            comment_id={comment_id}
          />
          <Image
            src={commentSVG}
            alt="nested comment total"
            height={20}
            width={20}
            className={styles.commentIcon}
            onClick={() => setIsReplying((prev) => prev ? false : true)}
          />
          <div className={styles.commentCount}>{comment_count}</div>
        </div>
        <NestedCommentInput
          threadId={threadId}
          isReplying={isReplying}
          parentCommentId={comment_id}
        />
      </div>
    </div>
  );
};

export default CommentBody;