import { CommentThread, Comment, UpdateComment, CommentsByParentId } from "@/types";

export type CommentOrder = 'ASC' | 'DESC'

export interface ParentCommentReference {
  parent_id: string;
  comment_count: number;
  index: number;
}

export type CommentActions =
  | { type: 'setThread'; payload: {commentThread: CommentThread, order: CommentOrder, reset?: boolean} }
  | { type: 'addComment'; payload: { comment: Comment, parent_comment: ParentCommentReference, order: CommentOrder, root_comment_count: number, comment_count_total: number } }
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

      const { start_id = '', root_comment_count, comments } = commentThread

      if (reset) {
        const newCommentObject = {root_comment_count, comments}
        return newCommentObject
      }

      if (state.comments.root) {
        delete comments.root
      }

      const additionalComments = comments[start_id]

      const insertBasedOnOrder = () => {
        if (order === 'DESC') {
          return {
            ...state.comments[start_id],
            ...additionalComments,
          }
        } else {
          return {
            ...state.comments[start_id],
            ...additionalComments,
          }
        }
      }

      const commentObject = {
        root_comment_count,
        comments: {
          ...state.comments,
          ...comments,
          [start_id]: insertBasedOnOrder(),
        }
      }

      return commentObject

    case 'addComment': {
      const { comment, parent_comment, comment_count_total, root_comment_count, order } = action.payload;

      const { parent_id: parent_group_id, comment_count, index } = parent_comment

      const parent_id = comment.parent_id || 'root'

      const parent_index_name = standardizeIndexName(index)

      const index_name = standardizeIndexName(comment.index)

      const currentObjectLength = state.comments[parent_id] ? 
        Object.values(state.comments[parent_id]).length + 1 :
        1

      const parentCount = comment_count || root_comment_count

      const insertBasedOnOrder = () => {
        if (order === 'DESC') {
          return {
            [index_name]: comment,
            ...state.comments[parent_id],
          }
        } else if (order === 'ASC' && currentObjectLength === parentCount ) {
          return {
            ...state.comments[parent_id],
            [index_name]: comment
          }
        } else {
          return {...state.comments[parent_id]}
        }
      }

      const rootComment = () => {
        const root_id = state.comments.root?.id
        let root = {}
        
        if (root_id === parent_id ) {
          root = {
            root: {
              ...state.comments.root,
            comment_count: comment_count
            }
          }
        } else if (root_id === comment.id) {
          root = {
            root: comment
          }
        }
        return root
      }

      const commentStateModel = {
        ...state,
        root_comment_count: root_comment_count,
        comments: {
          ...state.comments,
          ...rootComment(),
          [parent_group_id]: {
            ...state.comments[parent_group_id],
            [parent_index_name]: {
              ...state.comments[parent_group_id]?.[parent_index_name],
              comment_count: comment_count
            },
          },
          [parent_id]: insertBasedOnOrder()
        } as CommentsByParentId & { root?: Comment }
      }

      return commentStateModel
    }

    // This is used for all comment updates including vote actions!
    case 'updateComment': {
      const { comment } = action.payload;
      const parent_id = comment.parent_id || 'root';

      const index_name = standardizeIndexName(comment.index)

      const innerStateModel = () => {
        const rootComment = state?.comments?.root
        if (rootComment?.id === comment.id) {
          return {
            root: {
              ...rootComment,
              ...comment
            }
          }
        } else {
          return {
            [parent_id]: {
              ...(state.comments[parent_id] || {}), // Ensure parent exists
              [index_name]: {
                ...(state.comments[parent_id]?.[index_name] || {}), // Ensure comment exists
                ...comment, // Merge only provided fields
              },
            },
          }
        }
      }

      const updatedStateModel = {
        ...state,
        comments: {
          ...state.comments,
          ...innerStateModel()
        },
      } as CommentThread
    
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
