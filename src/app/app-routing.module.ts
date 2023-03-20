import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirthdaysComponent } from './components/friends/birthdays/birthdays.component';
import { FriendRequestsComponent } from './components/friends/friend-requests/friend-requests.component';
import { FriendlistComponent } from './components/friends/friendlist/friendlist.component';
import { FriendsComponent } from './components/friends/friends.component';
import { SuggestionsComponent } from './components/friends/suggestions/suggestions.component';
import { GamingComponent } from './components/gaming/gaming.component';
import { GroupsComponent } from './components/groups/groups.component';
import { WatchComponent } from './components/watch/watch.component';
import { AuthUserGuard } from './guards/auth-user.guard';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'login'
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent
      },
      {
        path: 'signup',
        pathMatch: 'full',
        component: SignupComponent
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthUserGuard],
  },
  {
    path: 'friends',
    pathMatch: 'full',
    component: FriendsComponent
  },
  {
    path: 'requests',
    pathMatch: 'full',
    component: FriendRequestsComponent
  },
  {
    path: 'suggestions',
    pathMatch: 'full',
    component: SuggestionsComponent
  },
  {
    path: 'list',
    pathMatch: 'full',
    component: FriendlistComponent
  },
  {
    path: 'birthdays',
    pathMatch: 'full',
    component: BirthdaysComponent
  },
  {
    path: 'friends/friendlist',
    pathMatch: 'full',
    component: FriendsComponent
  },
  {
    path: 'watch',
    pathMatch: 'full',
    component: WatchComponent
  },
  {
    path: 'groups',
    pathMatch: 'full',
    component: GroupsComponent
  },
  {
    path: 'gaming',
    pathMatch: 'full',
    component: GamingComponent
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
