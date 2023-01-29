import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostData } from '../models/post-data.model';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {

  baseUrl = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient) { }

  public createPost(postData: PostData, postImage: Blob){
    // calling create-post API
    let formData = new FormData();
    formData.append("postImage", postImage);
    formData.append("postData", JSON.stringify(postData));
    return this.http.post(this.baseUrl + "/create-post", formData);
  }
}
