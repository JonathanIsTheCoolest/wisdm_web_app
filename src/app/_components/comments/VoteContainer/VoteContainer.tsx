import React, { useState, useEffect } from "react";

import Image from "next/image";
import upVote from "@/assets/icons/upvote.svg";
import upVoteFill from "@/assets/icons/upvote_fill.svg";
import styles from "@/app/_components/comments/VoteContainer/VoteContainer.module.scss";

import { useAppDispatch } from "@/redux_lib/hooks";
import { apiSocketWrapper } from "@/redux_lib/features/authSlice";
import { socket } from "@/app/_lib/socket/socket";

import { Comment } from "@/types";
import { standardizedPath } from "@/app/_lib/helper/navigation/path";

interface VoteContainerProps {
  threadId: string;
  comment: Comment;
}

const VoteContainer: React.FC<VoteContainerProps> = ({ threadId, comment }) => {
  const dispatch = useAppDispatch();
  const { vote, vote_count, comment_id } = comment;
  const [isBouncing, setIsBouncing] = useState(false);

  const path = standardizedPath()

  const onClickUpdateVote = (e: React.MouseEvent, newValue: boolean | null) => {
    e.preventDefault();
    if (!isBouncing) {
      setIsBouncing(true);
      console.log('COMMENT ID')
      console.log(comment_id)
      console.log('')
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

  useEffect(() => {
    socket.on("receive_vote_update_success", (response) => {
      const { comment_id: id, status } = response;

      console.log('COMMENT ID')
      console.log(comment_id)
      console.log('RESPONSE COMMENT ID')
      console.log(id)
      console.log('')
      if (id === comment_id) {
        setIsBouncing(false);
      }
    });
    return () => {
      socket.off("receive_vote_update_success");
    };
  }, []);
  return (
    <div
      className={styles.voteContainer}
      style={{
        opacity: isBouncing ? 0.5 : 1,
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
      <span className={styles.voteCount}>{vote_count}</span>
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
