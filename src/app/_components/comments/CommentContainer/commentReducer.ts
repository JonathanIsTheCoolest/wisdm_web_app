// Types
import { CommentThread, Comment, UpdateComment } from "@/types";

export type Order = 'ASC' | 'DESC'

export type CommentActions =
  | { type: 'setThread'; payload: CommentThread }
  | { type: 'addComment'; payload: { comment: Comment, order: Order } }
  | { type: 'updateComment'; payload: { comment: UpdateComment, order: Order } }
  | { type: 'deleteComment'; payload: { threadId: string; commentId: string } }

export const INIT_COMMENT_THREAD: CommentThread = {
  comments: {}
};

// Reducer
export const commentReducer = (state: CommentThread, action: CommentActions): CommentThread => {
  switch (action.type) {
    case 'setThread':
      return action.payload;

    case 'addComment': {
      const { comment, order } = action.payload;
      const parent_comment_id = comment.parent_comment_id || 'root'

      const commentStateModel = {
        ...state,
        comments: {
          ...state.comments,
          [parent_comment_id]: {
            ...state.comments[parent_comment_id],
            [comment.comment_index]: comment
          }
        }
      }

      return commentStateModel
    }

    // This is used for all comment updates including vote actions!
    case 'updateComment': {
      const { comment, order } = action.payload;
      const parent_comment_id = comment.parent_comment_id || 'root';

      const updatedStateModel = {
        ...state,
        comments: {
          ...state.comments,
          [parent_comment_id]: {
            ...(state.comments[parent_comment_id] || {}), // Ensure parent exists
            [comment.comment_index]: {
              ...(state.comments[parent_comment_id]?.[comment.comment_index] || {}), // Ensure comment exists
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
