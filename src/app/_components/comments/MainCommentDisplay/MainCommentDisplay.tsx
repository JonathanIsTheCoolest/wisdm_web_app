import Image from "next/image"
import { Comment } from "@/types"
import React from "react"

import userImageFallback from '@/assets/icons/user_avatar.svg'

interface MainCommentDisplayProps {
  comment: Comment
}

const MainCommentDisplay: React.FC<MainCommentDisplayProps> = ({comment}) => {
  const { 
    created_at, parent_comment_id, comment_id, comment_index,
    reference_id, thread_id, user_photo_url, body, deleted,
    updated_at, username, vote_count, comment_count, vote
  } : Comment = comment

  return (
    <div
      style={{
        "display": 'flex',
        "justifyContent": 'center',
        "alignItems": 'center',
        "padding": '20px 0',
        "margin": '0 0 20px 0',
        "borderBottom": '1px lightblue solid',
      }}
    >
      <Image 
        src={user_photo_url ? user_photo_url : userImageFallback} 
        alt={`image for ${username}`}
        width={50}
        height={50}
      />
      <p>{body}</p>
    </div>
  )
}

export default MainCommentDisplay