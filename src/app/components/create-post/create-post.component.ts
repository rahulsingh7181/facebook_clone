import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ModalPopupService } from 'src/app/shared/services/modal-popup.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(public dialogService: ModalPopupService, private loginService: LoginService) { }
  profilePic: string = this.loginService.getUser().profilePic;
  fullName: string = "";

  ngOnInit(): void {
    if(this.profilePic == null){
      this.profilePic = "../../../assets/default-avatar.png";
    }

    this.fullName = this.loginService.getUser().firstName + " " + this.loginService.getUser().lastName;
  }

}
