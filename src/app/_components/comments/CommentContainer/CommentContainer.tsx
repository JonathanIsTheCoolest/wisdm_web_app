'use client'

import React, { useEffect, useReducer } from "react"

// Redux
import { useAppSelector, useAppDispatch } from "@/src/lib/hooks"
import { apiHTTPWrapper } from "@/src/lib/features/authSlice"

// Components
import RecursiveCommentDisplay from "../RecursiveCommentDisplay/RecursiveCommentDisplay"
import CommentInput from "../CommentInput/CommentInput"

import { commentReducer, INIT_COMMENT_THREAD } from "./commentReducer"

import { CommentThread } from '@/src/types';

interface CommentContainerProps {
  threadId: string
}


const CommentContainer: React.FC<CommentContainerProps> = ({ threadId }) => {
  const [commentState, commentDispatch] = useReducer(commentReducer, INIT_COMMENT_THREAD)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const loadComments = async () => {
      try {
        const actionResult = await dispatch(apiHTTPWrapper({
          url: `http://127.0.0.1:5000/api/comments/get/get_comment_thread?thread_id=${threadId}`,
        }));
        if (apiHTTPWrapper.fulfilled.match(actionResult)) {
          const result: CommentThread = actionResult.payload;
          commentDispatch({type: 'setThread', payload: result})
        } else {
          console.error("Failed to load comments:", actionResult.error);
        }
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    };
  
    loadComments();
  }, []);

  return(
    <div>
      {
        commentState.comments.root && 
        RecursiveCommentDisplay(commentState.comments, commentState.comments.root)
      }
      <CommentInput threadId={threadId}/>
    </div>
  )
}

export default CommentContainer