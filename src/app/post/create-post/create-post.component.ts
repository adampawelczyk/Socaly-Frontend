import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePostPayload} from "./create-post.payload";
import {CommunityResponse} from "../../community/community-response";
import {Router} from "@angular/router";
import {PostService} from "../../shared/post.service";
import {CommunityService} from "../../community/community.service";
import {throwError} from "rxjs";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  communities: Array<CommunityResponse>

  editorConfig = {
    skin_url: 'assets\\skins\\ui\\light',
    body_class: "mceBlackBody",
    branding: false,
    height: 300,
    menubar: false,
    images_upload_handler: 'postAcceptor.php',
    plugins: [
      'advlist lists charmap print preview anchor emoticons',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code'
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | emoticons'
    }

  constructor(private router: Router, private postService: PostService, private communityService: CommunityService,
              public activeModal: NgbActiveModal) {
    this.postPayload = {
      postName: '',
      description: '',
      communityName: ''
    }
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      communityName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.communityService.getAllCommunities().subscribe((data) => {
      this.communities = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName')?.value;
    this.postPayload.communityName = this.createPostForm.get('communityName')?.value;
    this.postPayload.description = this.createPostForm.get('description')?.value;

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }
}
