export interface CommentResponseModel {
  id: number;
  postId: number;
  text: string;
  username: string;
  timestamp: string;
  editTimestamp: string;
  voteCount: number;
  upVote: boolean;
  downVote: boolean;
}
