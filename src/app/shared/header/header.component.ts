import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { Friend } from 'src/app/models/friend.model';
import { FriendService } from 'src/app/services/friend.service';
import { LoginService } from 'src/app/services/login.service';
import { SearchUserService } from 'src/app/services/search-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  });
  public userList: any;
  public currentUserId:any = null;
  constructor(
    private loginService: LoginService, 
    private router: Router,
    private searchUserService: SearchUserService,
    private friendService: FriendService,
    ) { 
      this.searchForm.get("search")?.valueChanges.pipe(
        filter(() => this.searchForm.valid),
        debounceTime(1000), 
        distinctUntilChanged(), 
        switchMap((v) => this.searchUserService.searchUser(v))
          )
        .subscribe({
          next: (res:any)=>{
            this.currentUserId = Number(this.loginService.getUserId());
            this.userList = res;
            console.log(this.userList);
          },
          error: (err)=> {
            if(err.status == 500){
              this.userList = null;
            }
          },
          complete: ()=>{
            console.log("complete");
          }
        });
    }
  profilePic: string = this.loginService.getUser().profilePic;
  fullName: string = "";
  messageCounter: number = 0;
  messageBadge:boolean = false;
  notificationCounter: number = 0;
  notificationBadge:boolean = false;
  isFriendRequestSend: boolean = false;

  ngOnInit(): void {
    if(this.profilePic == null){
      this.profilePic = "../../../assets/default-avatar.png";
    }
    this.fullName = this.loginService.getUser().firstName + " " + this.loginService.getUser().lastName;

    if(this.messageCounter > 0){
      this.messageBadge = true;
    }
    if(this.notificationCounter > 0){
      this.notificationBadge = true;
    }
  }

  isProfileMenuOpened:boolean = false;
  toggleProfileMenu(){
    this.isProfileMenuOpened = !this.isProfileMenuOpened;
  }

  clickedOutside(){
    this.isProfileMenuOpened = false;
  }

  logout(){
    this.loginService.logout();
  }

  sendFriendRequest(userId: number){
    let friend: Friend = {
      receiverId: userId,
      senderId: Number(this.loginService.getUserId()),
    }
    this.friendService.sendFriendRequest(friend).subscribe({ 
      next: (res) => {
        if(res != null){
          console.log("Success ",res);
          this.isFriendRequestSend = true;
          // this.Search.setValue('');
        }
      },
      error: (err) => {
        console.log("Error ",err.status);
      },
      complete: () => {this.clearForm();},
    });
  }

  // getters method of search field
  get Search(): FormControl{
    return this.searchForm.get('search') as FormControl;
  }

  clearForm() {
    this.Search.setValue('');
  }
}
