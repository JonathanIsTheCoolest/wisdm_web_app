import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { apiSocketWrapper } from "@/lib/features/authSlice";
import { socket } from "@/app/_lib/socket/socket";
import Image from "next/image";
import commentSVG from "@/assets/icons/comment.svg";
import styles from "@/app/_components/comments/CommentInput/CommentInput.module.scss";

interface CommentInputProps {
  threadId: string;
  parentCommentId?: string;
  placeholder?: string;
  inputStyles?: object;
}

const CommentInput: React.FC<CommentInputProps> = ({
  threadId,
  parentCommentId = null,
  placeholder = "Join the conversation",
  inputStyles,
}) => {
  const dispatch = useAppDispatch();
  const [newComment, setNewComment] = useState("");

  const onClickPostComment = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      apiSocketWrapper({
        cb: (args: object) => {
          socket.emit("send_comment", args);
        },
        args: {
          room: threadId,
          thread_id: threadId,
          body: newComment,
          parent_comment_id: parentCommentId,
          reference_id: null,
        },
      })
    );
    setNewComment("");
  };

  return (
    <label htmlFor="newComment" className={styles.labelContainer}>
      <input
        // id="newComment"
        name="newComment"
        type="text"
        value={newComment}
        placeholder={placeholder}
        onChange={({ target: { value } }) => setNewComment(value)}
        className={styles.inputField}
        style={{
          ...inputStyles,
        }}
      />

      <Image
        onClick={(e) => newComment.length && onClickPostComment(e)}
        src={commentSVG}
        alt="send comment button"
        width={25}
        height={25}
        className={`${styles.sendIcon} ${
          newComment.length ? styles.sendIconActive : ""
        }`}
      />
    </label>
  );
};

export default CommentInput;
