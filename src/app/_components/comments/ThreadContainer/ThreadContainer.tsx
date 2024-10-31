'use client';

// System Imports
import React, { useState, useRef, useEffect } from 'react';

// Component Imports
import Draggable from 'react-draggable';
import CommentContainer from '../CommentContainer/CommentContainer';

// Stylesheet Imports
import styles from '@/src/app/_components/comments/ThreadContainer/ThreadContainer.module.scss';

interface ThreadContainerProps {
  threadId: string | null | undefined;
  commentHeader?: string
}

const getThreadContainerHeight = () => window.innerHeight * 0.9

const DRAGGABLE_CONTAINER_HEIGHT = 40

const OPEN_POSITION_STATE = {
  x: 0,
  y: 0
};

const ThreadContainer: React.FC<ThreadContainerProps> = ({ threadId, commentHeader='Comments' }) => {
  const [containerHeight, setContainerHeight] = useState(getThreadContainerHeight())

  const OFFSET_Y_START_POSITION = containerHeight - DRAGGABLE_CONTAINER_HEIGHT

  const INIT_POSITION_STATE = {
    x: 0,
    y: OFFSET_Y_START_POSITION
  };

  const startYRef = useRef<null | number>(null)
  const [position, setPosition] = useState(INIT_POSITION_STATE);
  const draggableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateContainerHeight = () => {
      setContainerHeight(getThreadContainerHeight())
    }
    window.addEventListener('resize', updateContainerHeight)
    return () => {
      window.removeEventListener('resize', updateContainerHeight)
    }
  }, [])

  const handleStart = (_: any, ui: { y: number }) => {
    startYRef.current = ui.y
  }

  const handleDrag = (_: any, ui: { y: number }) => {
    setPosition({ x: 0, y: ui.y });
  };

  const handleStop = (_: any, ui: { y: number }) => {
    const movement: number = startYRef.current! - ui.y

    if (movement > 0) {
      setPosition(OPEN_POSITION_STATE);
    } else {
      setPosition(INIT_POSITION_STATE);
    }
    startYRef.current = null
  };

  return (
    <Draggable 
      axis="y" 
      bounds="parent" 
      position={position} 
      onStart={handleStart}
      onDrag={handleDrag} 
      onStop={handleStop}
      nodeRef={draggableRef}
      handle='.draggable'
    >
      <div 
        className={styles.outerDragContainer}
        style={{ height: containerHeight }}
      >
        <div
          ref={draggableRef}
          className={`draggable ${styles.draggableTab}`}
          style={{
            'height': `${DRAGGABLE_CONTAINER_HEIGHT}px`,
            'cursor': 'grab'
          }}
        >
          <div className={styles.dragHandle}></div>
        </div>
        {/* Header */}
        <div
          className={styles.headerContainer}
        >
          <h2>{commentHeader}</h2>
        </div>
        {/* Comment Guidelines */}
        <div
          className={styles.commentGuidelines}
        >Keep comments respectful and follow out Community Guidelines!</div>
        {/* Comment */}
        <div
          className={styles.commentContainer}
        >
          { 
            threadId ? 
            <CommentContainer threadId={threadId}/> :
            'Oooops looks like we can\'t find the comment thread please refresh and try again'
          }
        </div> 
      </div>
    </Draggable>
  );
};

export default ThreadContainer;