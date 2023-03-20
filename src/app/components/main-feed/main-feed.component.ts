import { Component, OnInit } from '@angular/core';
import { CreatePostService } from 'src/app/services/create-post.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {

  constructor(
    private postService: CreatePostService, 
    private loginService: LoginService
  ) { }
  public postData: any;
  public base64Image: any;
  
  ngOnInit(): void {
    this.postService.refreshNeeded$
    .subscribe(()=>{
      this.getAllPost();
    });
    
    // setInterval(() => {
      this.getAllPost();
    // }, 1000);
  }
  
  private getAllPost(){
    /* getting all friend requests */
    this.postService.getAllPosts(Number(this.loginService.getUserId())).subscribe({
      next: (data:any) => {
        this.postData = data;
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
