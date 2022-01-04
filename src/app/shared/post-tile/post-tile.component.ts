import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../post.service";
import {PostModel} from "../post-model";
import {faCommentAlt} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  @Input()
  showCommunity$: boolean = true;
  @Input()
  showComments: boolean = false;
  faCommentAlt = faCommentAlt;
  @Input()
  posts$: PostModel[];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }

}
