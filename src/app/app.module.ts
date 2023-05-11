import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './token-interceptor';
import { LoginModule } from './auth/login/login.module';
import { SignupModule } from './auth/signup/signup.module';
import { CommentModule } from './comment/comment.module';
import { CommentVoteModule } from './vote/comment-vote/comment-vote.module';
import { CommunityModule } from './community/community.module';
import { PostVoteModule } from './vote/post-vote/post-vote.module';
import { HeaderModule } from './header/header.module';
import { HomeModule } from './home/home.module';
import { PostModule } from './post/post.module';
import { CommunitySidebarModule } from './community/community-sidebar/community-sidebar.module';
import { CreateCommunityModule } from './community/create-community/create-community.module';
import { CreatePostModule } from './post/create-post/create-post.module';
import { CommunitiesModule } from './community/communities/communities.module';
import { ViewPostModule } from './post/view-post/view-post.module';
import { AboutCommunitySidebarModule } from './community/about-community-sidebar/about-community-sidebar.module';
import { CreatePostTopbarModule } from './post/create-post-topbar/create-post-topbar.module';
import { HomeSidebarModule } from './home/home-sidebar/home-sidebar.module';
import { UserProfileModule } from './user/user-profile/user-profile.module';
import { UserSidebarModule } from './user/user-sidebar/user-sidebar.module';
import { UserSettingsModule } from './user-settings/user-settings/user-settings.module';
import { AccountSettingsModule } from './user-settings/account-settings/account-settings.module';
import { ProfileSettingsModule } from './user-settings/profile-settings/profile-settings.module';
import { FeedSettingsModule } from './user-settings/feed-settings/feed-settings.module';
import { EmailSettingsModule } from './user-settings/email-settings/email-settings.module';
import { EmailUpdateModule } from './user-settings/email-update/email-update.module';
import { PasswordUpdateModule } from './user-settings/password-update/password-update.module';
import { UserDeleteModule } from './user-settings/user-delete/user-delete.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot({prefix: '', separator: '', caseSensitive: true}),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LoginModule,
    SignupModule,
    CommentModule,
    CommentVoteModule,
    CommunityModule,
    PostVoteModule,
    HeaderModule,
    HomeModule,
    PostModule,
    CommunitySidebarModule,
    CreateCommunityModule,
    CreatePostModule,
    CommunitiesModule,
    ViewPostModule,
    AboutCommunitySidebarModule,
    CreatePostTopbarModule,
    HomeSidebarModule,
    UserProfileModule,
    UserSidebarModule,
    UserSettingsModule,
    AccountSettingsModule,
    ProfileSettingsModule,
    FeedSettingsModule,
    EmailSettingsModule,
    EmailUpdateModule,
    PasswordUpdateModule,
    UserDeleteModule
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
