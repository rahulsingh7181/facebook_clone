import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/current-user.model';
import { Friend } from '../models/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  // send friend request
  sendFriendRequest(friend: Friend){
    let formData = new FormData();
    // formData.set("senderId", String(friend.senderId))
    // formData.set("receiverId", String(friend.receiverId))
    formData.append("senderId", String(friend.senderId));
    formData.append("receiverId", String(friend.receiverId));
    return this.http.post<string>(this.baseUrl + '/add-friend', formData);
  }

  // get All friend requests
  getAllFriendRequests(receiverId: number): Observable<CurrentUser>{
    return this.http.get<CurrentUser>(`${this.baseUrl}/getAllFriendRequest/${receiverId}`);
  }

  // accept friend request
  acceptFriendRequest(friend: Friend){
    console.log("acceptFriendRequest called", friend);
    let formData = new FormData();
    formData.append("senderId", String(friend.senderId));
    formData.append("receiverId", String(friend.receiverId));
    console.log("formData :: ", JSON.stringify(formData));
    return this.http.put<string>(this.baseUrl + '/acceptFriendRequest', formData);
  }
}
