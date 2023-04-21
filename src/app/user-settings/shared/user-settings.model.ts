import { Sorting } from '../../../utilities/sorting';

export interface UserSettingsModel {
  communityContentSort: Sorting;
  rememberLastCommunityContentSort: boolean;
  useCustomCommunityThemes: boolean;
  openPostsInNewTab: boolean;
  postCommentEmails: boolean;
  commentReplyEmails: boolean;
  postUpVoteEmails: boolean;
  commentUpVoteEmails: boolean;
}
