import { Component, OnInit } from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {CreatePostPayload} from "./create-post.payload"
import {CommunityResponse} from "../../community/community-response"
import {Router} from "@angular/router"
import {PostService} from "../../shared/post.service"
import {CommunityService} from "../../community/community.service"
import {throwError} from "rxjs"
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap"

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup
  postPayload: CreatePostPayload
  communities: Array<CommunityResponse>
  files: File[] = []
  fileUrls: string[] = []
  active = 1
  selectedCommunity = "Choose a community"

  editorConfig = {
    skin_url: '..\\assets\\skins\\ui\\light',
    icons: 'material',
    branding: false,
    height: 300,
    placeholder: "Text (optional)",
    menubar: false,
    plugins: [
      'advlist lists charmap print preview anchor emoticons paste',
      'searchreplace visualblocks fullscreen insertdatetime link'
    ],
    toolbar:
      'formatselect | bold italic link strikethrough superscript bullist numlist emoticons',
    link_title: false,
    target_list: false,
    default_link_target:"_blank",
    link_context_toolbar: true,
    advlist_bullet_styles: 'disc',
    advlist_number_styles: 'decimal'
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
      description: new FormControl('')
    })

    this.communityService.getAllCommunities().subscribe((data) => {
      this.communities = data
    }, error => {
      throwError(error)
    })
  }

  createPost() {
    this.postPayload.communityName = this.selectedCommunity
    this.postPayload.postName = this.createPostForm.get('postName')?.value

    if (this.active == 1) {
      this.postPayload.description = this.createPostForm.get('description')?.value
      this.postPayload.images = []
    } else {
      this.postPayload.description = ""
      this.postPayload.images = this.fileUrls
    }

    this.postService.createPost(this.postPayload).subscribe((id) => {
      this.activeModal.close()
      this.router.navigateByUrl('/view-post/' + id)
    }, error => {
      throwError(error)
    })
  }

  discardPost() {
    this.activeModal.close()
  }

  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles)

    this.readFile(this.files[this.fileUrls.length]).then(fileContent => {
      this.fileUrls.push(fileContent)
    })

    console.log(this.fileUrls)
  }

  onRemove(event: File) {
    let index = this.files.indexOf(event)
    this.files.splice(index, 1)
    this.fileUrls.splice(index, 1)

    console.log(this.fileUrls)
  }

  private async readFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = e => {
        // @ts-ignore
        return resolve((e.target as FileReader).result)
      }

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`)
        return reject(null)
      }

      if (!file) {
        console.error('No file to read.')
        return reject(null)
      }

      reader.readAsDataURL(file)
    })
  }

  selectCommunity(name: string) {
    this.selectedCommunity = name
  }

  isCommunityEmpty() {
    return this.selectedCommunity === 'Choose a community'
  }
}
