// Types
import { CommentThread, Comment } from "@/src/types";

export type CommentActions =
  | { type: 'setThread'; payload: CommentThread }
  | { type: 'addComment'; payload: { comment: Comment } }
  | { type: 'updateComment'; payload: { threadId: string; comment: Comment } }
  | { type: 'deleteComment'; payload: { threadId: string; commentId: string } };

export const INIT_COMMENT_THREAD: CommentThread = {
  comments: {}
};

// Reducer
export const commentReducer = (state: CommentThread, action: CommentActions): CommentThread => {
  switch (action.type) {
    case 'setThread':
      return action.payload;

    case 'addComment': {
      const { comment } = action.payload;
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

    case 'updateComment': {
      const { threadId, comment } = action.payload;
      if (!state.comments[threadId]) return state;
      return {
        ...state,
        comments: {
          ...state.comments,
          [threadId]: {
            ...state.comments[threadId],
            [comment.comment_id]: comment
          }
        }
      };
    }

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
