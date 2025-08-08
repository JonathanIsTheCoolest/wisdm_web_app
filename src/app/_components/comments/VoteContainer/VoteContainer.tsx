import React, { useState, useEffect, Dispatch } from "react";

import Image from "next/image";
import upVote from "@/assets/icons/upvote.svg";
import upVoteFill from "@/assets/icons/upvote_fill.svg";
import styles from "@/app/_components/comments/VoteContainer/VoteContainer.module.scss";

import { useAppDispatch } from "@/redux_lib/hooks";
import { apiSocketWrapper } from "@/redux_lib/features/authSlice";
import { socket } from "@/app/_lib/socket/socket";

import { Comment } from "@/types";
import { CommentActions } from "../CommentContainer/commentReducer";
import { standardizedPath } from "@/app/_lib/helper/navigation/path";

interface VoteContainerProps {
  threadId: string;
  comment: Comment;
  commentDispatch: Dispatch<CommentActions>
}

const VoteContainer: React.FC<VoteContainerProps> = ({ threadId, comment, commentDispatch }) => {
  const dispatch = useAppDispatch();
  const { vote, is_vote_bouncing, upvote_count, downvote_count } = comment;

  const path = standardizedPath()

  const updateIsVoteBouncing = (isBouncing: boolean, comment: Comment) => {
    const newComment = {...comment, is_vote_bouncing: isBouncing}
    commentDispatch({
      type: 'updateComment', 
      payload: {
        comment: newComment
      }
    })
  }

  const onClickUpdateVote = (e: React.MouseEvent, newValue: boolean | null) => {
    e.preventDefault();
    if (!is_vote_bouncing) {
      updateIsVoteBouncing(true, comment)
      dispatch(
        apiSocketWrapper({
          cb: (args: object) => {
            socket.emit("send_vote_update", args);
          },
          args: {
            room: threadId,
            vote: newValue,
            comment,
            path: path
          },
        })
      );
    }
  };
  return (
    <div
      className={styles.voteContainer}
      style={{
        opacity: is_vote_bouncing ? 0.5 : 1,
      }}
    >
      <Image
        src={vote ? upVoteFill : upVote}
        alt="up vote arrow"
        height={20}
        width={20}
        className={styles.voteArrow}
        style={{
          cursor: "pointer",
        }}
        onClick={(e) => onClickUpdateVote(e, vote ? null : true)}
      />
      <span className={styles.voteCount}>{upvote_count-downvote_count}</span>
      <Image
        src={vote === false ? upVoteFill : upVote}
        alt="down vote arrow"
        height={20}
        width={20}
        className={`${styles.voteArrow} ${styles.downvote}`}
        style={{
          cursor: "pointer",
        }}
        onClick={(e) => onClickUpdateVote(e, vote === false ? null : false)}
      />
    </div>
  );
};

export default VoteContainer;
