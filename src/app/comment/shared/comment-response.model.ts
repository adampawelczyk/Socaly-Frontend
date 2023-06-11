export interface CommentResponseModel {
  id: number;
  postId: number;
  text: string;
  username: string;
  timestamp: string;
  timeSinceEdit: string;
  voteCount: number;
  upVote: boolean;
  downVote: boolean;
}
