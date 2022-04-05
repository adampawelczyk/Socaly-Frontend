export interface CommentRequestModel {
  postID: number
  text: string
  parentCommentId?: number
}
