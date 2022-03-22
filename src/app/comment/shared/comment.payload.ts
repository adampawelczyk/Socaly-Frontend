export class CommentPayload {
  id?: number
  postId: number
  text: string
  username?: string
  duration?: string
  parentCommentId?: number
}
