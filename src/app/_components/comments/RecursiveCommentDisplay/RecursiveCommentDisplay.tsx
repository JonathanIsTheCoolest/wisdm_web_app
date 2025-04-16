import React from "react";
import { Comment, CommentsByParentId, CommentGroupByIndex } from "@/types";
import { CommentOrder } from "../CommentContainer/commentReducer";
import CommentBody from "../CommentBody/CommentBody";
import NestedThreadContainer from "../NestedThreadContainer/NestedThreadContainer";
import styles from "./RecursiveCommentDisplay.module.scss";

import CommentObserver from "../CommentObserver/CommentObserver";

export type HandleGetComments = (commentId: string, offset: number, reset?: boolean, cb?: () => any) => void

export interface RecursiveCommentDisplayProps {
  commentsObject: CommentsByParentId;
  commentObject: CommentGroupByIndex;
  commentId: string;
  threadId: string;
  parentCollapsed: boolean;
  orderBy: CommentOrder;
  depth?: number;
  handleGetComments: HandleGetComments;
  parentCommentCount?: number;
}

const RecursiveCommentDisplay: React.FC<RecursiveCommentDisplayProps> =
  React.memo(({ commentsObject, commentObject, threadId, parentCollapsed, orderBy, depth = 0, handleGetComments, parentCommentCount = 0, commentId }) => {

    return (
      <div>
        {Object.values(commentObject).map((comment: Comment, index) => {
          const { comment_id, body, comment_count, parent_comment_id } = comment;
          return (
            <div className={styles.commentContainer} key={comment_id}>
              <CommentObserver
                onIntersect={handleGetComments}
                index={index}
                currentCommentObjectLength={Object.values(commentObject).length}
                parent_comment_id={parent_comment_id}
                parent_comment_count={parentCommentCount}
                body={body}
              >
                <CommentBody
                  comment={comment}
                  threadId={threadId}
                />
              </CommentObserver>
              <NestedThreadContainer
                comment_count={comment_count}
                parentCollapsed={parentCollapsed}
                commentsObject={commentsObject}
                commentObject={commentsObject[comment_id]}
                commentId={comment_id}
                threadId={threadId}
                orderBy={orderBy}
                depth={depth + 1}
                handleGetComments={handleGetComments}
                parentCommentCount={comment_count}
              />
            </div>
          );
        })}
      </div>
    );
  });

export default RecursiveCommentDisplay;