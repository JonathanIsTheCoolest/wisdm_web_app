import React, { useState, useEffect } from "react";

import Image from "next/image";
import upVote from "@/assets/icons/upvote.svg";

import styles from "@/app/_components/comments/VoteContainer/VoteContainer.module.scss";

import { useAppDispatch } from "@/lib/hooks";
import { apiSocketWrapper } from "@/lib/features/authSlice";
import { socket } from "@/app/_lib/socket/socket";

import { Comment } from "@/types";

interface VoteContainerProps {
  threadId: string;
  comment: Comment;
}

const VoteContainer: React.FC<VoteContainerProps> = ({
  threadId,
  comment
}) => {
  const dispatch = useAppDispatch()
  const { vote, vote_count, comment_id } = comment
  const [ isBouncing, setIsBouncing ] = useState(false)

  const onClickUpdateVote = (e: React.MouseEvent, newValue: boolean | null) => {
    e.preventDefault();
    if (!isBouncing) {
      setIsBouncing(true)
      dispatch(
        apiSocketWrapper({
          cb: (args: object) => {
            socket.emit("send_vote_update", args);
          },
          args: {
            room: threadId,
            vote: newValue,
            comment
          },
        })
      );
    }
  }

  useEffect(() => {
    socket.on('receive_vote_update_success', (response) => {
      const { comment_id: id , status } = response

      if (id === comment_id) {
        setIsBouncing(false)
      }
    })
    return () => {
      socket.off('receive_vote_update_success')
    }
  }, [])
  return (
    <div
      style={{
        'opacity': isBouncing ? 0.5 : 1
      }}
    >
      <Image
        src={upVote}
        alt="up vote arrow"
        height={20}
        width={20}
        className={styles.voteArrow}
        style={{'backgroundColor': vote ? 'green' : 'transparent', 'cursor': 'pointer'}}
        onClick={(e) => onClickUpdateVote(e, vote ? null : true)}
      />
      <span className={styles.voteCount}>{vote_count}</span>
      <Image
        src={upVote}
        alt="down vote arrow"
        height={20}
        width={20}
        className={`${styles.voteArrow} ${styles.downvote}`}
        style={{'backgroundColor': vote === false ? 'red' : 'transparent', 'cursor': 'pointer'}}
        onClick={(e) => onClickUpdateVote(e, vote === false ? null : false)}
      />
    </div>
  );
};

export default VoteContainer;
