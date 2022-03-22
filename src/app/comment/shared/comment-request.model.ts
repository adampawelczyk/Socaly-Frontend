export interface CommentRequestModel {
  id?: number
  postId: number
  text: string
  username?: string
  duration?: string
  parentCommentId?: number
}
