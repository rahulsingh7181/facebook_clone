import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  baseUrl = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient) { }

  // register user
  signup(user: User){
    return this.http.post<User>(this.baseUrl + '/signup', user);
  }
}
