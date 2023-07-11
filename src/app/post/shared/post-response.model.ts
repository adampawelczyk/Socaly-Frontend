export interface PostResponseModel {
  id: number;
  title: string;
  description?: string;
  images?: string[];
  points: number;
  username: string;
  communityName: string;
  commentCount: number;
  timeSinceCreation: string;
  timeSinceEdit: string;
  upVote: boolean;
  downVote: boolean;
}
