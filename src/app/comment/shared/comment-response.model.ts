export class CommentResponseModel {
  id: number
  postId: number
  text: string
  username: string
  duration: string
  voteCount: number
  upVote: boolean
  downVote: boolean
}
