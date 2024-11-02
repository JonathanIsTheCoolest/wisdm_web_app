import React, { useState } from 'react';
import { Comment, CommentsByParentId, CommentGroupByIndex } from "@/src/types";
import CommentBody from '../CommentBody/CommentBody';
import NestedThreadContainer from '../NestedThreadContainer/NestedThreadContainer';
import OpenNestedThreadButton from '../OpenNestedThreadButton/OpenNestedThreadButton';

interface RecursiveCommentDisplayProps {
  commentsObject: CommentsByParentId;
  commentObject: CommentGroupByIndex;
  threadId: string;
  parentCollapsed: boolean;
}

const initializeCollapsedStates = (comments: CommentGroupByIndex, commentsObject: CommentsByParentId): { [key: string]: boolean } => {
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

const RecursiveCommentDisplay: React.FC<RecursiveCommentDisplayProps> = React.memo(({
  commentsObject,
  commentObject,
  threadId,
  parentCollapsed,
}) => {
  const [collapsedStates, setCollapsedStates] = useState<{ [key: string]: boolean }>(
    initializeCollapsedStates(commentObject, commentsObject)
  );

  const toggleCollapse = (commentId: string) => {
    setCollapsedStates((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };

  return (
    <div>
      {Object.values(commentObject).map((comment: Comment) => {
        const { comment_id } = comment;

        const comment_count = commentsObject[comment_id] ? Object.values(commentsObject[comment_id]).length : 0

        return (
          <div key={comment_id}>
            <CommentBody comment={comment} threadId={threadId} comment_count={comment_count || 0} />
            {comment_count > 0 && !parentCollapsed && (
              <OpenNestedThreadButton
                isCollapsed={collapsedStates[comment_id] || parentCollapsed}
                setIsCollapsed={() => toggleCollapse(comment_id)}
                comment_id={comment_id}
                comment_object={commentsObject[comment_id]}
              />
            )}
            <NestedThreadContainer isCollapsed={collapsedStates[comment_id] || parentCollapsed}>
              {commentsObject[comment_id] && (
                <RecursiveCommentDisplay
                  commentsObject={commentsObject}
                  commentObject={commentsObject[comment_id]}
                  threadId={threadId}
                  parentCollapsed={collapsedStates[comment_id] || parentCollapsed}
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