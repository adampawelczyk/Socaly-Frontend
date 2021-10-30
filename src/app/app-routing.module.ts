import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./home/home.component";
import {CreatePostComponent} from "./post/create-post/create-post.component";
import {CreateCommunityComponent} from "./community/create-community/create-community.component";
import {CommunitiesComponent} from "./community/communities/communities.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'communities', component: CommunitiesComponent },
  { path: 'create-post', component: CreatePostComponent},
  { path: 'create-community', component: CreateCommunityComponent},
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
