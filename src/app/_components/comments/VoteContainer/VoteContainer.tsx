import React from "react";

import Image from "next/image";
import upVote from "@/assets/icons/upvote.svg";

import styles from "@/app/_components/comments/VoteContainer/VoteContainer.module.scss";

import { useAppDispatch } from "@/lib/hooks";
import { apiSocketWrapper } from "@/lib/features/authSlice";
import { socket } from "@/app/_lib/socket/socket";

interface VoteContainerProps {
  threadId: string;
  vote: boolean | null;
  vote_count: number;
  comment_id: string;
}

const VoteContainer: React.FC<VoteContainerProps> = ({
  threadId,
  vote,
  vote_count,
  comment_id,
}) => {
  const dispatch = useAppDispatch()

  const onClickUpdateVote = (e: React.MouseEvent, newValue: boolean | null) => {
    e.preventDefault();
    dispatch(
      apiSocketWrapper({
        cb: (args: object) => {
          socket.emit("send_vote", args);
        },
        args: {
          room: threadId,
          thread_id: threadId,
          comment_id: comment_id,
          vote: newValue,
        },
      })
    );
  }
  return (
    <div>
      <Image
        src={upVote}
        alt="up vote arrow"
        height={20}
        width={20}
        className={styles.voteArrow}
        style={{'backgroundColor': vote ? 'green' : 'transparent'}}
        onClick={(e) => onClickUpdateVote(e, vote ? null : true)}
      />
      <span className={styles.voteCount}>{vote_count}</span>
      <Image
        src={upVote}
        alt="down vote arrow"
        height={20}
        width={20}
        className={`${styles.voteArrow} ${styles.downvote}`}
        style={{'backgroundColor': vote ? 'red' : 'transparent'}}
        onClick={(e) => onClickUpdateVote(e, vote === null ? false : null)}
      />
    </div>
  );
};

export default VoteContainer;
