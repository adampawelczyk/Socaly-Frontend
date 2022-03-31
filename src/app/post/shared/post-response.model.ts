export class PostResponseModel {
  id: number;
  postName: string;
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
