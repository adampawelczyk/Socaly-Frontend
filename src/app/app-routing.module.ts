import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { HomeComponent } from './home/home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreateCommunityComponent } from './community/create-community/create-community.component';
import { CommunitiesComponent } from './community/communities/communities.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AuthGuard } from './auth/shared/auth.guard';
import { CommunityComponent } from './community/community/community.component';
import { UserSettingsComponent } from './user-settings/user-settings/user-settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:id', component: ViewPostComponent },
  { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'settings', canActivate: [AuthGuard], children: [
      { path: 'account', component: UserSettingsComponent, canActivate: [AuthGuard], data: {activeId: 'account'}},
      { path: 'profile', component: UserSettingsComponent, canActivate: [AuthGuard], data: {activeId: 'profile'}},
      { path: 'privacy', component: UserSettingsComponent, canActivate: [AuthGuard], data: {activeId: 'privacy'}},
      { path: 'feed', component: UserSettingsComponent, canActivate: [AuthGuard], data: {activeId: 'feed'}},
      { path: 'emails', component: UserSettingsComponent, canActivate: [AuthGuard], data: {activeId: 'emails'}}
    ]},
  { path: 'communities', component: CommunitiesComponent },
  { path: 'community/:name', component: CommunityComponent },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'create-community', component: CreateCommunityComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LogInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
