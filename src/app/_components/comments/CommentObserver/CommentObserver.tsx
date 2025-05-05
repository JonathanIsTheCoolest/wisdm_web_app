import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";

import { HandleGetComments } from "../RecursiveCommentDisplay/RecursiveCommentDisplay";

type CommentObserverProps = {
  onIntersect: HandleGetComments;
  index: number;
  currentCommentObjectLength: number;
  parent_comment_count: number;
  parent_id: string | any;
  body?: string;
  rootMargin?: string;
  threshold?: number | number[];
  children: React.ReactNode;
  isLoadingMoreComments: boolean;
  setIsLoadingMoreComments: Dispatch<SetStateAction<boolean>>
};

const CommentObserver: React.FC<CommentObserverProps> = ({
  onIntersect,
  index,
  currentCommentObjectLength,
  parent_id,
  parent_comment_count,
  body,
  rootMargin = "25px",
  threshold = 0.1,
  children,
  isLoadingMoreComments,
  setIsLoadingMoreComments
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (index !== currentCommentObjectLength - 11 || parent_comment_count <= currentCommentObjectLength ) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoadingMoreComments) {
          setIsLoadingMoreComments(true)
          onIntersect(
            parent_id, 
            currentCommentObjectLength, 
            false, 
            () => setIsLoadingMoreComments(false)
          );
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin, threshold, onIntersect]);

  return ( 
    <div ref={ref}>
      {children}
    </div>
  );
};

export default CommentObserver;