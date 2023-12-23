import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostRequestModel } from '../shared/post-request.model';
import { CommunityResponseModel } from '../../community/shared/community-response.model';
import { Router } from '@angular/router';
import { PostService } from '../shared/post.service';
import { CommunityService } from '../../community/shared/community.service';
import { throwError } from 'rxjs';
import { AuthService } from '../../auth/shared/auth.service';
import { FileService } from '../../shared/file.service';
import { editorConfig } from '../../../globals';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-create-edit-post',
  templateUrl: './create-edit-post.component.html',
  styleUrls: ['./create-edit-post.component.scss'],
  animations: [
    trigger('extendCollapse', [
      state('collapsed', style({ height: '100px', opacity: '1'})),
      state('expanded', style({ height: '420px', opacity: '1'})),
      transition('collapsed <=> expanded', animate('.5s ease-in-out')),
    ]),
  ],
})
export class CreateEditPostComponent implements OnInit {
  @Input() editing = false;
  @Input() postIdToEdit: number;
  createPostForm: FormGroup;
  postPayload: PostRequestModel;
  communities: CommunityResponseModel[];
  files: File[] = [];
  fileUrls: string[] = [];
  editedFileUrls: string[] = [];
  active = 1;
  selectedCommunity = 'Choose a community';
  uploadingFiles = false;
  filesUploadProgress = 0;
  posted = false;
  editorConfig = editorConfig;
  isCollapsed = true;
  isExpanded = false;
  showHiddenElement = false;
  showTextarea = true;

  constructor(private router: Router,
              private postService: PostService,
              private communityService: CommunityService,
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

    if (this.editing) {
      this.loadPostToUpdate();
    }
  }

  ngOnDestroy() {
    this.cleanupFiles();
  }

  private initializeCreatePostForm(): void {
    this.createPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      communityName: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  private loadCommunities(): void {
    this.communityService.getAll().subscribe(
      (communities) => {
        this.communities = communities;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  private loadPostToUpdate(): void {
    this.postService.get(this.postIdToEdit).subscribe(
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

  private cleanupFiles(): void {
    if ((this.fileUrls.length > 0 || this.editedFileUrls.length > 0) && !this.posted) {
      const filesToRemove = this.editing ? this.editedFileUrls : this.fileUrls;
      filesToRemove.forEach((fileUrl) => {
        this.fileService.removeFile(fileUrl);
      });
    }
  }

  create(): void {
    this.initializePostPayload();
    this.submit();
  }

  private initializePostPayload(): void {
    this.postPayload.communityName = this.selectedCommunity;
    this.postPayload.title = this.createPostForm.get('title')?.value;

    if (this.active === 1) {
      this.postPayload.description = this.createPostForm.get('description')?.value;
      this.postPayload.images = [];
      this.cleanupFiles();
    } else {
      this.fileUrls.push(...this.editedFileUrls);
      this.postPayload.description = '';
      this.postPayload.images = this.fileUrls;
    }
  }

  private submit(): void {
    const postObservable = this.editing
      ? this.postService.edit(this.postIdToEdit, this.postPayload)
      : this.postService.create(this.postPayload);

    postObservable.subscribe(id => {
        this.posted = true;

        if (this.editing) {
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

  discard(): void {
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
    const index = this.files.indexOf(event);
    this.files.splice(index, 1);
    let deleteFileUrl = this.fileUrls.splice(index, 1);

    if (deleteFileUrl.length > 0) {
      this.fileService.removeFile(deleteFileUrl[0]);
    }
  }

  private async uploadFiles(files: File[]): Promise<void> {
    for (const file of files) {
      if (file.name === '') continue;
      const fileUrl = await this.fileService.uploadFile(file);
      this.filesUploadProgress += 100 / files.length;

      if (this.editing) {
        this.editedFileUrls.push(fileUrl);
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

  addFocusToTextarea() {
    const iframe = document.querySelector('iframe[id^="tiny-angular_"][id$="_ifr"]') as HTMLObjectElement;
    const innerDoc = (iframe.contentDocument) 
                  ? iframe.contentDocument 
                  : iframe.contentWindow!.document;

    innerDoc.getElementById("tinymce")?.focus();
  }

  toggleExpand() {
    this.showHiddenElement = true;
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.showTextarea = false;
      this.showHiddenElement = true;
    } else {
      this.showTextarea = true;
      this.showHiddenElement = false;
    }
  }

  animationDone(event: any) {
    if (event.toState === 'collapsed') {
    } else {
      this.addFocusToTextarea();
    }
  }
}
