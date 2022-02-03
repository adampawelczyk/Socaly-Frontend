import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentVoteComponent } from './comment-vote.component';

describe('CommentVoteComponent', () => {
  let component: CommentVoteComponent;
  let fixture: ComponentFixture<CommentVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentVoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
