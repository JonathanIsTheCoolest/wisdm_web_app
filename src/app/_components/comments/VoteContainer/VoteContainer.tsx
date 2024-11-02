import React from "react";

import Image from "next/image";
import upVote from '@/src/assets/icons/upvote.svg';

import styles from '@/src/app/_components/comments/VoteContainer/VoteContainer.module.scss'

interface VoteContainerProps {
  vote: boolean | null;
  vote_count: number;
  comment_id: string;
}

const VoteContainer: React.FC<VoteContainerProps> = ({ 
    vote, 
    vote_count,
    comment_id
  }) => {

  return (
    <div>
      <Image
        src={upVote}
        alt="up vote arrow"
        height={20}
        width={20}
        className={styles.voteArrow}
      />
      <span className={styles.voteCount}>{vote_count}</span>
      <Image
        src={upVote}
        alt="down vote arrow"
        height={20}
        width={20}
        className={`${styles.voteArrow} ${styles.downvote}`}
      />
    </div>
  )
}

export default VoteContainer