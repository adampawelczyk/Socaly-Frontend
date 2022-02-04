export class CommentResponsePayload {
  id: number
  postId: number
  text: string
  username: string
  duration: string
  parentCommentId: number
  voteCount: number
  upVote: boolean
  downVote: boolean
}
