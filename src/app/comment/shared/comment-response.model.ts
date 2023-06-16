export interface CommentResponseModel {
  id: number;
  postId: number;
  text: string;
  username: string;
  timeSinceCreation: string;
  timeSinceEdit: string;
  points: number;
  upVote: boolean;
  downVote: boolean;
}
