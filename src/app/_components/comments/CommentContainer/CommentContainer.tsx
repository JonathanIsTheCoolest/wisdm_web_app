"use client";

import React, { useEffect, useReducer, useState } from "react";

import { socket } from "@/app/_lib/socket/socket";

// Redux
import { useAppDispatch } from "@/redux_lib/hooks";
import { apiHTTPWrapper } from "@/redux_lib/features/authSlice";

// Components
import RecursiveCommentDisplay from "../RecursiveCommentDisplay/RecursiveCommentDisplay";
import RootCommentInput from "../RootCommentInput/RootCommentInput";
import LoadingComments from "../../loading/LoadingComments/LoadingComments";

import MainCommentDisplay from "../MainCommentDisplay/MainCommentDisplay";

import { commentReducer, INIT_COMMENT_THREAD, CommentOrder } from "./commentReducer";

import { CommentThread } from "@/types";

import styles from '@/app/_components/comments/CommentContainer/CommentContainer.module.scss'

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface CommentContainerProps {
  threadId: string;
  rootCommentId: string;
  displayMainComment?: boolean;
}

interface ButtonProp {
  name: CommentOrder;
  text: string;
}

const CommentContainer: React.FC<CommentContainerProps> = ({ threadId, rootCommentId, displayMainComment = false }) => {
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    INIT_COMMENT_THREAD
  );
  const [orderBy, setOrderBy] = useState<CommentOrder>('DESC')
  const dispatch = useAppDispatch();

  const orderByButtonArray: ButtonProp[] = [{name: 'ASC', text: 'oldest'}, {name: 'DESC', text: 'newest'}]

  const handleGetComments = async (commentId: string, offset: number = 0, reset = false, cb = () => null) => {
    const url = `${BASE_API_URL}/comments/get/get_comment_thread?thread_id=${threadId}&start_comment_id=${commentId}&order_by=${orderBy}&offset=${offset}`
    try {
      const actionResult = await dispatch(
        apiHTTPWrapper({
          url: url,
        })
      );
      if (apiHTTPWrapper.fulfilled.match(actionResult)) {
        const result: CommentThread = actionResult.payload;
        commentDispatch({ type: "setThread", payload: {commentThread: result, order: orderBy, reset: reset } });
      } else {
        console.error("Failed to load comments:", actionResult.error);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
    } finally {
      cb()
    }
  }

  useEffect(() => {
    handleGetComments(rootCommentId, 0, true)
  }, [orderBy]);

  useEffect(() => {
    socket.on("receive_comment", (response) => {
      const { comment, parent_comment } = response;

      commentDispatch({
        type: "addComment",
        payload: {
          comment,
          parentComment: parent_comment,
          order: orderBy,
        },
      });
    });

    return () => {
      socket.off("receive_comment");
    };
  }, [orderBy]);

  useEffect(() => {
    socket.on("receive_comment_update", (response) => {
      const comment = response;

      commentDispatch({
        type: "updateComment",
        payload: {
          comment
        },
      });
    });

    return () => {
      socket.off("receive_comment_update");
    };
  }, []);

  return (
    <div
    id="comment_container"
    className={styles.commentContainer}
  >
    {
      !commentState.comments[rootCommentId] ?
      <LoadingComments additionalText="From your mom..."/> :
      <>
        {
          commentState.comments.root && displayMainComment &&
          <MainCommentDisplay comment={commentState.comments.root}/>
        }
        <h3>sort by:</h3>
        {
          orderByButtonArray.map((button) => {
            const { name, text } = button
            return (
              <button
                key={text}
                onClick={() => name !== orderBy ? setOrderBy(name) : null}
                style={{
                  opacity : orderBy === name ? 0.5 : 1
                }}
              >
                {text}
              </button>
            )
          })
        }
        {commentState.comments[rootCommentId] && (
          <RecursiveCommentDisplay
            commentsObject={commentState.comments}
            commentObject={commentState.comments[rootCommentId]}
            threadId={threadId}
            parentCollapsed={false}
            orderBy={orderBy}
            handleGetComments={handleGetComments}
            parentCommentCount={ rootCommentId === threadId ? commentState.root_comment_count : commentState.comments.root?.comment_count}
            commentId={rootCommentId}
          />
        )}
        <RootCommentInput threadId={threadId} parentCommentId={rootCommentId}/>
      </>
    }
  </div>
  )
};

export default CommentContainer;