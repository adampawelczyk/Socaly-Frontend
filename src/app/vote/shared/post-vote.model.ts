import { VoteType } from "./vote-type";

export interface PostVoteModel {
  voteType: VoteType;
  postID: number;
}
