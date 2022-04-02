import { VoteType } from "./vote-type"

export interface CommentVoteModel {
  voteType: VoteType;
  commentID: number;
}
