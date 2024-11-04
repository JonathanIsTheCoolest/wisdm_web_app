import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import collapseSVG from '@/src/assets/icons/collapse_comments_triangle.svg';
import styles from './OpenNestedThreadButton.module.scss';

import { CommentGroupByIndex } from "@/src/types";

interface OpenNestedThreadButtonProps {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
  comment_id: string;
  comment_object: CommentGroupByIndex;
}

const OpenNestedThreadButton: React.FC<OpenNestedThreadButtonProps> = React.memo(({
  isCollapsed,
  setIsCollapsed,
  comment_id, 
  comment_object
}) => {
  const commentContainerRef = useRef<HTMLElement | null>(null);
  const [positions, setPositions] = useState<{
    togglePosition: { top: number; left: number } | null;
    verticalLinePositions: {
      topStartPosition: number;
      topToToggleHeight: number;
      bottomStartPosition: number;
      toggleToBottomHeight: number;
      left: number;
    } | null;
    childPositionsArray: any[];
  } | null>(null);

  const calculatePositions = () => {
    const commentContainer = commentContainerRef.current;
    const parentElement = document.getElementById(comment_id);
    const childElementArray = Object.values(comment_object).map((comment) => document.getElementById(comment.comment_id));
  
    if (!commentContainer || !parentElement || childElementArray.some(child => !child)) {
      return null;
    }
  
    const containerRect = commentContainer.getBoundingClientRect();
    const parentRect = parentElement.getBoundingClientRect();
    
    const parentLeft = parentRect.left - containerRect.left
    const parentRight = parentRect.right - containerRect.left
    const parentPosition = {
      top: parentRect.top - containerRect.top,
      left: parentLeft,
      right: parentRight,
      center: (parentLeft + parentRight) / 2,
      bottom: parentRect.bottom - containerRect.top,
    };

    const childPositionsArray = childElementArray.map((childElement) => {
      const rect = childElement?.getBoundingClientRect();
      if (rect) {
        const top = rect.top - containerRect.top;
        const left = rect.left - containerRect.left;
        const bottom = rect.bottom - containerRect.top;
        const centeredLeft = parentPosition.center;
        const horizontalLineLength = Math.abs(centeredLeft - left);
  
        return {
          top,
          left,
          bottom,
          center: top + (bottom - top) / 2,
          horizontalLineLength,
          centeredLeft,
        };
      }
      return { top: 0, left: 0, bottom: 0, center: 0, horizontalLineLength: 0, centeredLeft: 0 };
    });
  
    const togglePosition = {
      top: (parentPosition.bottom + childPositionsArray[0]?.top) / 2,
      left: parentPosition.center,
    };
  
    const lastChildPosition = childPositionsArray[childPositionsArray.length - 1];
    const verticalLinePositions = {
      topStartPosition: parentPosition.bottom,
      topToToggleHeight: togglePosition.top - parentPosition.bottom,
      bottomStartPosition: togglePosition.top,
      toggleToBottomHeight: lastChildPosition.center - togglePosition.top,
      left: togglePosition.left,
    };
  
    return { togglePosition, verticalLinePositions, childPositionsArray };
  };  

  useEffect(() => {
    commentContainerRef.current = document.getElementById("comment_container");

    if (!commentContainerRef.current) return;

    const updatePositions = () => {
      setPositions(calculatePositions());
    };

    const resizeObserver = new ResizeObserver(updatePositions);
    resizeObserver.observe(commentContainerRef.current);

    updatePositions();

    return () => resizeObserver.disconnect();
  }, [comment_id, comment_object]);

  if (!commentContainerRef.current || !positions) return null;

  return ReactDOM.createPortal(
    <div>
      {positions.verticalLinePositions && (
        <div
          style={{
            position: 'absolute',
            top: positions.verticalLinePositions.topStartPosition + 5,
            left: positions.verticalLinePositions.left,
            height: positions.verticalLinePositions.topToToggleHeight - 10,
            width: '2px',
            backgroundColor: 'black',
            transform: 'translateX(-50%)',
          }}
        />
      )}
      <div
        className={`${styles.button} ${isCollapsed ? styles.collapsed : styles.expanded}`}
        onClick={() => setIsCollapsed(prev => !prev)}
        style={{
          top: `${positions.togglePosition?.top}px`,
          left: `${positions.togglePosition?.left}px`,
          zIndex: 1,
        }}
      >
        <Image src={collapseSVG} alt="collapse nested comment thread" height={10} width={10} />
      </div>
      {!isCollapsed && positions.verticalLinePositions && (
        <div
          style={{
            position: 'absolute',
            top: positions.verticalLinePositions.bottomStartPosition + 25,
            left: positions.verticalLinePositions.left,
            height: positions.verticalLinePositions.toggleToBottomHeight - 25,
            width: '2px',
            backgroundColor: 'black',
            transform: 'translateX(-50%)',
          }}
        />
      )}
      {!isCollapsed &&
        positions.childPositionsArray.map((child) => (
          <div
            key={child.top}
            style={{
              position: 'absolute',
              top: child.center,
              left: child.centeredLeft,
              height: '2px',
              width: child.horizontalLineLength - 5,
              backgroundColor: 'black',
              transform: 'translateX(-1px)',
            }}
          />
        ))}
    </div>,
    commentContainerRef.current
  );
});

export default OpenNestedThreadButton;