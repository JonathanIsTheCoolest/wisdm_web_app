import React from "react"
import { useAppSelector } from "@/src/lib/hooks"
import userDefaultImage from '@/src/assets/icons/user_avatar.svg'
import Image from "next/image"
import styles from './RootCommentInput.module.scss'

import CommentInput from "../CommentInput/CommentInput"

interface RootCommentInputProps {
  threadId: string;
}

const RootCommentInput: React.FC<RootCommentInputProps> = ({ threadId }) => {
  const user = useAppSelector((state) => state.user)

  return (
    <div className={styles.container}>
      <Image 
        src={userDefaultImage} 
        alt={`${user.username}'s user photo`}
        width={50}
        height={50}
        className={styles.userImage}
      />
      <CommentInput
        threadId={threadId}
      />
    </div>
  )
}

export default RootCommentInput