import { TestBed } from '@angular/core/testing';

import { CommentVoteService } from './comment-vote.service';

describe('CommentVoteService', () => {
  let service: CommentVoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentVoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
