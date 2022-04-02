import {VoteType} from "../shared/vote-type";

export interface VoteModel {
  voteType: VoteType;
  postId: number;
}
