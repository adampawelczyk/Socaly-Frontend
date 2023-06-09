export interface PostResponseModel {
  id: number;
  postTitle: string;
  description?: string;
  images?: string[];
  voteCount: number;
  userName: string;
  communityName: string;
  commentCount: number;
  duration: string;
  upVote: boolean;
  downVote: boolean;
}
