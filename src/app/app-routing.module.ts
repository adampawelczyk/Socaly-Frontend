import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreateCommunityComponent } from './community/create-community/create-community.component';
import { CommunitiesComponent } from './community/communities/communities.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AuthGuard } from './auth/shared/auth.guard';
import { CommunityComponent } from './community/community.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'communities', component: CommunitiesComponent },
  { path: 'community/:name', component: CommunityComponent },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'create-community', component: CreateCommunityComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
