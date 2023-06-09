import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  createPostForm: UntypedFormGroup;
  postPayload: PostRequestModel;
  communities: CommunityResponseModel[];
  files: File[] = [];
  fileUrls: string[] = [];
  active = 1;
  selectedCommunity = 'Choose a community';
  uploadingFiles = false;
  filesUploadProgress = 0;
  postWasPosted = false;
  editorConfig = editorConfig;

  constructor(private router: Router, private postService: PostService, private communityService: CommunityService,
              public activeModal: NgbActiveModal, private authService: AuthService, private fileService: FileService) {
    this.editorConfig.placeholder = 'Text (optional)';
    this.editorConfig.height = 300;

    this.postPayload = {
      postTitle: '',
      description: '',
      communityName: ''
    };

    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');
  }

  ngOnInit(): void {
    this.createPostForm = new UntypedFormGroup({
      postName: new UntypedFormControl('', Validators.required),
      communityName: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('')
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
    this.postPayload.communityName = this.selectedCommunity;
    this.postPayload.postTitle = this.createPostForm.get('postName')?.value;

    if (this.active == 1) {
      this.postPayload.description = this.createPostForm.get('description')?.value;
      this.postPayload.images = [];
    } else {
      this.postPayload.description = '';
      this.postPayload.images = this.fileUrls;
    }

    this.postService.createPost(this.postPayload).subscribe((id) => {
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
