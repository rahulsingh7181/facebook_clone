import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/services/friend.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  constructor(private friendService: FriendService, private loginService: LoginService,) { }

  public userList: any;
  profilePic: string = "../../../assets/default-avatar.png";
  
  ngOnInit(): void {
  }

}
