import React, { useRef, useState } from "react"

import { socket } from "@/src/app/_lib/socket"

import { useAppDispatch, useAppSelector } from "@/src/lib/hooks"

import { apiSocketWrapper } from "@/src/lib/features/authSlice"

import userDefaultImage from '@/src/assets/icons/user_avatar.svg'

import commentSVG from '@/src/assets/icons/comment.svg'

import Image from "next/image"

interface CommentInputProps {
  threadId: string;
}

const CommentInput: React.FC<CommentInputProps> = ({ threadId }) => {
  const dispatch = useAppDispatch()
  const user =  useAppSelector((state) => state.user)
  const [ newComment, setNewComment ] = useState('')


  const onClickPostComment = () => {
    dispatch(apiSocketWrapper({
      cb: (args: object) => {
        socket.emit('send_message', args);
      },
      args: {
        room: threadId,
        thread_id: threadId,
        body: newComment,
        parent_comment_id: null,
        reference_id: null,
      }
    }));
    setNewComment('')
  };

  return (
<div 
  style={{
    position: 'sticky',
    bottom: '10px',
    display: 'flex',
    flexWrap: 'nowrap',
    width: 'calc(100% - 10px)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  }}
>
  <Image 
    src={userDefaultImage} 
    alt={`${user.username}'s user photo`}
    width={'50'}
    height={'50'}
    style={{
      border: '1px solid black',
      borderRadius: '50%', 
      marginRight: '5px'
    }}
  />
  
  <label 
    htmlFor="newComment" 
    style={{
      width: '100%', 
      position: 'relative',
      display: 'flex', 
      alignItems: 'center'
    }}
  >
    <input 
      id="newComment" 
      name="newComment"
      type="text"
      value={newComment}
      placeholder="Join the conversation"
      onChange={({ target: { value } }) => setNewComment(value)}
      style={{
        width: '100%',
        paddingRight: '35px', // Adds space for the icon inside the input
        borderRadius: '15px',
        padding: '10px'
      }}
    />
    
    <Image
      onClick={() => newComment.length && onClickPostComment()}
      src={commentSVG} 
      alt={'send comment button'}
      width={'25'}
      height={'25'}
      style={{
        borderRadius: '50%', 
        position: 'absolute',
        right: '10px', 
        top: '50%', 
        transform: 'translateY(-50%)', // Centers the icon vertically in the input
        backgroundColor: 'greenyellow',
        transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
        opacity: newComment.length ? 1 : 0,
        cursor: newComment.length ? 'pointer' : 'text',
      }}
    />
  </label>
</div>

  )
}

export default CommentInput