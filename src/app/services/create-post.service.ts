import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Comment } from '../models/comment.model';
import { PostData } from '../models/post-data.model';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {

  baseUrl = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient) { }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  // create post by user
  public createPost(postData: PostData, postImage: Blob | undefined){
    debugger
    // calling create-post API
    let formData = new FormData();
    if(postImage === undefined){
      formData.append("postImage", '');
    }else{
      formData.append("postImage", postImage);
    }
    formData.append("postData", JSON.stringify(postData));
    return this.http.post(this.baseUrl + "/create-post", formData).pipe(tap(()=>{
      this._refreshNeeded$.next();
    }));
  }

  // get All Posts of friends and myself
  getAllPosts(userId: number){
    return this.http.get(`${this.baseUrl}/getAllPosts/${userId}`).pipe(tap(()=>{
      // this._refreshNeeded$.next();
    }));
  }

  // Add Comment data in Database
  addComment(comment: Comment){
    return this.http.post<Comment>(this.baseUrl + '/addComment', comment);
  }
}
