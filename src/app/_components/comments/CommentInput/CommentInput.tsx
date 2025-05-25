import React, { useState } from "react";
import { useAppDispatch } from "@/redux_lib/hooks";
import { apiSocketWrapper } from "@/redux_lib/features/authSlice";
import { socket } from "@/app/_lib/socket/socket";
import Image from "next/image";
import commentSVG from "@/assets/icons/comment.svg";
import styles from "@/app/_components/comments/CommentInput/CommentInput.module.scss";
import { useAppSelector } from "@/redux_lib/hooks";
import { standardizedPath } from "@/app/_lib/helper/navigation/path";

interface CommentInputProps {
  threadId: string;
  parentCommentId?: string;
  placeholder?: string;
  inputStyles?: object;
  threadType: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
  threadId,
  parentCommentId = null,
  placeholder = "Join the conversation",
  inputStyles,
  threadType
}) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.user.username)
  const [newComment, setNewComment] = useState("");

  const path = standardizedPath()

  const postComment = () => {
    dispatch(
      apiSocketWrapper({
        cb: (args: object) => {
          socket.emit("send_comment", args);
        },
        args: {
          room: threadId,
          thread_id: threadId,
          reference_type: threadType,
          body: newComment,
          parent_id: parentCommentId,
          reference_id: null,
          username: username,
          path: path
        },
      })
    );
    setNewComment("");
  };

  const onClickPostComment = (e: React.MouseEvent) => {
    e.preventDefault();
    if (newComment.length) {
      postComment();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newComment.length) {
      postComment();
    }
  };

  return (
    <label className={styles.labelContainer}>
      <input
        name="newComment"
        type="text"
        value={newComment}
        placeholder={placeholder}
        onChange={({ target: { value } }) => setNewComment(value)}
        className={styles.inputField}
        style={{
          fontSize: '16px',
          border: '1px solid',
          ...inputStyles,
        }}
        onKeyDown={handleKeyDown}
      />

      <Image
        onClick={onClickPostComment}
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
