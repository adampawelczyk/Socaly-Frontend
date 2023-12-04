import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditPostComponent } from './create-edit-post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    EditorModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  declarations: [
    CreateEditPostComponent
  ],
  exports: [
    CreateEditPostComponent
  ]
})

export class CreateEditPostModule { }
