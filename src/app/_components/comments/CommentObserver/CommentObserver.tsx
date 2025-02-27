import React, { useState, useEffect, useRef } from "react";
import { socket } from "@/app/_lib/socket/socket";
import { useAppSelector } from "@/redux_lib/hooks";

type CommentObserverProps = {
  onIntersect: (isIntersecting: boolean) => void;
  index: number;
  currentCommentObjectLength: number;
  totalCommentObjectLength?: number;
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
  totalCommentObjectLength,
  comment_id,
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
    // if (index !== currentCommentObjectLength - 6 && currentCommentObjectLength !== totalCommentObjectLength) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        onIntersect(entry.isIntersecting);
        console.log(`Is catching the correct intersect at index ${index} with a comment object length of ${currentCommentObjectLength}`)
        console.log(`Comment: ${body}`)
        console.log(`Is intersecting: ${entry.isIntersecting}`)
      },
      { rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [rootMargin, threshold, onIntersect]);

  return <div ref={ref}>{children}</div>;
};

export default CommentObserver;