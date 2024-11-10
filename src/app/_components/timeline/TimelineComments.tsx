// REWRITE COMPONENT INTO ONE WITH ALL THE OTHERS
"use client";

// System Imports
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

// Component Imports
import Draggable from "react-draggable";
import CommentCard from "@/app/_components/cards/CommentCard";

// Stylesheet Imports
import styles from "@/app/_components/timeline/TimelineComments.module.scss";

// Asset Imports
import { Comment, CommentThread } from "@/types";
import { RootState } from "@/lib/store";

import { socket } from "@/app/_lib/socket";
import { apiSocketWrapper } from "@/lib/features/authSlice";

import { apiHTTPWrapper } from "@/lib/features/authSlice";

import nextImg from "public/next.svg";
import Image from "next/image";

interface TimelineCommentsProps {
  onClose: () => void;
}

const TimelineComments: React.FC<TimelineCommentsProps> = ({ onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [commentThread, setCommentThread] = useState<CommentThread | null>(
    null
  );
  const [sortBy, setSortBy] = useState<"top" | "newest">("top");
  const [newComment, setNewComment] = useState("");

  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadComments = async () => {
      try {
        const actionResult = await dispatch(
          apiHTTPWrapper({
            url: `http://127.0.0.1:5000/api/comments/get/get_comment_thread?thread_id=${user.currentChannel}`,
          })
        );
        if (apiHTTPWrapper.fulfilled.match(actionResult)) {
          const result = actionResult.payload;
          setCommentThread(result);
        } else {
          console.error("Failed to load comments:", actionResult.error);
        }
      } catch (error) {
        console.error("Error loading comments:", error);
      }
    };

    loadComments();
  }, [sortBy]);

  const handleDrag = (_: any, ui: { y: number }) => {
    setPosition({ x: 0, y: ui.y });
  };

  const handleStop = () => {
    if (position.y > 100) {
      onClose();
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const onClickPostComment = () => {
    dispatch(
      apiSocketWrapper({
        cb: (args: object) => {
          socket.emit("send_message", args);
        },
        args: {
          room: user.currentChannel,
          thread_id: user.currentChannel,
          body: newComment,
          parent_comment_id: null,
          reference_id: null,
        },
      })
    );
  };

  useEffect(() => {
    socket.on("receive_message", (response) => {
      console.log(response);
    });
  }, []);

  return (
    <Draggable
      axis="y"
      bounds="parent"
      position={position}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div className={styles.commentsContainer} style={{ overflow: "scroll" }}>
        <div className={styles.dragHandle} />
        <TimelineCommentsHeader sortBy={sortBy} onSortChange={setSortBy} />
        {commentThread &&
          Object.keys(commentThread.comments).map((commentId) => {
            const comment: Comment = commentThread.comments[commentId];

            return (
              <div key={commentId}>
                <Image
                  src={comment.user_photo_url || nextImg}
                  alt={`${comment.username}'s user photo`}
                  width={"50"}
                  height={"50"}
                  style={{ border: "1px black", borderRadius: "50%" }}
                />
                <p>{comment.body}</p>
                <p>By: {comment.username}</p>
                <p>Posted on: {comment.created_at}</p>
              </div>
            );
          })}
        <div>
          <input
            type="text"
            value={newComment}
            placeholder="join the conversation"
            onChange={(e) => setNewComment(e.target.value)}
          ></input>
          <button onClick={onClickPostComment}>Submit</button>
        </div>
      </div>
    </Draggable>
  );
};

const TimelineCommentsHeader: React.FC<{
  sortBy: string;
  onSortChange: (sort: "top" | "newest") => void;
}> = ({ sortBy, onSortChange }) => (
  <div className={styles.commentsHeader}>
    <h3>Comments</h3>
    <div className={styles.sortOptions}>
      <button
        className={`${styles.tagButton} ${
          sortBy === "top" ? styles.active : ""
        }`}
        onClick={() => onSortChange("top")}
      >
        Top
      </button>
      <button
        className={`${styles.tagButton} ${
          sortBy === "newest" ? styles.active : ""
        }`}
        onClick={() => onSortChange("newest")}
      >
        Newest
      </button>
    </div>
  </div>
);

// const TimelineCommentsList: React.FC<{ comments: Comment[] }> = ({ comments }) => (
//   <div className={styles.commentsContent}>
//     {comments.length && comments.map((comment) => (
//       <CommentCard key={comment.id} {...comment} />
//     ))}
//   </div>
// );

export default TimelineComments;
