import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {SignupComponent} from "./auth/signup/signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './auth/login/login.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { HomeComponent } from './home/home.component';
import {TokenInterceptor} from "./token-interceptor";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import { VoteButtonComponent } from './shared/vote-button/vote-button.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { CommunitySideBarComponent } from './shared/community-side-bar/community-side-bar.component';
import { CreateCommunityComponent } from './community/create-community/create-community.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CommunitiesComponent } from './community/communities/communities.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import { ViewPostComponent } from './post/view-post/view-post.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { WelcomeSideBarComponent } from './shared/welcome-side-bar/welcome-side-bar.component';
import { CommunityComponent } from './community/community/community.component';
import { AboutCommunitySidebarComponent } from './shared/about-community-sidebar/about-community-sidebar.component';
import { CreatePostTopbarComponent } from './shared/create-post-topbar/create-post-topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostTileComponent,
    VoteButtonComponent,
    SideBarComponent,
    CommunitySideBarComponent,
    CreateCommunityComponent,
    CreatePostComponent,
    CommunitiesComponent,
    ViewPostComponent,
    UserProfileComponent,
    WelcomeSideBarComponent,
    CommunityComponent,
    AboutCommunitySidebarComponent,
    CreatePostTopbarComponent
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
    NgbModule
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
