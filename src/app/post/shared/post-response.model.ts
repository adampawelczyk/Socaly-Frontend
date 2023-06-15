export interface PostResponseModel {
  id: number;
  title: string;
  description?: string;
  images?: string[];
  voteCount: number;
  username: string;
  communityName: string;
  commentCount: number;
  timestamp: string;
  upVote: boolean;
  downVote: boolean;
}
