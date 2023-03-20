import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-birthdays',
  templateUrl: './birthdays.component.html',
  styleUrls: ['./birthdays.component.css']
})
export class BirthdaysComponent implements OnInit {

  constructor(private friendService: FriendService, private loginService: LoginService,) { }

  public userList: any;
  profilePic: string = "../../../assets/default-avatar.png";

  ngOnInit(): void {
  }

}
