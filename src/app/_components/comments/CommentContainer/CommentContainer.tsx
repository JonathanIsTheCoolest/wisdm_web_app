"use client";

import React, { useEffect, useReducer } from "react";

import { socket } from "@/app/_lib/socket/socket";

// Redux
import { useAppDispatch } from "@/lib/hooks";
import { apiHTTPWrapper } from "@/lib/features/authSlice";

// Components
import RecursiveCommentDisplay from "../RecursiveCommentDisplay/RecursiveCommentDisplay";
import RootCommentInput from "../RootCommentInput/RootCommentInput";

import { commentReducer, INIT_COMMENT_THREAD } from "./commentReducer";

import { CommentThread } from "@/types";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

interface CommentContainerProps {
  threadId: string;
}

const CommentContainer: React.FC<CommentContainerProps> = ({ threadId }) => {
  const [commentState, commentDispatch] = useReducer(
    commentReducer,
    INIT_COMMENT_THREAD
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loadComments = async () => {
      try {
        const actionResult = await dispatch(
          apiHTTPWrapper({
            url: `${BASE_API_URL}/comments/get/get_comment_thread?thread_id=${threadId}`,
          })
        );
        if (apiHTTPWrapper.fulfilled.match(actionResult)) {
          const result: CommentThread = actionResult.payload;
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
    socket.on("receive_message", (response) => {
      const comment = response.comment;

      commentDispatch({
        type: "addComment",
        payload: {
          comment,
        },
      });
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div
      id="comment_container"
      style={{
        position: "relative",
      }}
    >
      {commentState.comments.root && (
        <RecursiveCommentDisplay
          commentsObject={commentState.comments}
          commentObject={commentState.comments.root}
          threadId={threadId}
          parentCollapsed={false}
        />
      )}
      <RootCommentInput threadId={threadId} />
    </div>
  );
};

export default CommentContainer;
