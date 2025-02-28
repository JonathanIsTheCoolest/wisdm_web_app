// Types
import { CommentThread, Comment, UpdateComment } from "@/types";

export type CommentOrder = 'ASC' | 'DESC'

export interface ParentCommentReference {
  parent_comment_id: string;
  comment_count: number;
  comment_index: number;
}

export type CommentActions =
  | { type: 'setThread'; payload: {commentThread: CommentThread, order: CommentOrder, reset?: boolean} }
  | { type: 'addComment'; payload: { comment: Comment, parentComment: ParentCommentReference, order: CommentOrder } }
  | { type: 'updateComment'; payload: { comment: UpdateComment } }
  | { type: 'deleteComment'; payload: { threadId: string; commentId: string } }

export const INIT_COMMENT_THREAD: CommentThread = {
  comments: {},
};

const standardizeIndexName = (index: number) => {
  return `index_${index}`
}

// Reducer
export const commentReducer = (state: CommentThread, action: CommentActions): CommentThread => {
  switch (action.type) {
    case 'setThread':
      const { commentThread, order, reset = false } = action.payload

      const { start_comment_id = '', root_comment_count, comments } = commentThread

      if (reset) return {root_comment_count, comments}

      if (state.comments.root) {
        delete comments.root
      }

      const additionalComments = comments[start_comment_id]

      const insertBasedOnOrder = () => {
        if (order === 'DESC') {
          return {
            ...state.comments[start_comment_id],
            ...additionalComments,
          }
        } else {
          return {
            ...state.comments[start_comment_id],
            ...additionalComments,
          }
        }
      }

      const commentObject = {
        root_comment_count,
        comments: {
          ...state.comments,
          ...comments,
          [start_comment_id]: insertBasedOnOrder(),
        }
      }

      return commentObject

    case 'addComment': {
      const { comment, parentComment, order } = action.payload;

      const { parent_comment_id: parent_group_id, comment_count, comment_index } = parentComment

      const parent_comment_id = comment.parent_comment_id || 'root'

      const parent_index_name = standardizeIndexName(comment_index)

      const index_name = standardizeIndexName(comment.comment_index)

      const insertBasedOnOrder = () => {
        if (order === 'DESC') {
          return {
            [index_name]: comment,
            ...state.comments[parent_comment_id],
          }
        } else {
          return {
            ...state.comments[parent_comment_id],
            [index_name]: comment
          }
        }
      }

      const currentRootCount = !parent_group_id ? comment_count : state.root_comment_count

      const commentStateModel = {
        ...state,
        root_comment_count: currentRootCount,
        comments: {
          ...state.comments,
          [parent_group_id]: {
          ...state.comments[parent_group_id],
          [parent_index_name]: {
            ...state.comments[parent_group_id]?.[parent_index_name],
            comment_count: comment_count
          }
          },
          [parent_comment_id]: insertBasedOnOrder()
        }
      }

      return commentStateModel
    }

    // This is used for all comment updates including vote actions!
    case 'updateComment': {
      const { comment } = action.payload;
      const parent_comment_id = comment.parent_comment_id || 'root';

      const index_name = standardizeIndexName(comment.comment_index)

      const updatedStateModel = {
        ...state,
        comments: {
          ...state.comments,
          [parent_comment_id]: {
            ...(state.comments[parent_comment_id] || {}), // Ensure parent exists
            [index_name]: {
              ...(state.comments[parent_comment_id]?.[index_name] || {}), // Ensure comment exists
              ...comment, // Merge only provided fields
            },
          },
        },
      }
    
      return updatedStateModel
    }

    // REQUIRES A COMPLETE REWRITE
    case 'deleteComment': {
      const { threadId, commentId } = action.payload;
      if (!state.comments[threadId]) return state;

      const { [commentId]: _, ...remainingComments } = state.comments[threadId];
      return {
        ...state,
        comments: {
          ...state.comments,
          [threadId]: remainingComments
        }
      };
    }

    default:
      throw new Error(`Unknown action type: ${(action as CommentActions).type}`);
  }
};
