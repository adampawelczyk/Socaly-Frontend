import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-create-update-post',
  templateUrl: './create-update-post.component.html',
  styleUrls: ['./create-update-post.component.scss']
})
export class CreateUpdatePostComponent implements OnInit {
  @Input() isUpdating = false;
  @Input() postIdToUpdate: number;
  createPostForm: FormGroup;
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

  constructor(private router: Router,
              private postService: PostService,
              private communityService: CommunityService,
              public activeModal: NgbActiveModal,
              private authService: AuthService,
              private fileService: FileService) {
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
    this.initializeCreatePostForm();
    this.loadCommunities();

    if (this.isUpdating) {
      this.loadPostToUpdate();
    }
  }

  private initializeCreatePostForm(): void {
    this.createPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      communityName: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  private loadCommunities(): void {
    this.communityService.getAllCommunities().subscribe(
      (communities) => {
        this.communities = communities;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  private loadPostToUpdate(): void {
    this.postService.getPost(this.postIdToUpdate).subscribe(
      async (post) => {
        this.selectedCommunity = post.communityName;
        this.createPostForm.get('title')?.setValue(post.title);

        if (post.images !== undefined && post.images.length !== 0) {
          this.active = 2;

          for (const imageUrl of post.images) {
            this.fileUrls.push(imageUrl);
            const file = await this.createFile(imageUrl, '', 'image/png');
            this.files.push(file);
          }
        } else {
          this.createPostForm.get('description')?.setValue(post.description);
        }
      },
      (error) => {
        throwError(error);
      }
    );
  }


  private async createFile(path: string, name: string, type: string): Promise<File> {
    return new Promise<File>(async (resolve, reject) => {
      try {
        const response = await fetch(path);
        const data = await response.blob();
        const metadata = { type: type };
        const file = new File([data], name, metadata);
        resolve(file);
      } catch (error) {
        reject(error);
      }
    });
  }

  ngOnDestroy() {
    this.cleanupFiles();
  }

  private cleanupFiles(): void {
    if ((this.fileUrls.length > 0 || this.updatedFileUrls.length > 0) && !this.postWasPosted) {
      const filesToRemove = this.isUpdating ? this.updatedFileUrls : this.fileUrls;
      filesToRemove.forEach((fileUrl) => {
        this.fileService.removeFile(fileUrl);
      });
    }
  }

  createPost(): void {
    this.initializePostPayload();
    this.submitPost();
  }

  private initializePostPayload(): void {
    this.postPayload.communityName = this.selectedCommunity;
    this.postPayload.title = this.createPostForm.get('title')?.value;

    if (this.active === 1) {
      this.postPayload.description = this.createPostForm.get('description')?.value;
      this.postPayload.images = [];
      this.cleanupFiles();
    } else {
      this.fileUrls.push(...this.updatedFileUrls);
      this.postPayload.description = '';
      this.postPayload.images = this.fileUrls;
    }
  }

  private submitPost(): void {
    const postObservable = this.isUpdating
      ? this.postService.updatePost(this.postIdToUpdate, this.postPayload)
      : this.postService.createPost(this.postPayload);

    postObservable.subscribe(id => {
        this.postWasPosted = true;
        this.activeModal.close();

        if (this.isUpdating) {
          location.reload();
        } else {
          this.router.navigateByUrl('/post/' + id);
        }
      },
      (error) => {
        throwError(error);
      }
    );
  }

  discardPost(): void {
    this.activeModal.close();
  }

  async onSelect(event: { addedFiles: any }): Promise<void> {
    this.uploadingFiles = true;
    this.files.push(...event.addedFiles);

    await this.uploadFiles(this.files);
    await new Promise(resolve => setTimeout(resolve, 500));
    this.uploadingFiles = false;
    this.filesUploadProgress = 0;
  }

  onRemove(event: File): void {
    let index = this.files.indexOf(event);
    this.files.splice(index, 1);
    let deleteFileUrl = this.fileUrls.splice(index, 1);

    if (deleteFileUrl.length > 0) {
      this.fileService.removeFile(deleteFileUrl[0]);
    }
  }

  private async uploadFiles(files: File[]): Promise<void> {
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

  selectCommunity(name: string): void {
    this.selectedCommunity = name;
  }

  isCommunityEmpty(): boolean {
    return this.selectedCommunity === 'Choose a community';
  }

  isTitleEmpty(): boolean {
    return this.createPostForm.get('title')?.value === '';
  }
}
