'use client';

import React, { useState } from 'react';
import Draggable from 'react-draggable';
import CommentCard from '@/app/_components/comments/CommentCard';
import styles from '@/styles/dashboard/timeline/Timeline.module.scss';

import { comments } from '@/assets/placeholderData.json';

const Comments = ({ onClose }: { onClose: () => void }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: any, ui: any) => {
    const { y } = ui;
    setPosition({ x: 0, y });
  };

  const handleStop = () => {
    if (position.y > 100) {
      onClose();
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  return (
    <Draggable axis="y" bounds="parent" position={position} onDrag={handleDrag} onStop={handleStop}>
      <div className={styles.commentsContainer}>
        <div className={styles.dragHandle}></div>
        <div className={styles.commentsHeader}>
          <h3>Comments</h3>
          <div className={styles.sortOptions}>
            <button>Top</button>
            <button>Newest</button>
          </div>
        </div>
        <div className={styles.commentsContent}>
          {comments.map((comment, index) => (
            <CommentCard
              key={index}
              username={comment.username}
              time={comment.time}
              tag={comment.tag}
              tagClassName={comment.tagClassName}
              content={comment.content}
              upvotes={comment.upvotes}
              comments={comment.comments}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
};

export default Comments;
