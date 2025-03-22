import React, { Dispatch, SetStateAction, useRef, useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import collapseSVG from "@/assets/icons/collapse_comments_triangle.svg";
import styles from "./OpenNestedThreadButton.module.scss";
import { CommentGroupByIndex } from "@/types";
import { CommentOrder } from "../CommentContainer/commentReducer";
import { HandleGetComments } from "../RecursiveCommentDisplay/RecursiveCommentDisplay";

interface OpenNestedThreadButtonProps {
    isCollapsed: boolean;
    setIsCollapsed: Dispatch<SetStateAction<boolean>>;
    comment_id: string;
    comment_object: CommentGroupByIndex;
    renderChildComments?: (comment_object: CommentGroupByIndex) => React.ReactNode;
    handleGetComments: HandleGetComments;
    orderBy: CommentOrder;
}

const OpenNestedThreadButton: React.FC<OpenNestedThreadButtonProps> = React.memo(
    ({ isCollapsed, setIsCollapsed, comment_id, comment_object, renderChildComments, handleGetComments, orderBy }) => {
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

            if (!commentContainer || !parentElement) {
                return {
                    togglePosition: { top: 0, left: 0 },
                    verticalLinePositions: {
                        topStartPosition: 0,
                        topToToggleHeight: 0,
                        bottomStartPosition: 0,
                        toggleToBottomHeight: 0,
                        left: 0,
                    },
                    childPositionsArray: positions?.childPositionsArray || [],
                };
            }

            const containerRect = commentContainer.getBoundingClientRect();
            const parentRect = parentElement.getBoundingClientRect();

            const parentLeft = parentRect.left - containerRect.left;
            const parentRight = parentRect.right - containerRect.left;
            const parentPosition = {
                top: parentRect.top - containerRect.top,
                left: parentLeft,
                right: parentRight,
                center: (parentLeft + parentRight) / 2,
                bottom: parentRect.bottom - containerRect.top,
            };

            const childPositionsArray = Object.values(comment_object || {}).map((comment) => {
                const childElement = document.getElementById(comment.comment_id);
                if (childElement) {
                    const rect = childElement.getBoundingClientRect();
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
                return {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    center: 0,
                    horizontalLineLength: 0,
                    centeredLeft: 0,
                };
            });

            const contentBottom = parentPosition.bottom + (parentRect.height * 0.6);

            const togglePosition = {
                top: childPositionsArray.length > 0 ? (parentPosition.bottom + childPositionsArray[0].top) / 2 : contentBottom,
                left: parentPosition.center,
            };

            const verticalLinePositions = {
                topStartPosition: parentPosition.bottom,
                topToToggleHeight: togglePosition.top - parentPosition.bottom,
                bottomStartPosition: togglePosition.top,
                toggleToBottomHeight: childPositionsArray.length > 0 ? childPositionsArray[childPositionsArray.length - 1].center - togglePosition.top : 0,
                left: togglePosition.left,
            };

            return { togglePosition, verticalLinePositions, childPositionsArray };
        };

        useLayoutEffect(() => {
            commentContainerRef.current = document.getElementById("comment_container");
            if (!commentContainerRef.current) return;

            const updatePositions = () => {
                setPositions(calculatePositions());
            };

            const resizeObserver = new ResizeObserver(updatePositions);
            resizeObserver.observe(commentContainerRef.current);

            const observer = new MutationObserver(updatePositions);
            observer.observe(commentContainerRef.current, { subtree: true, childList: true, attributes: true, characterData: true });

            return () => {
                resizeObserver.disconnect();
                observer.disconnect();
            };
        }, [comment_id, comment_object, orderBy]);

        const handleClick = () => {
            setIsCollapsed((prev) => !prev);
            if (!comment_object) {
                handleGetComments(comment_id, 0);
            }
        };

        if (!commentContainerRef.current || !positions) return null;

        return ReactDOM.createPortal(
            <div>
                {positions.verticalLinePositions && (
                    <div
                        style={{
                            position: "absolute",
                            top: positions.verticalLinePositions.topStartPosition + 5,
                            left: positions.verticalLinePositions.left,
                            height: positions.verticalLinePositions.topToToggleHeight - 10,
                            width: "2px",
                            backgroundColor: "var(--color-comment-font-detail)",
                            transform: "translateX(-50%)",
                        }}
                    />
                )}
                <div
                    className={`${styles.button} ${isCollapsed ? styles.collapsed : styles.expanded}`}
                    onClick={handleClick}
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
                            position: "absolute",
                            top: positions.verticalLinePositions.bottomStartPosition + 25,
                            left: positions.verticalLinePositions.left,
                            height: positions.verticalLinePositions.toggleToBottomHeight - 25,
                            width: "2px",
                            backgroundColor: "var(--color-comment-font-detail)",
                            transform: "translateX(-50%)",
                        }}
                    />
                )}
                {!isCollapsed && positions.childPositionsArray &&
                    positions.childPositionsArray.map((child) => (
                        <div
                            key={child.top}
                            style={{
                                position: "absolute",
                                top: child.center,
                                left: child.centeredLeft,
                                height: "2px",
                                width: child.horizontalLineLength - 5,
                                backgroundColor: "var(--color-comment-font-detail)",
                                transform: "translateX(-1px)",
                            }}
                        />
                    ))}
                {!isCollapsed && renderChildComments && comment_object && renderChildComments(comment_object)}
            </div>,
            commentContainerRef.current
        );
    }
);

export default OpenNestedThreadButton;