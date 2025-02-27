import React, { useState, useEffect, useRef } from "react";
import { socket } from "@/app/_lib/socket/socket";
import { useAppSelector } from "@/redux_lib/hooks";

import { HandleGetComments } from "../RecursiveCommentDisplay/RecursiveCommentDisplay";

type CommentObserverProps = {
  onIntersect: HandleGetComments;
  index: number;
  currentCommentObjectLength: number;
  parent_comment_count: number;
  comment_id: string;
  body?: string;
  rootMargin?: string;
  threshold?: number | number[];
  children: React.ReactNode;
};

const CommentObserver: React.FC<CommentObserverProps> = ({
  onIntersect,
  index,
  currentCommentObjectLength,
  comment_id,
  parent_comment_count,
  body,
  rootMargin = "25px",
  threshold = 0.1,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const currentChannel = useAppSelector((state) => state.user.current_channel)

  useEffect(() => {
    if (!ref.current) return;
    if (index !== currentCommentObjectLength - 6) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        console.log(`Comment ID: ${comment_id}`)
        console.log(`Is intersecting: ${entry.isIntersecting}`)
        console.log(`Comment: ${body}`)
        console.log(`Offset: ${currentCommentObjectLength}`)
        console.log(`Total Comment Count: ${parent_comment_count}`)
        console.log(`Is catching the correct intersect at index ${index} with a comment object length of ${currentCommentObjectLength}`)
        // onIntersect(comment_id, currentCommentObjectLength);
      },
      { rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin, threshold, onIntersect]);

  return <div ref={ref}>{children}</div>;
};

export default CommentObserver;