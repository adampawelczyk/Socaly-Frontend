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
  upVote: boolean;
  downVote: boolean;
}
