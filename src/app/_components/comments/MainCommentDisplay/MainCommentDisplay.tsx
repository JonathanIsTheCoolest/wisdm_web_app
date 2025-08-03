import Image from "next/image"
import { Comment } from "@/types"
import React, {Dispatch} from "react"
import { CommentActions } from "../CommentContainer/commentReducer"

import { getElapsedTime } from "@/app/_lib/helper/time/getElapsedTime"
import VoteContainer from "../VoteContainer/VoteContainer"

import commentSVG from "@/assets/icons/comment.svg";
import userImageFallback from '@/assets/icons/user_avatar.svg'

interface MainCommentDisplayProps {
  comment: Comment,
  commentDispatch: Dispatch<CommentActions>
}

const MainCommentDisplay: React.FC<MainCommentDisplayProps> = ({comment, commentDispatch}) => {
  const { 
    created_at, parent_id, id, index,
    reference_id, thread_id, user_photo_url, body, deleted,
    updated_at, username, vote_count, comment_count, vote
  } : Comment = comment

  return (
    <div
      style={{
        "display": 'flex',
        "justifyContent": 'start',
        "alignItems": 'center',
        "padding": '20px 0',
        "margin": '30px 0 20px 0',
        "borderBottom": '1px var(--color-comment-font-detail) solid',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center'
        }}
      >
        <Image 
          src={user_photo_url ? user_photo_url : userImageFallback} 
          alt={`image for ${username}`}
          width={75}
          height={75}
          style={{
            borderRadius: '50%',
            margin: '0 10px 0 0'
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              margin: '0 0 10px 0'
            }}
          >
            {username} -
            <Image
              src={commentSVG}
              alt="comment bubble"
              width={25}
              height={25}
            />
            {comment_count} -
            <VoteContainer
              threadId={thread_id}
              comment={comment}
              commentDispatch={commentDispatch}
            />
          </div>
          {getElapsedTime(created_at)}
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default MainCommentDisplay;
