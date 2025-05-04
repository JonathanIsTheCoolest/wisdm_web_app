import React from "react";
import CommentInput from "../CommentInput/CommentInput";
import styles from "./NestedCommentInput.module.scss";

interface NestedCommentInputProps {
  parentCommentId: string;
  isReplying: boolean;
  threadId: string;
  threadType: string;
}

const NestedCommentInput: React.FC<NestedCommentInputProps> = ({
  parentCommentId,
  isReplying,
  threadId,
  threadType
}) => {
  return (
    <div>
      <div
        className={`${styles.commentContainer} ${
          isReplying ? styles.show : styles.hide
        }`}
      >
        <CommentInput
          parentCommentId={parentCommentId}
          threadId={threadId}
          placeholder="⬆ Reply to this comment ⬆"
          threadType={threadType}
        />
      </div>
    </div>
  );
};

export default NestedCommentInput;
