import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {

  constructor(private friendService: FriendService, private loginService: LoginService) { }

  public userList: any;
  profilePic: string = "../../../assets/default-avatar.png";

  ngOnInit(): void {

    /* getting all friend requests */
    this.friendService.getAllFriendsList(Number(this.loginService.getUserId())).subscribe({
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

}
