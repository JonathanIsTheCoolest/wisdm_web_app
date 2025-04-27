import React from "react";
import { useAppSelector } from "@/redux_lib/hooks";
import userDefaultImage from "@/assets/icons/user_avatar.svg";
import Image from "next/image";
import styles from "./RootCommentInput.module.scss";

import CommentInput from "../CommentInput/CommentInput";

interface RootCommentInputProps {
  threadId: string;
  parentCommentId: string;
  threadType: string;
}

const RootCommentInput: React.FC<RootCommentInputProps> = ({ threadId, parentCommentId, threadType }) => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <Image
        src={user.photo_url || userDefaultImage}
        alt={`${user.username}'s user photo`}
        width={50}
        height={50}
        className={styles.userImage}
      />
      <CommentInput threadId={threadId} parentCommentId={parentCommentId} threadType={threadType}/>
    </div>
  );
};

export default RootCommentInput;
