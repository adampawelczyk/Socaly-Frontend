import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostRequestModel } from '../shared/post-request.model';
import { CommunityResponseModel } from '../../community/shared/community-response.model';
import { Router } from '@angular/router';
import { PostService } from '../shared/post.service';
import { CommunityService } from '../../community/shared/community.service';
import { throwError } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/shared/auth.service';
import { FileService } from '../../shared/file.service';
import { editorConfig } from '../../../globals';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  postRequest: PostRequestModel;
  communities: CommunityResponseModel[];
  files: File[] = [];
  fileUrls: string[] = [];
  active = 1;
  selectedCommunity = "Choose a community";
  uploadingFiles = false;
  filesUploadProgress = 0;
  postWasPosted = false;
  editorConfig = editorConfig;

  constructor(private router: Router, private postService: PostService, private communityService: CommunityService,
              public activeModal: NgbActiveModal, private authService: AuthService, private fileService: FileService) {
    this.editorConfig.placeholder = "Text (optional)";
    this.editorConfig.height = 300;

    this.postRequest = {
      postName: '',
      description: '',
      communityName: ''
    };
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      communityName: new FormControl('', Validators.required),
      description: new FormControl('')
    });

    this.communityService.getAllCommunities().subscribe((data) => {
      this.communities = data;
    }, error => {
      throwError(error);
    });
  }

  ngOnDestroy() {
    if (this.fileUrls.length > 0 && !this.postWasPosted) {
      this.fileUrls.forEach(fileUrl => {
        this.fileService.removeFile(fileUrl);
      });
    }
  }

  createPost() {
    this.postRequest.communityName = this.selectedCommunity;
    this.postRequest.postName = this.createPostForm.get('postName')?.value;

    if (this.active == 1) {
      this.postRequest.description = this.createPostForm.get('description')?.value;
      this.postRequest.images = [];
    } else {
      this.postRequest.description = "";
      this.postRequest.images = this.fileUrls;
    }

    this.postService.createPost(this.postRequest).subscribe((id) => {
      this.postWasPosted = true;
      this.activeModal.close();
      this.router.navigateByUrl('/view-post/' + id);
    }, error => {
      throwError(error);
    });
  }

  discardPost() {
    this.activeModal.close();
  }

  async onSelect(event: { addedFiles: any }) {
    this.uploadingFiles = true;
    this.files.push(...event.addedFiles);

    await this.uploadFiles(this.files);
    await new Promise(resolve => setTimeout(resolve, 500));
    this.uploadingFiles = false;
    this.filesUploadProgress = 0;
  }

  onRemove(event: File) {
    let index = this.files.indexOf(event);
    this.files.splice(index, 1);
    let deleteFileUrl = this.fileUrls.splice(index, 1);

    if (deleteFileUrl.length > 0) {
      this.fileService.removeFile(deleteFileUrl[0]);
    }
  }

  private async uploadFiles(files: File[]) {
    for (const file of files) {
      let fileUrl = await this.fileService.uploadFile(file);
      this.filesUploadProgress += 100 / files.length;
      this.fileUrls.push(fileUrl);
    }
  }

  selectCommunity(name: string) {
    this.selectedCommunity = name;
  }

  isCommunityEmpty() {
    return this.selectedCommunity === 'Choose a community';
  }

  isTitleEmpty() {
    return this.createPostForm.get('postName')?.value === '';
  }
}
