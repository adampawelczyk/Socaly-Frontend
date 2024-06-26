import {Component, Input, OnInit} from '@angular/core';
import {PostResponseModel} from '../../post/shared/post-response.model';
import {PostVoteModel} from '../shared/post-vote.model';
import {VoteService} from '../shared/vote.service';
import {AuthService} from '../../auth/shared/auth.service';
import {PostService} from '../../post/shared/post.service';
import {ToastrService} from 'ngx-toastr';
import {VoteType} from '../shared/vote-type';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-post-vote',
  templateUrl: './post-vote.component.html',
  styleUrls: ['../shared/vote.component.scss']
})
export class PostVoteComponent implements OnInit {
  @Input() post: PostResponseModel;
  postVotePayload: PostVoteModel;
  upVoteColor: string;
  downVoteColor: string;

  constructor(private voteService: VoteService,
              private authService: AuthService,
              private postService: PostService,
              private toastr: ToastrService) {
    this.postVotePayload = {
      voteType: undefined!,
      postId: undefined!
    };
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upVote(): void {
    this.setVoteType(VoteType.UPVOTE);
    this.vote();
    this.downVoteColor = '';
  }

  downVote(): void {
    this.setVoteType(VoteType.DOWNVOTE);
    this.vote();
    this.upVoteColor = '';
  }

  private setVoteType(voteType: VoteType): void {
    this.postVotePayload.voteType = voteType;
  }

  private vote(): void {
    this.postVotePayload.postId = this.post.id;
    this.voteService.voteOnPost(this.postVotePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails(): void {
    this.postService.get(this.post.id).subscribe(post => {
      this.post = post;
    });
  }
}
