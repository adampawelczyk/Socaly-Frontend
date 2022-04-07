export interface CommentRequestModel {
  postId: number
  text: string
  parentCommentID?: number
}
