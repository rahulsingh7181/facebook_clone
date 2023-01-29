import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/current-user.model';

@Injectable({
  providedIn: 'root'
})
export class SearchUserService {

  baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  public searchUser(searchString: string) : Observable<CurrentUser>{
    return this.http.get<CurrentUser>(`${this.baseUrl}/users/search?searchString=${searchString}`);
  }
}
