import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Comment } from 'src/app/models/comment.model';
import { CreatePostService } from 'src/app/services/create-post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post:any

  constructor(private loginService: LoginService, private createPostService: CreatePostService) { }
  profilePic: string = this.loginService.getUser().profilePic;
  fullName: string = "";
  userId: number = 0; 
  ngOnInit(): void {
    if(this.profilePic == null){
      this.profilePic = "../../../assets/default-avatar.png";
    }
    this.userId = Number(this.loginService.getUserId());
    this.fullName = this.loginService.getUser().firstName + " " + this.loginService.getUser().lastName;
  }

  // comment section
  showCommentSectionVar:boolean = false;
  showCommentSection(){
    if(this.showCommentSectionVar){
      this.showCommentSectionVar = false;
    } else{
      this.showCommentSectionVar = true;
    }
  }

  // comment form 
  commentForm = new FormGroup({
    commentMessage: new FormControl('')
  });

  addComment(postId:any, userId:any){
    // set form data into Comment Model
    let comment: Comment = {
      postId: postId,
      userId: userId,
      commentMessage: this.CommentMessage.value
    }
    // add comment in database
    this.createPostService.addComment(comment).subscribe({
      next: (res:any) => {
        console.log(res);
      },
      error: (error:any) => {
        console.log(error);
      },
      complete: () => {},
    });
    // clear comment form
    this.clearForm();
  }
  // clear form
  clearForm() {
    this.CommentMessage.setValue('');
  }
  get CommentMessage(): FormControl{
    return this.commentForm.get('commentMessage') as FormControl;
  }
}
