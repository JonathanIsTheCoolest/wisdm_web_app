"use client";

import React, { useEffect, useReducer } from "react";

import { socket } from "@/app/_lib/socket/socket";

// Redux
import { useAppDispatch } from "@/redux_lib/hooks";
import { apiHTTPWrapper } from "@/redux_lib/features/authSlice";

// Components
import RecursiveCommentDisplay from "../RecursiveCommentDisplay/RecursiveCommentDisplay";
import RootCommentInput from "../RootCommentInput/RootCommentInput";

import MainCommentDisplay from "../MainCommentDisplay/MainCommentDisplay";

import { commentReducer, INIT_COMMENT_THREAD } from "./commentReducer";

import { CommentThread } from "@/types";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface CommentContainerProps {
  threadId: string;
  commentThreadRootName: string
}

const CommentContainer: React.FC<CommentContainerProps> = ({ threadId, commentThreadRootName }) => {
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    INIT_COMMENT_THREAD
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('commentThreadRootId')
    console.log(commentThreadRootName )
    const url = `${BASE_API_URL}/comments/get/get_comment_thread?thread_id=${threadId}&start_comment_id=${commentThreadRootName}`
    const loadComments = async () => {
      try {
        const actionResult = await dispatch(
          apiHTTPWrapper({
            url: url,
          })
        );
        if (apiHTTPWrapper.fulfilled.match(actionResult)) {
          const result: CommentThread = actionResult.payload;
          console.log(result);
          commentDispatch({ type: "setThread", payload: result });
        } else {
          console.error("Failed to load comments:", actionResult.error);
        }
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    };

    loadComments();
  }, []);

  useEffect(() => {
    socket.on("receive_comment", (response) => {
      const comment = response.comment;

      commentDispatch({
        type: "addComment",
        payload: {
          comment,
        },
      });
    });

    return () => {
      socket.off("receive_comment");
    };
  }, []);

  useEffect(() => {
    socket.on("receive_comment_update", (response) => {
      const comment = response;

      commentDispatch({
        type: "updateComment",
        payload: {
          comment,
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
      style={{
        position: "relative",
      }}
    >
      {
        commentState.comments.root &&
        <MainCommentDisplay comment={commentState.comments.root}/>
      }
      {commentState.comments[commentThreadRootName] && (
        <RecursiveCommentDisplay
          commentsObject={commentState.comments}
          commentObject={commentState.comments[commentThreadRootName]}
          threadId={threadId}
          parentCollapsed={false}
        />
      )}
      <RootCommentInput threadId={threadId} />
    </div>
  );
};

export default CommentContainer;
