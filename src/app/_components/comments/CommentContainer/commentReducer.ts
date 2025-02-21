// Types
import { CommentThread, Comment, UpdateComment } from "@/types";

export type CommentOrder = 'ASC' | 'DESC'

export type CommentActions =
  | { type: 'setThread'; payload: CommentThread }
  | { type: 'addComment'; payload: { comment: Comment, order: CommentOrder } }
  | { type: 'updateComment'; payload: { comment: UpdateComment } }
  | { type: 'deleteComment'; payload: { threadId: string; commentId: string } }

export const INIT_COMMENT_THREAD: CommentThread = {
  comments: {}
};

const standardizeIndexName = (index: number) => {
  return `index_${index}`
}

// Reducer
export const commentReducer = (state: CommentThread, action: CommentActions): CommentThread => {
  switch (action.type) {
    case 'setThread':
      return action.payload;

    case 'addComment': {
      const { comment, order } = action.payload;
      const parent_comment_id = comment.parent_comment_id || 'root'

      const index_name = standardizeIndexName(comment.comment_index)

      const insertBasedOnOrder = () => {
        console.log(`Order By: ${order}`)
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

      const commentStateModel = {
        ...state,
        comments: {
          ...state.comments,
          [parent_comment_id]: {
            ...insertBasedOnOrder()
          }
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
