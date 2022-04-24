import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from "./auth/signup/signup.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './auth/login/login.component';
import { NgxWebstorageModule } from "ngx-webstorage";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from "./token-interceptor";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { PostComponent } from './post/post.component';
import { PostVoteComponent } from './vote/post-vote/post-vote.component';
import { CommunitySidebarComponent } from './community/community-sidebar/community-sidebar.component';
import { CreateCommunityComponent } from './community/create-community/create-community.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CommunitiesComponent } from './community/communities/communities.component';
import { EditorModule } from "@tinymce/tinymce-angular";
import { ViewPostComponent } from './post/view-post/view-post.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { CommunityComponent } from './community/community.component';
import { AboutCommunitySidebarComponent } from './community/about-community-sidebar/about-community-sidebar.component';
import { CreatePostTopbarComponent } from './panes/create-post-topbar/create-post-topbar.component';
import { NgxDropzoneModule } from "ngx-dropzone";
import { CommentComponent } from './comment/comment.component';
import { CommentVoteComponent } from './vote/comment-vote/comment-vote.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { environment } from "../environments/environment";
import { HomeSidebarComponent } from './panes/home-sidebar/home-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    PostVoteComponent,
    CommunitySidebarComponent,
    CreateCommunityComponent,
    CreatePostComponent,
    CommunitiesComponent,
    ViewPostComponent,
    UserProfileComponent,
    CommunityComponent,
    AboutCommunitySidebarComponent,
    CreatePostTopbarComponent,
    CommentComponent,
    CommentVoteComponent,
    HomeSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule,
    NgxDropzoneModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
