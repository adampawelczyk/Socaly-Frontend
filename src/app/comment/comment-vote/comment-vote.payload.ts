import { VoteType } from "../../shared/vote-type"

export class CommentVotePayload {
  voteType: VoteType
  commentId: number
}
