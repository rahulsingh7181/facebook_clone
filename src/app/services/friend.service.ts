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
    return this.http.post<string>(this.baseUrl + '/add-friend', friend);
  }

  // get All friend requests
  getAllFriendRequests(receiverId: number): Observable<CurrentUser>{
    return this.http.get<CurrentUser>(`${this.baseUrl}/getAllFriendRequest/${receiverId}`);
  }

  // accept friend request
  acceptFriendRequest(friend: Friend){
    console.log("acceptFriendRequest called", friend);
    return;
  }
}
