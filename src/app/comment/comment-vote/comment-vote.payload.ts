import { VoteType } from "../../post/vote-button/vote-type"

export class CommentVotePayload {
  voteType: VoteType
  commentId: number
}
