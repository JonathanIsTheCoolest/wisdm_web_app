import React, { useState } from "react";
import { Comment, CommentsByParentId, CommentGroupByIndex } from "@/types";
import CommentBody from "../CommentBody/CommentBody";
import NestedThreadContainer from "../NestedThreadContainer/NestedThreadContainer";
import OpenNestedThreadButton from "../OpenNestedThreadButton/OpenNestedThreadButton";
import styles from "./RecursiveCommentDisplay.module.scss";

import CommentObserver from "../CommentObserver/CommentObserver";

interface RecursiveCommentDisplayProps {
  commentsObject: CommentsByParentId;
  commentObject: CommentGroupByIndex;
  threadId: string;
  parentCollapsed: boolean;
  depth?: number;
}

const initializeCollapsedStates = (
  comments: CommentGroupByIndex,
  commentsObject: CommentsByParentId
): { [key: string]: boolean } => {
  const collapsedState: { [key: string]: boolean } = {};

  const initializeStateRecursively = (currentComments: CommentGroupByIndex) => {
    Object.values(currentComments).forEach((comment) => {
      collapsedState[comment.comment_id] = true;
      if (commentsObject[comment.comment_id]) {
        initializeStateRecursively(commentsObject[comment.comment_id]);
      }
    });
  };

  initializeStateRecursively(comments);
  return collapsedState;
};

const RecursiveCommentDisplay: React.FC<RecursiveCommentDisplayProps> =
  React.memo(({ commentsObject, commentObject, threadId, parentCollapsed, depth = 0 }) => {
    const [collapsedStates, setCollapsedStates] = useState<{
      [key: string]: boolean;
    }>(initializeCollapsedStates(commentObject, commentsObject));

    const toggleCollapse = (commentId: string) => {
      setCollapsedStates((prevState) => ({
        ...prevState,
        [commentId]: !prevState[commentId],
      }));
    };

    return (
      <div>
        {Object.values(commentObject).map((comment: Comment, index) => {
          const { comment_id, body, comment_count } = comment;

          return (
            <div className={styles.commentContainer} key={comment_id}>
              <CommentObserver
                onIntersect={(isIntersecting) => {}}
                index={index}
                currentCommentObjectLength={Object.values(commentObject).length}
                comment_id={comment_id}
                body={body}
              >
                <CommentBody
                  comment={comment}
                  threadId={threadId}
                  comment_count={comment_count}
                />
              </CommentObserver>
              {comment_count > 0 && !parentCollapsed && (
                <OpenNestedThreadButton
                  isCollapsed={collapsedStates[comment_id] || parentCollapsed}
                  setIsCollapsed={() => toggleCollapse(comment_id)}
                  comment_id={comment_id}
                  comment_object={commentsObject[comment_id]}
                />
              )}
              <NestedThreadContainer
                isCollapsed={collapsedStates[comment_id] || parentCollapsed}
              >
                {commentsObject[comment_id] && (
                  <RecursiveCommentDisplay
                    commentsObject={commentsObject}
                    commentObject={commentsObject[comment_id]}
                    threadId={threadId}
                    parentCollapsed={
                      collapsedStates[comment_id] || parentCollapsed
                    }
                    depth={depth + 1}
                  />
                )}
              </NestedThreadContainer>
            </div>
          );
        })}
      </div>
    );
  });

export default RecursiveCommentDisplay;