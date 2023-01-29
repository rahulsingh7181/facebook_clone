import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  profilePic: string = this.loginService.getUser().profilePic;
  fullName: string = "";
  ngOnInit(): void {
    if(this.profilePic == null){
      this.profilePic = "../../../assets/default-avatar.png";
    }

    this.fullName = this.loginService.getUser().firstName + " " + this.loginService.getUser().lastName;
  }

}
