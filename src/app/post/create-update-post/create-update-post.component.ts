import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.scss']
})
export class CreateUpdatePostComponent implements OnInit {
  @Input() isUpdating = false;
  @Input() postIdToUpdate: number;
  createPostForm: UntypedFormGroup;
  postPayload: PostRequestModel;
  communities: CommunityResponseModel[];
  files: File[] = [];
  fileUrls: string[] = [];
  updatedFileUrls: string[] = [];
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
      title: '',
      description: '',
      communityName: ''
    };

    const body = document.getElementsByTagName('body')[0];
    body.removeAttribute('style');
  }

  ngOnInit(): void {
    this.createPostForm = new UntypedFormGroup({
      title: new UntypedFormControl('', Validators.required),
      communityName: new UntypedFormControl('', Validators.required),
      description: new UntypedFormControl('')
    });

    this.communityService.getAllCommunities().subscribe((communities) => {
      this.communities = communities;
    }, error => {
      throwError(error);
    });

    if (this.isUpdating) {
      this.postService.getPost(this.postIdToUpdate).subscribe(async post => {
        this.selectedCommunity = post.communityName;
        this.createPostForm.get('title')?.setValue(post.title);

        if (post.images !== undefined && post.images.length != 0) {
          this.active = 2;

          for (let imageUrl of post.images) {
            this.fileUrls.push(imageUrl);
            await this.createFile(imageUrl, '', 'image/png')
              .then(file => {
                this.files.push(file);
              });
          }
        } else {
          this.createPostForm.get("description")?.setValue(post.description);
        }
      });
    }
  }

  ngOnDestroy() {
    if ((this.fileUrls.length > 0 || this.updatedFileUrls.length > 0) && !this.postWasPosted) {
      if (!this.isUpdating) {
        this.fileUrls.forEach(fileUrl => {
          this.fileService.removeFile(fileUrl);
        });
      } else {
        this.updatedFileUrls.forEach(fileUrl => {
          this.fileService.removeFile(fileUrl);
        })
      }
    }
  }

  createPost() {
    this.postPayload.communityName = this.selectedCommunity;
    this.postPayload.title = this.createPostForm.get('title')?.value;

    if (this.active == 1) {
      this.postPayload.description = this.createPostForm.get('description')?.value;
      this.postPayload.images = [];

      if (this.fileUrls.length > 0) {
        this.fileUrls.forEach(fileUrl => {
          this.fileService.removeFile(fileUrl);
        });
      }

      if (this.updatedFileUrls.length > 0) {
        this.updatedFileUrls.forEach(fileUrl => {
          this.fileService.removeFile(fileUrl);
        })
      }
    } else {
      this.fileUrls.push(...this.updatedFileUrls);
      this.postPayload.description = '';
      this.postPayload.images = this.fileUrls;
    }

    if (this.isUpdating) {
      this.postService.updatePost(this.postIdToUpdate, this.postPayload).subscribe(id => {
        this.postWasPosted = true;
        this.activeModal.close();

        location.reload();
      }, error => {
        throwError(error);
      })
    } else {
      this.postService.createPost(this.postPayload).subscribe((id) => {
        this.postWasPosted = true;
        this.activeModal.close();
        this.router.navigateByUrl('/post/' + id);
      }, error => {
        throwError(error);
      });
    }
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
      if (file.name === '') continue;
      let fileUrl = await this.fileService.uploadFile(file);
      this.filesUploadProgress += 100 / files.length;

      if (this.isUpdating) {
        this.updatedFileUrls.push(fileUrl);
      } else {
        this.fileUrls.push(fileUrl);
      }
    }
  }

  selectCommunity(name: string) {
    this.selectedCommunity = name;
  }

  isCommunityEmpty() {
    return this.selectedCommunity === 'Choose a community';
  }

  isTitleEmpty() {
    return this.createPostForm.get('title')?.value === '';
  }

  async createFile(path: string, name: string, type: string): Promise<File> {
    let response = await fetch(path);
    let data = await response.blob();
    let metadata = {
      type: type
    };
    return new File([data], name, metadata);
  }
}
