// REWRITE COMPONENT INTO ONE WITH ALL THE OTHERS
'use client';

// System Imports
import React, { useState, useEffect } from 'react';

// API/Database Imports
// import { fetchComments } from '@/app/_lib/actions';

// Component Imports
import Draggable from 'react-draggable';
import CommentCard from '@/app/_components/cards/CommentCard';

// Stylesheet Imports
import styles from '@/app/_components/timeline/TimelineComments.module.scss';

// Asset Imports
import { Comment } from '@/types';

interface TimelineCommentsProps {
  onClose: () => void;
}

const TimelineComments: React.FC<TimelineCommentsProps> = ({ onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortBy, setSortBy] = useState<'top' | 'newest'>('top');

  // useEffect(() => {
  //   const loadComments = async () => {
  //     const fetchedComments = await fetchComments(sortBy);
  //     setComments(fetchedComments);
  //   };
  //   loadComments();
  // }, [sortBy]);

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

  return (
    <Draggable axis="y" bounds="parent" position={position} onDrag={handleDrag} onStop={handleStop}>
      <div className={styles.commentsContainer}>
        <div className={styles.dragHandle} />
        <TimelineCommentsHeader sortBy={sortBy} onSortChange={setSortBy} />
        <TimelineCommentsList comments={comments} />
      </div>
    </Draggable>
  );
};

const TimelineCommentsHeader: React.FC<{ sortBy: string; onSortChange: (sort: 'top' | 'newest') => void }> = ({ sortBy, onSortChange }) => (
  <div className={styles.commentsHeader}>
    <h3>Comments</h3>
    <div className={styles.sortOptions}>
      <button className={`${styles.tagButton} ${sortBy === 'top' ? styles.active : ''}`} onClick={() => onSortChange('top')}>
        Top
      </button>
      <button className={`${styles.tagButton} ${sortBy === 'newest' ? styles.active : ''}`} onClick={() => onSortChange('newest')}>
        Newest
      </button>
    </div>
  </div>
);

const TimelineCommentsList: React.FC<{ comments: Comment[] }> = ({ comments }) => (
  <div className={styles.commentsContent}>
    {comments.map((comment) => (
      <CommentCard key={comment.id} {...comment} />
    ))}
  </div>
);

export default TimelineComments;
