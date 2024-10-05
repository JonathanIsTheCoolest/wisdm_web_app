import React from "react";
import styles from "@/styles/components/profile/CommentsTab.module.scss";
import { Comment } from "@/types";
import CommentCard from "@/app/_components/comments/CommentCard";

interface CommentsTabProps {
  comments: Comment[];
}

const CommentsTab: React.FC<CommentsTabProps> = ({ comments }) => {
  return (
    <div className={styles.commentsTab}>
      {comments.map((comment, index) => (
        <CommentCard key={index} {...comment} />
      ))}
    </div>
  );
};

export default CommentsTab;