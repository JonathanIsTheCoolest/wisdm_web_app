import React, {useState, useEffect, Dispatch} from "react";
import RecursiveCommentDisplay from "../RecursiveCommentDisplay/RecursiveCommentDisplay";
import OpenNestedThreadButton from "../OpenNestedThreadButton/OpenNestedThreadButton";
import { Comment, CommentsByParentId, CommentGroupByIndex } from "@/types";
import { CommentOrder } from "../CommentContainer/commentReducer";
import { HandleGetComments } from "../RecursiveCommentDisplay/RecursiveCommentDisplay";
import { CommentActions } from "../CommentContainer/commentReducer";

import styles from "@/app/_components/comments/NestedThreadContainer/NestedThreadContainer.module.scss";

interface NestedThreadContainerProps {
  comment_count: number;
  commentsObject: CommentsByParentId;
  commentObject: CommentGroupByIndex;
  commentId: string;
  threadId: string;
  parentCollapsed: boolean;
  orderBy: CommentOrder;
  depth?: number;
  handleGetComments: HandleGetComments;
  parentCommentCount?: number;
  commentDispatch: Dispatch<CommentActions>;
  threadType: string;
}

const NestedThreadContainer = (
  props: React.PropsWithChildren<NestedThreadContainerProps>
) => {
  const { parentCollapsed, comment_count, commentsObject, 
    commentObject, commentId, threadId, orderBy, depth = 0, handleGetComments, parentCommentCount, commentDispatch,
    threadType 
  } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (!commentObject) {
      setIsCollapsed(true)
    }
  }, [commentObject]);

  return (
    <div
      className={styles.nestedThreadContainer}
      style={{
        maxHeight: isCollapsed ? "0" : "100%",
        opacity: isCollapsed ? 0 : 1,
      }}
    >
      {comment_count > 0 && !parentCollapsed &&(
        <OpenNestedThreadButton
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          comment_id={commentId}
          comment_object={commentsObject[commentId]}
          handleGetComments={handleGetComments}
          orderBy={orderBy}
        />
      )}
      {commentsObject[commentId] && !parentCollapsed && (
        <RecursiveCommentDisplay
          commentsObject={commentsObject}
          commentObject={commentsObject[commentId]}
          commentId={commentId}
          threadId={threadId}
          parentCollapsed={isCollapsed}
          orderBy={orderBy}
          depth={depth + 1}
          handleGetComments={handleGetComments}
          parentCommentCount={comment_count}
          commentDispatch={commentDispatch}
          threadType={threadType}
        />
      )}
    </div>
  );
};

export default NestedThreadContainer;