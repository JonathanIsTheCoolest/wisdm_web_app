import React, { useEffect, useState, Dispatch } from "react";
import { Comment } from "@/types";
import Image from "next/image";
import userDefaultImage from "@/assets/icons/user_avatar.svg";
import { getElapsedTime } from "@/app/_lib/helper/time/getElapsedTime";
import { CommentActions } from "../CommentContainer/commentReducer"; 

import commentSVG from "@/assets/icons/comment.svg";
import styles from "./CommentBody.module.scss";

import VoteContainer from "../VoteContainer/VoteContainer";
import NestedCommentInput from "../NestedCommentInput/NestedCommentInput";

import { standardizePathAnchorIds } from "@/app/_lib/helper/navigation/path";

interface CommentBodyProps {
  comment: Comment;
  threadId: string;
  commentDispatch: Dispatch<CommentActions>
  threadType: string;
}

const CommentBody: React.FC<CommentBodyProps> = ({
  comment,
  threadId,
  commentDispatch,
  threadType
}) => {
  const {
    body,
    user_photo_url,
    vote_count,
    vote,
    username,
    created_at,
    id,
    comment_count
  } = comment;
  const [elapsedTime, setElapsedTime] = useState(getElapsedTime(created_at));
  const [isReplying, setIsReplying] = useState<boolean>(false);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setElapsedTime(getElapsedTime(created_at));
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [created_at]);

  return (
    <div id={standardizePathAnchorIds(id)} className={styles.commentBodyContainer}>
      <div className={styles.commentAvatar}>
        <Image
          id={id}
          src={user_photo_url || userDefaultImage}
          alt={`${username}'s user photo`}
          width={50}
          height={50}
          className={styles.userPhoto}
        />
      </div>
      <div className={styles.commentContainer}>
        <div className={styles.commentHeader}>
          <div className={styles.usernameElapsed}>
            {username} · {elapsedTime}
          </div>
        </div>
        <div className={styles.commentContent}>
          <div className={styles.commentText}>{body}</div>
          <div className={styles.commentFooter}>
            <VoteContainer 
              threadId={threadId} 
              comment={comment}
              commentDispatch={commentDispatch} 
            />
            <div className={styles.commentIconContainer}>
              <Image
                src={commentSVG}
                alt="nested comment total"
                height={20}
                width={20}
                className={styles.commentIcon}
                onClick={() => setIsReplying((prev) => (prev ? false : true))}
              />
              <div className={styles.commentCount}>{comment_count}</div>
            </div>
          </div>
          <NestedCommentInput
            threadId={threadId}
            isReplying={isReplying}
            parentCommentId={id}
            threadType={threadType}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentBody;
