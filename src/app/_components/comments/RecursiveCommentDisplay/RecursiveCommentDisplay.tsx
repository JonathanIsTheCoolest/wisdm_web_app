import { Comment, CommentsByParentId, CommentGroupByIndex } from "@/src/types"

import CommentBody from "../CommentBody/CommentBody"

const RecursiveCommentDisplay = (commentsObject: CommentsByParentId, commentObject: CommentGroupByIndex ) => {
  return (
    <div
    >
      {
        Object.values(commentObject).map((comment: Comment) => {
          const { comment_id } = comment
          return (
            <div 
              key={comment_id}
            >
              <CommentBody comment={comment}/>
              {commentsObject[comment_id] && RecursiveCommentDisplay(commentsObject, commentsObject[comment_id])}
            </div>
          )
        })
      }
    </div>
  )
}

export default RecursiveCommentDisplay