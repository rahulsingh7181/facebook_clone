import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
// Material Modules
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './layout/home/home.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftSidebarComponent } from './shared/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './shared/right-sidebar/right-sidebar.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { PostComponent } from './components/post/post.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { MainFeedComponent } from './components/main-feed/main-feed.component';
import { CustomSnackbarComponent } from './shared/custom-snackbar/custom-snackbar.component';
import { authInterceptorProvider } from './interceptors/auth.interceptor';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { ClickOutsideDirective } from './shared/directives/clickOutside.directive';
import { FriendsComponent } from './components/friends/friends.component';
import { WatchComponent } from './components/watch/watch.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GamingComponent } from './components/gaming/gaming.component';
import { FriendsSidebarComponent } from './components/friends-sidebar/friends-sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    DialogComponent,
    PostComponent,
    CreatePostComponent,
    MainFeedComponent,
    CustomSnackbarComponent,
    SearchUsersComponent,
    ClickOutsideDirective,
    FriendsComponent,
    WatchComponent,
    GroupsComponent,
    GamingComponent,
    FriendsSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
    // Material Modules
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
