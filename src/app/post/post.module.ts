import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { CommentModule } from '../comment/comment.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostVoteModule } from '../vote/post-vote/post-vote.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommentModule,
    EditorModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PostVoteModule,
    NgbModule,
    AppRoutingModule
  ],
  declarations: [
    PostComponent
  ],
  exports: [
    PostComponent
  ]
})

export class PostModule { }
