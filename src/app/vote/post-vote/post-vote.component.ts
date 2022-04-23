import {Component, Input, OnInit} from '@angular/core';
import {PostResponseModel} from '../../post/shared/post-response.model';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
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
  styleUrls: ['./post-vote.component.css']
})
export class PostVoteComponent implements OnInit {
  @Input() post: PostResponseModel;
  postVotePayload: PostVoteModel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upVoteColor: string;
  downVoteColor: string;

  constructor(private voteService: VoteService, private authService: AuthService, private postService: PostService,
              private toastr: ToastrService) {
    this.postVotePayload = {
      voteType: undefined!,
      postId: undefined!
    };
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.postVotePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downVoteColor = '';
  }

  downvotePost() {
    this.postVotePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upVoteColor = '';
  }

  private vote() {
    this.postVotePayload.postId = this.post.id;
    this.voteService.voteOnPost(this.postVotePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(data => {
      this.post = data;
    });
  }
}
