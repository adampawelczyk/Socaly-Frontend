import { Sorting } from './sorting';

export interface UserSettingsModel {
  communityContentSort: Sorting;
  openPostsInNewTab: boolean;
  postCommentEmails: boolean;
  commentReplyEmails: boolean;
  postUpVoteEmails: boolean;
  commentUpVoteEmails: boolean;
}
