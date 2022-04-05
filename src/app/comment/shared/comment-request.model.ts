export interface CommentRequestModel {
  postID: number
  text: string
  parentCommentID?: number
}
