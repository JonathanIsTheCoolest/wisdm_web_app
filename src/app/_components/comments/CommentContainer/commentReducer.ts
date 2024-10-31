// Types
import { CommentThread, Comment } from "@/src/types";

export type CommentActions =
  | { type: 'setThread'; payload: CommentThread }
  | { type: 'addComment'; payload: { threadId: string; comment: Comment } }
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
      const { threadId, comment } = action.payload;
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