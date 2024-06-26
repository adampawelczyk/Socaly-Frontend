import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CommentVoteModule } from '../../vote/comment-vote/comment-vote.module';
import { HighlightService } from '../../shared/highlight.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        EditorModule,
        CommentVoteModule,
        NgbDropdownModule
    ],
  declarations: [
    CommentComponent
  ],
  exports: [
    CommentComponent
  ],
  providers: [
    HighlightService
  ]
})

export class CommentModule { }
