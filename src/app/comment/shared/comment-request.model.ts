export interface CommentRequestModel {
  postId: number
  text: string
  parentCommentId?: number
}
