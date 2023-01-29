import { Component, OnInit } from '@angular/core';
import { Friend } from 'src/app/models/friend.model';
import { FriendService } from 'src/app/services/friend.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private friendService: FriendService, private loginService: LoginService,) { }

  public userList: any;
  profilePic: string = "../../../assets/default-avatar.png";

  ngOnInit(): void {

    /* getting all friend requests */
    this.friendService.getAllFriendRequests(Number(this.loginService.getUserId())).subscribe({
      next: (data:any) => {
        this.userList = data;
      },
      error: (error: any) => {
        console.log("Error:",error);
      },
      complete: () => {
        console.log("complete");
      },
    });
  }

  /* accept friend requests */
  acceptFriendRequest(userId: number){
    let friend: Friend = {
      receiverId: Number(this.loginService.getUserId()),
      senderId: userId,
    }
    this.friendService.acceptFriendRequest(friend);
  }

}
