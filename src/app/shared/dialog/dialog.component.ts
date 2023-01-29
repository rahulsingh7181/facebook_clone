import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostData } from 'src/app/models/post-data.model';
import { CreatePostService } from 'src/app/services/create-post.service';
import { LoginService } from 'src/app/services/login.service';
import { CustomSnackbarService } from '../services/custom-snackbar.service';
import { ModalPopupService } from '../services/modal-popup.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogService: ModalPopupService, 
    private loginService: LoginService, 
    private cusSnackbarService: CustomSnackbarService,
    private createPostService: CreatePostService,
    ) { }
  profilePic: string = this.loginService.getUser().profilePic;
  fullName: string = "";

  postImage!: Blob;

  ngOnInit(): void {
    if(this.profilePic == null){
      this.profilePic = "../../../assets/default-avatar.png";
    }

    this.fullName = this.loginService.getUser().firstName + " " + this.loginService.getUser().lastName;
  }

  public onPostImageFileChange(event:any){
    
    if(event.target.files[0].type == "image/png"
    || event.target.files[0].type == "image/gif"
    || event.target.files[0].type == "image/jpeg"
    || event.target.files[0].type == "image/jpg"){
      this.postImage = event.target.files[0];
    }else{
      this.cusSnackbarService.openCustomSnackBar("Only jpg/jpeg/png/gif files are allowed to upload.", 'Try again!', 'error', 5000)
    }
  }

  // formGroup for post entity
  postFormData = new FormGroup({
    caption: new FormControl(''),
    postImage: new FormControl(''),
  });

  // post form submitted
  public postFormSubmitted(){
    let postData: PostData = {
      caption: this.Caption.value,
      userId: this.loginService.getUser().userId
    }
    // submitting post into database
    this.createPostService.createPost(postData, this.postImage).subscribe({
      next: (res) => {
        this.dialogService.showPostDialog = false;
        this.cusSnackbarService.openCustomSnackBar("Your post have posted successfully !", 'Ok', 'success', 5000);
      },
      error: (err) => {
        this.dialogService.showPostDialog = false;
        this.cusSnackbarService.openCustomSnackBar("Internal error !", 'Tray again!', 'error', 5000);
      },
      complete: () => {console.log("complete");},
    });
    // close post dialog
    
  }

  // getters method
  get Caption(): FormControl{
    return this.postFormData.get('caption') as FormControl;
  }
  get PostImage(): FormControl{
    return this.postFormData.get('postImage') as FormControl;
  }
  
}
