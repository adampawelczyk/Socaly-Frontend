import { VoteType } from "./vote-type";

export interface PostVoteModel {
  voteType: VoteType;
  postId: number;
}
