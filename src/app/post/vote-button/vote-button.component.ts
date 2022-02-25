import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../post-model";
import {faArrowDown, faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {VotePayload} from "./vote-payload";
import {VoteService} from "./vote.service";
import {AuthService} from "../../auth/auth.service";
import {PostService} from "../post.service";
import {ToastrService} from "ngx-toastr";
import {VoteType} from "./vote-type";
import {throwError} from "rxjs";

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {
  @Input() post: PostModel
  votePayload: VotePayload
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upVoteColor: string;
  downVoteColor: string;

  constructor(private voteService: VoteService, private authService: AuthService, private postService: PostService,
              private toastr: ToastrService) {
    this.votePayload = {
      voteType: undefined!,
      postId: undefined!
    }
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downVoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upVoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(data => {
      this.post = data;
    })
  }
}
