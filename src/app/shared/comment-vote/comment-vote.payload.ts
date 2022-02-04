import { VoteType } from "../vote-button/vote-type"

export class CommentVotePayload {
  voteType: VoteType
  commentId: number
}
